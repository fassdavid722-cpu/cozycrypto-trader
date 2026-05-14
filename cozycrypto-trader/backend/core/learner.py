"""
CozyCrypto Trader — Autonomous Background Learner
Adapted from Governor learner — every 20 MINUTES (vs Governor's 30).

Learns:
  - Live crypto prices & movers (every 20 min)
  - Bitget trading pairs & opportunities
  - African market context (NGN/USD, local exchanges)
  - SMC / trading concepts
  - Market news & sentiment
  - Any topic the AI was asked about but lacked data on
"""

import os, re, time, json, threading, requests
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Optional
from urllib.parse import quote

from core.agent import call_brain, BRAIN_FAST, BRAIN_LONG, BRAIN_TRADE
from core.memory import save_knowledge, load_knowledge
from core.notifications import push_notification

LEARN_INTERVAL = 20 * 60   # 20 minutes
SEARCH_TIMEOUT = 20
SCRAPE_TIMEOUT = 15
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124"}

_learner_thread: Optional[threading.Thread] = None
_running = False
_queue: List[str] = []  # Extra topics queued at runtime

# ── Learning topics ────────────────────────────────────────────────────────────

TOPICS = [
    # Live market (refresh every cycle)
    {"id": "crypto_movers",  "query": "top crypto gainers losers today 2026",              "priority": 1},
    {"id": "btc_analysis",   "query": "Bitcoin BTC price technical analysis today",         "priority": 1},
    {"id": "eth_analysis",   "query": "Ethereum ETH price technical analysis today",        "priority": 1},
    {"id": "bitget_news",    "query": "Bitget exchange news listings 2026",                  "priority": 2},
    {"id": "defi_trends",    "query": "DeFi trending protocols TVL gains today",            "priority": 2},
    {"id": "altcoin_movers", "query": "altcoins pumping today momentum breakout 2026",      "priority": 2},

    # Trading intelligence
    {"id": "smc_concepts",   "query": "Smart Money Concepts order blocks FVG trading 2026", "priority": 3},
    {"id": "scalping_tips",  "query": "scalping strategy small account crypto 2026",        "priority": 3},
    {"id": "micro_account",  "query": "grow $3 crypto account trading strategy 2026",       "priority": 3},

    # African market context
    {"id": "africa_crypto",  "query": "Africa cryptocurrency adoption Nigeria 2026",        "priority": 4},
    {"id": "ngn_usd",        "query": "Nigerian Naira NGN USD exchange rate today",         "priority": 4},
    {"id": "nigeria_crypto", "query": "Nigeria crypto regulation binance ban 2026",         "priority": 4},

    # Macro
    {"id": "macro_crypto",   "query": "crypto macro analysis Fed interest rates 2026",      "priority": 5},
    {"id": "fear_greed",     "query": "crypto fear greed index market sentiment today",     "priority": 5},
]

# ── Web scraping helpers ────────────────────────────────────────────────────────

def _search_bing(query: str) -> str:
    try:
        r = requests.get(f"https://www.bing.com/search?q={quote(query)}", headers=UA, timeout=SEARCH_TIMEOUT)
        # Extract text snippets from Bing results
        snippets = re.findall(r'<p[^>]*>(.*?)</p>', r.text, re.DOTALL)
        clean = []
        for s in snippets[:8]:
            text = re.sub(r'<[^>]+>', '', s).strip()
            if len(text) > 40: clean.append(text)
        return " | ".join(clean[:6])
    except Exception as e:
        return f"[Search error: {e}]"

def _search_duckduckgo(query: str) -> str:
    try:
        r = requests.get(f"https://html.duckduckgo.com/html/?q={quote(query)}", headers=UA, timeout=SEARCH_TIMEOUT)
        snippets = re.findall(r'class="result__snippet"[^>]*>(.*?)</a>', r.text, re.DOTALL)
        clean = [re.sub(r'<[^>]+>', '', s).strip() for s in snippets[:5]]
        return " | ".join(clean)
    except Exception:
        return ""

def _fetch_coingecko_trending() -> str:
    try:
        r = requests.get("https://api.coingecko.com/api/v3/search/trending", timeout=10)
        if r.status_code == 200:
            coins = r.json().get("coins", [])[:5]
            names = [c["item"]["name"] + " (" + c["item"]["symbol"] + ")" for c in coins]
            return "Trending: " + ", ".join(names)
    except Exception: pass
    return ""

def _gather_raw(topic_id: str, query: str) -> str:
    """Gather raw data from multiple sources."""
    parts = []

    # Special handler for coingecko trending
    if topic_id == "crypto_movers":
        cg = _fetch_coingecko_trending()
        if cg: parts.append(cg)

    # Web search (try both engines)
    bing_result = _search_bing(query)
    if bing_result and not bing_result.startswith("["):
        parts.append(f"Bing: {bing_result}")
    else:
        ddg = _search_duckduckgo(query)
        if ddg: parts.append(f"DDG: {ddg}")

    return " ".join(parts)[:3000]

def _summarize(topic_id: str, raw: str) -> str:
    """Use BRAIN_FAST to extract key trading-relevant facts from raw data."""
    messages = [
        {"role": "system", "content": (
            "You are a crypto market intelligence processor for an autonomous trading AI. "
            "Extract the most important, actionable trading facts from the raw data. "
            "Be concise. Focus on: prices, % changes, trends, key levels, notable events. "
            "Max 150 words. Trading-focused only."
        )},
        {"role": "user", "content": f"Topic: {topic_id}\n\nRaw data:\n{raw}\n\nExtract key trading facts:"}
    ]
    return call_brain(BRAIN_FAST, messages, temperature=0.2, max_tokens=300)

# ── Importance detection ────────────────────────────────────────────────────────

IMPORTANT_TRIGGERS = [
    ("pump", "🚀 Pump detected"),
    ("dump", "🔴 Dump detected"),
    ("crash", "🔴 Market crash signal"),
    ("liquidat", "⚠️ Mass liquidations"),
    ("whale", "🐋 Whale activity"),
    ("hack", "🚨 Exchange/protocol hack"),
    ("ban", "⚠️ Regulatory ban news"),
    ("halving", "📅 Halving event"),
    ("ath", "🏆 All-time high"),
    ("breakout", "📈 Major breakout"),
    ("breakdown", "📉 Major breakdown"),
    ("listing", "📋 New exchange listing"),
    ("sec", "⚖️ SEC/regulatory action"),
    ("blackswan", "🦢 Black swan event"),
]

def _check_importance(topic_id: str, summary: str) -> Optional[str]:
    """Check if summary contains something important enough to notify."""
    summary_lower = summary.lower()
    for keyword, label in IMPORTANT_TRIGGERS:
        if keyword in summary_lower:
            return f"{label} — {summary[:200]}"
    return None

# ── Main learner loop ───────────────────────────────────────────────────────────

def _learn_topic(topic: Dict) -> bool:
    try:
        raw = _gather_raw(topic["id"], topic["query"])
        if not raw or len(raw) < 50:
            return False
        summary = _summarize(topic["id"], raw)
        save_knowledge(topic["id"], summary, raw)

        # Check if important → push notification
        alert = _check_importance(topic["id"], summary)
        if alert:
            push_notification(
                title="⚡ Market Alert",
                body=alert,
                category="market",
                priority="high"
            )
        return True
    except Exception as e:
        print(f"[Learner] Error on {topic['id']}: {e}")
        return False

def _learn_custom(topic_query: str):
    try:
        raw = _gather_raw("custom_" + topic_query[:20], topic_query)
        summary = _summarize("custom", raw)
        save_knowledge("custom_" + topic_query[:30].replace(" ","_"), summary, raw)
    except Exception as e:
        print(f"[Learner] Custom topic error: {e}")

def _learner_loop():
    global _running
    print("[Learner] Starting — runs every 20 minutes")
    cycle = 0

    while _running:
        cycle += 1
        print(f"[Learner] Cycle #{cycle} — {datetime.now(timezone.utc).strftime('%H:%M UTC')}")

        # Sort by priority, learn all topics
        for topic in sorted(TOPICS, key=lambda t: t.get("priority", 5)):
            if not _running: break
            _learn_topic(topic)
            time.sleep(2)  # small gap between topics

        # Process queued custom topics
        while _queue and _running:
            q = _queue.pop(0)
            _learn_custom(q)
            time.sleep(1)

        # Wait 20 minutes before next cycle
        for _ in range(LEARN_INTERVAL):
            if not _running: break
            time.sleep(1)

def start_learner():
    global _learner_thread, _running
    if _learner_thread and _learner_thread.is_alive():
        return
    _running = True
    _learner_thread = threading.Thread(target=_learner_loop, daemon=True)
    _learner_thread.start()

def stop_learner():
    global _running
    _running = False

def queue_learn(topic: str):
    """Queue a topic for the next learner cycle."""
    if topic not in _queue:
        _queue.append(topic)

def get_learner_status() -> Dict:
    return {
        "running": _running,
        "topics": len(TOPICS),
        "queued": len(_queue),
        "interval_minutes": LEARN_INTERVAL // 60
    }
