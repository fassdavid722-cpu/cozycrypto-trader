"""
CozyCrypto Trader — AI Brain Engine V1
Governor-grade multi-brain architecture adapted for trading.

BRAIN LAYOUT:
─────────────────────────────────────────────────────────────────
Key 1  → BRAIN_TRADE    llama-3.3-70b-versatile   Trading strategy, market analysis
          BRAIN_CODE     llama-3.3-70b-versatile   Tool generation, code fixes
          BRAIN_LONG     llama-4-scout-17b          Long context: charts, multi-source data

Key 2  → BRAIN_FAST     llama-3.1-8b-instant       Quick replies, notifications, background
          BRAIN_MATH     qwen/qwen3-32b             Math: P&L calc, risk sizing, stats

Gemini → BRAIN_GEMINI   gemini-2.0-flash           Emergency fallback on rate limit
─────────────────────────────────────────────────────────────────

Brain routing logic:
  Trade/market analysis      → BRAIN_TRADE  (Key 1)
  Code/tool generation       → BRAIN_CODE   (Key 1)
  Big data / multi-source    → BRAIN_LONG   (Key 1)
  Quick / notifications      → BRAIN_FAST   (Key 2)
  Risk math / P&L            → BRAIN_MATH   (Key 2)
  Any 429 from Groq          → BRAIN_GEMINI (Gemini)
"""

import os
import time
import threading
import requests
from typing import List, Dict, Optional

GROQ_BASE   = "https://api.groq.com/openai/v1"
GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

_KEY1       = (os.environ.get("GROQ_API_KEY") or "").strip()
_KEY2       = (os.environ.get("GROQ_API_KEY_2") or "").strip()
_GEMINI_KEY = (os.environ.get("GEMINI_API_KEY") or "").strip()

BRAIN_TRADE = {"key": _KEY1,                       "model": "llama-3.3-70b-versatile",                    "name": "Trade",  "provider": "groq"}
BRAIN_CODE  = {"key": _KEY1,                       "model": "llama-3.3-70b-versatile",                    "name": "Code",   "provider": "groq"}
BRAIN_LONG  = {"key": _KEY1,                       "model": "meta-llama/llama-4-scout-17b-16e-instruct",  "name": "Long",   "provider": "groq"}
BRAIN_FAST  = {"key": _KEY2 or _KEY1,              "model": "llama-3.1-8b-instant",                       "name": "Fast",   "provider": "groq"}
BRAIN_MATH  = {"key": _KEY2 or _KEY1,              "model": "qwen/qwen3-32b",                             "name": "Math",   "provider": "groq"}
BRAIN_GEMINI= {"key": _GEMINI_KEY,                 "model": "gemini-2.0-flash",                           "name": "Gemini", "provider": "gemini"}

# ── Per-key throttles ─────────────────────────────────────────────────────────
_k1_last, _k2_last = 0.0, 0.0
_k1_lock = threading.Lock()
_k2_lock = threading.Lock()
MIN_K1, MIN_K2 = 1.0, 0.4

def _throttle(brain: dict):
    global _k1_last, _k2_last
    if brain["provider"] != "groq": return
    use_k1 = (brain["key"] == _KEY1) or not _KEY2
    if use_k1:
        with _k1_lock:
            gap = MIN_K1 - (time.time() - _k1_last)
            if gap > 0: time.sleep(gap)
            _k1_last = time.time()
    else:
        with _k2_lock:
            gap = MIN_K2 - (time.time() - _k2_last)
            if gap > 0: time.sleep(gap)
            _k2_last = time.time()

def _call_groq(brain: dict, messages: list, temperature=0.7, max_tokens=2048):
    if not brain["key"]:
        return "[No API key]", False
    _throttle(brain)
    try:
        r = requests.post(f"{GROQ_BASE}/chat/completions",
            headers={"Authorization": f"Bearer {brain['key']}", "Content-Type": "application/json"},
            json={"model": brain["model"], "messages": messages,
                  "temperature": temperature, "max_tokens": max_tokens},
            timeout=90)
        if r.status_code == 429:
            return "", True  # rate limited → use Gemini
        if r.status_code != 200:
            return f"[Groq {r.status_code}] {r.text[:200]}", False
        return r.json()["choices"][0]["message"]["content"], False
    except requests.exceptions.Timeout:
        return "[Groq timeout]", False
    except Exception as e:
        return f"[Groq error] {e}", False

def _call_gemini(messages: list, max_tokens=2048) -> str:
    if not _GEMINI_KEY:
        return "[Gemini not configured — set GEMINI_API_KEY]"
    try:
        system_text = ""
        contents = []
        for m in messages:
            if m["role"] == "system":
                system_text = m["content"]
            elif m["role"] == "user":
                contents.append({"role": "user", "parts": [{"text": m["content"]}]})
            else:
                contents.append({"role": "model", "parts": [{"text": m["content"]}]})
        body = {"contents": contents, "generationConfig": {"maxOutputTokens": max_tokens, "temperature": 0.7}}
        if system_text:
            body["systemInstruction"] = {"parts": [{"text": system_text}]}
        for model in ["gemini-2.0-flash", "gemini-2.0-flash-lite"]:
            r = requests.post(f"{GEMINI_BASE}/{model}:generateContent?key={_GEMINI_KEY}",
                              json=body, timeout=45)
            if r.status_code == 200:
                return r.json()["candidates"][0]["content"]["parts"][0]["text"]
            if r.status_code not in (429, 503, 500):
                break
            time.sleep(1)
        return "[All Gemini models unavailable]"
    except Exception as e:
        return f"[Gemini error] {e}"

def call_brain(brain: dict, messages: list, temperature=0.7, max_tokens=2048) -> str:
    """Call a brain with automatic Gemini fallback on rate limit."""
    text, rate_limited = _call_groq(brain, messages, temperature, max_tokens)
    if rate_limited:
        return _call_gemini(messages, max_tokens)
    return text

def route_brain(task_type: str) -> dict:
    """Route to the right brain based on task type."""
    routing = {
        "trade":    BRAIN_TRADE,
        "analysis": BRAIN_TRADE,
        "code":     BRAIN_CODE,
        "tool":     BRAIN_CODE,
        "long":     BRAIN_LONG,
        "fast":     BRAIN_FAST,
        "notify":   BRAIN_FAST,
        "math":     BRAIN_MATH,
        "risk":     BRAIN_MATH,
        "pnl":      BRAIN_MATH,
    }
    return routing.get(task_type, BRAIN_TRADE)
