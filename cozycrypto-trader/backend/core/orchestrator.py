"""
CozyCrypto Trader — Orchestrator
Routes incoming messages to the right brain/mode.

Intent types:
  trade_intent   → analyze + execute (operator loop)
  analysis       → deep market analysis (BRAIN_TRADE)
  chat           → conversational (BRAIN_FAST)
  portfolio      → portfolio check (BRAIN_TRADE + Bitget data)
  math           → calculations (BRAIN_MATH)
  learn          → queue learning topic
  news           → fetch latest news/sentiment
"""

import re
from typing import Dict, List, Generator

from core.agent import call_brain, BRAIN_TRADE, BRAIN_FAST, BRAIN_LONG, BRAIN_MATH
from core.memory import recall, search_knowledge, get_trade_lessons
from core.notifications import push_notification

TRADE_HINTS    = ["buy","sell","trade","long","short","entry","position","open a","place a","execute","order"]
ANALYSIS_HINTS = ["analyze","analysis","chart","technical","rsi","macd","trend","structure","smc","order block","fvg","support","resistance"]
PORTFOLIO_HINTS= ["portfolio","balance","positions","my trades","pnl","profit","loss","how am i doing"]
MATH_HINTS     = ["calculate","how much","what is","position size","risk","stop loss","take profit","percent","$"]
LEARN_HINTS    = ["learn","research","find out","what is happening","latest","news","sentiment"]

SYSTEM_TRADER = """You are CozyCrypto AI — an elite autonomous trading copilot running on a Governor-grade multi-brain system.

Your capabilities:
  - 5 specialized AI brains (Trade, Code, Long, Fast, Math) + Gemini fallback
  - Real-time Bitget market data + trade execution
  - Smart Money Concepts (SMC) analysis: Order Blocks, FVGs, BOS/CHoCH, liquidity sweeps
  - Autonomous background learner running every 20 minutes
  - Persistent memory across sessions (GitHub-backed)
  - Self-improving: learns from every trade outcome

Your trading philosophy:
  - Risk first: never risk more than configured max per trade
  - SMC-based entries: trade with smart money, not against it
  - Small account mastery: compound small gains consistently
  - Learn-only mode when no balance: study patterns, backtest strategies
  - Never emotional: data-driven, always

Trading output format (when suggesting trades):
  Pair: XXX/USDT | Side: BUY/SELL | Entry: $X | SL: $X (X%) | TP: $X (X%) | Size: X USDT | Confidence: X%

Memory available:
{memory}

Recent market knowledge:
{knowledge}

Recent lessons learned:
{lessons}"""

def _detect_intent(message: str) -> str:
    m = message.lower()
    if any(h in m for h in TRADE_HINTS):    return "trade"
    if any(h in m for h in ANALYSIS_HINTS): return "analysis"
    if any(h in m for h in PORTFOLIO_HINTS):return "portfolio"
    if any(h in m for h in MATH_HINTS):     return "math"
    if any(h in m for h in LEARN_HINTS):    return "learn"
    return "chat"

def _build_system(message: str) -> str:
    memory = recall(message[:50], n=3)
    mem_text = "\n".join([f"- {e['key']}: {e['value']}" for e in memory]) or "None yet"

    knowledge = search_knowledge(message[:50], n=3)
    knowledge_text = "\n".join(knowledge) or "None yet (learner will update every 20 min)"

    lessons = get_trade_lessons(n=5)
    lessons_text = "\n".join([f"- {l}" for l in lessons]) or "None yet"

    return SYSTEM_TRADER.format(memory=mem_text, knowledge=knowledge_text, lessons=lessons_text)

def chat(message: str, history: List[Dict]) -> str:
    """Simple chat — returns full response string."""
    intent = _detect_intent(message)

    system = _build_system(message)
    messages = [{"role": "system", "content": system}]
    for h in history[-15:]:
        messages.append({"role": h["role"] if h["role"] != "ai" else "assistant", "content": h["content"]})
    messages.append({"role": "user", "content": message})

    # Route to right brain
    if intent == "math":
        return call_brain(BRAIN_MATH, messages, temperature=0.1, max_tokens=600)
    elif intent in ("trade", "analysis"):
        return call_brain(BRAIN_TRADE, messages, temperature=0.4, max_tokens=1000)
    elif intent == "learn":
        from core.learner import queue_learn
        queue_learn(message)
        reply = call_brain(BRAIN_FAST, messages, temperature=0.5, max_tokens=500)
        return reply + "\n\n_🧠 I've also queued this topic for deeper research in my next learning cycle._"
    else:
        return call_brain(BRAIN_FAST, messages, temperature=0.7, max_tokens=800)

def stream_operator(message: str, history: List[Dict], tools: Dict = None) -> Generator[Dict, None, None]:
    """Stream operator loop events for complex tasks."""
    from core.operator import run_operator
    for event in run_operator(message, tools=tools or {}):
        yield event
