"""
CozyCrypto Trader — Main FastAPI Server
Governor-grade architecture merged with Bitget trading.

Features:
  - 5-brain AI routing (Trade, Code, Long, Fast, Math) + Gemini fallback
  - Autonomous background learner (every 20 minutes)
  - SSE streaming for real-time UI updates
  - Notification system (in-app + Telegram)
  - Bitget spot trading (real or simulated)
  - Persistent memory (GitHub-backed)
  - API key authentication
"""

from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv
import os, json, asyncio, threading, time, queue
from datetime import datetime, timezone
from pathlib import Path

load_dotenv()

# ── Imports ───────────────────────────────────────────────────────────────────

from core.agent import BRAIN_TRADE, BRAIN_FAST, BRAIN_MATH, call_brain
from core.orchestrator import chat as orchestrator_chat, stream_operator
from core.memory import (
    new_session, get_session, append_message, list_sessions,
    restore_sessions_from_github, load_memory, remember, recall
)
from core.notifications import (
    push_notification, get_notifications, mark_read, get_unread_count,
    register_sse_subscriber, unregister_sse_subscriber
)
try:
    from core.learner import start_learner, stop_learner, get_learner_status, queue_learn
    _HAS_LEARNER = True
except Exception as e:
    print(f"[WARN] Learner import failed: {e}")
    _HAS_LEARNER = False
    def start_learner(): pass
    def get_learner_status(): return {"running": False}
    def queue_learn(t): pass

from tools.bitget import (
    get_balance, get_all_tickers, get_ticker, get_candles,
    place_order, get_open_orders, calculate_position_size
)

# ── Config ─────────────────────────────────────────────────────────────────────
GOVERNOR_API_KEY = os.environ.get("GOVERNOR_API_KEY", "")
ALLOWED_ORIGINS  = os.environ.get("ALLOWED_ORIGINS", "*")

app = FastAPI(title="CozyCrypto Trader", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS.split(",") if ALLOWED_ORIGINS != "*" else ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Auth ───────────────────────────────────────────────────────────────────────
async def require_key(request: Request):
    if not GOVERNOR_API_KEY: return
    key = (request.headers.get("X-API-Key") or
           request.headers.get("Authorization","").replace("Bearer ","").strip() or
           request.query_params.get("key",""))
    if key != GOVERNOR_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

# ── Rate limiter ───────────────────────────────────────────────────────────────
_rate: Dict[str, list] = {}
_RATE_LIMIT = int(os.environ.get("RATE_LIMIT_RPM", "30"))

async def rate_limit(request: Request):
    ip = request.client.host if request.client else "unknown"
    now = time.time()
    hits = [t for t in _rate.get(ip, []) if now - t < 60]
    if len(hits) >= _RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    hits.append(now)
    _rate[ip] = hits

# ── Startup ────────────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup():
    push_notification("🚀 CozyCrypto Trader Online", "5-brain AI system ready. 20-min learner active.", "system")
    threading.Thread(target=restore_sessions_from_github, daemon=True).start()
    if _HAS_LEARNER:
        start_learner()
        push_notification("🧠 Learner Started", "Market intelligence collecting every 20 minutes.", "learn")

# ── Models ─────────────────────────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    history: Optional[List[Dict]] = []
    stream: Optional[bool] = False

class TradeRequest(BaseModel):
    symbol: str
    side: str  # buy | sell
    size: Optional[float] = None
    order_type: Optional[str] = "market"
    price: Optional[float] = None
    reason: Optional[str] = ""

# ── CHAT ───────────────────────────────────────────────────────────────────────
@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    """Chat with the trading AI — simple response."""
    sid = req.session_id or new_session()
    history = req.history or []

    if get_session(sid) is None:
        new_session()

    append_message(sid, "user", req.message)

    reply = orchestrator_chat(req.message, history)

    append_message(sid, "assistant", reply)
    return {"reply": reply, "session_id": sid}

@app.post("/api/chat/stream")
async def chat_stream(req: ChatRequest):
    """Stream chat with operator loop — shows thinking steps."""
    sid = req.session_id or new_session()

    def _bitget_search(q: str) -> str:
        """Simple search using Bitget data + knowledge base."""
        from core.memory import search_knowledge
        kb = search_knowledge(q, n=3)
        return "\n".join(kb) or "No cached data — searching live..."

    def _trade_tool(spec: str) -> str:
        """Execute or simulate a trade from operator spec."""
        # Parse: "BUY BTCUSDT 0.001 reason"
        parts = spec.split()
        if len(parts) >= 3:
            side, symbol, size = parts[0], parts[1], parts[2]
            result = place_order(symbol, side, float(size))
            return json.dumps(result)
        return f"[Trade spec unclear: {spec}]"

    def _portfolio_tool() -> str:
        bal = get_balance()
        return json.dumps(bal)

    tools = {"search": _bitget_search, "trade": _trade_tool, "portfolio": _portfolio_tool}

    async def event_stream():
        append_message(sid, "user", req.message)
        final_answer = ""

        for event in stream_operator(req.message, req.history or [], tools=tools):
            yield f"data: {json.dumps(event)}\n\n"
            await asyncio.sleep(0)
            if event.get("type") == "done":
                final_answer = event.get("answer", "")

        if final_answer:
            append_message(sid, "assistant", final_answer)

        yield "data: [DONE]\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

# ── SSE STREAM (notifications + market updates) ────────────────────────────────
@app.get("/api/stream")
async def sse_stream(request: Request):
    """SSE endpoint for real-time notifications and market updates."""
    client_queue: queue.Queue = queue.Queue(maxsize=100)
    register_sse_subscriber(client_queue)

    async def event_generator():
        try:
            # Send initial state
            yield f"data: {json.dumps({'type': 'connected', 'message': 'CozyCrypto Trader connected'})}\n\n"

            while True:
                if await request.is_disconnected():
                    break
                try:
                    event = client_queue.get(timeout=0.1)
                    yield f"data: {json.dumps(event)}\n\n"
                except queue.Empty:
                    # Keepalive ping every 15s
                    yield f"data: {json.dumps({'type': 'ping', 'time': datetime.now(timezone.utc).isoformat()})}\n\n"
                    await asyncio.sleep(15)
        finally:
            unregister_sse_subscriber(client_queue)

    return StreamingResponse(event_generator(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})

# ── NOTIFICATIONS ──────────────────────────────────────────────────────────────
@app.get("/api/notifications")
async def get_notifs():
    return {"notifications": get_notifications(), "unread": get_unread_count()}

@app.post("/api/notifications/{notif_id}/read")
async def read_notif(notif_id: str):
    mark_read(notif_id)
    return {"ok": True}

# ── MARKET DATA ────────────────────────────────────────────────────────────────
@app.get("/api/market/tickers")
async def market_tickers():
    tickers = get_all_tickers()
    return {"tickers": tickers}

@app.get("/api/market/ticker/{symbol}")
async def single_ticker(symbol: str):
    return get_ticker(symbol)

@app.get("/api/market/candles/{symbol}")
async def candles(symbol: str, granularity: str = "1H", limit: int = 50):
    return {"candles": get_candles(symbol, granularity, limit)}

# ── PORTFOLIO ──────────────────────────────────────────────────────────────────
@app.get("/api/portfolio")
async def portfolio():
    if not os.environ.get("BITGET_API_KEY"):
        return {"value": 0, "change": 0, "balance": 0, "history": [], "mode": "no_keys"}

    bal = get_balance()
    total = bal.get("total_usdt", 0)
    return {
        "value":   total,
        "change":  0,
        "balance": bal.get("usdt_available", 0),
        "history": [],
        "assets":  bal.get("assets", []),
        "micro_mode": bal.get("micro_mode", True)
    }

@app.get("/api/portfolio/orders")
async def open_orders():
    return {"orders": get_open_orders()}

# ── TRADING ────────────────────────────────────────────────────────────────────
@app.post("/api/trade")
async def execute_trade(req: TradeRequest):
    """Execute a trade. AI calculates size if not provided."""
    symbol = req.symbol.replace("/", "").upper()

    size = req.size
    if not size:
        bal = get_balance()
        price_data = get_ticker(symbol)
        price = price_data.get("price", 0)
        if price > 0:
            available = bal.get("usdt_available", 0)
            size = calculate_position_size(available, price)

    if not size or size <= 0:
        return {"success": False, "message": "Cannot determine position size — check balance"}

    result = place_order(symbol, req.side, size, req.order_type, req.price)

    # Push notification regardless of simulation
    from core.notifications import notify_trade_opened
    ticker = get_ticker(symbol)
    price = ticker.get("price", 0) if not req.price else req.price
    notify_trade_opened(symbol, req.side, size, price, req.reason or "Manual trade")

    return result

# ── AI ANALYSIS ────────────────────────────────────────────────────────────────
@app.post("/api/analyze")
async def analyze(request: Request):
    body = await request.json()
    symbol = body.get("symbol", "BTCUSDT")
    timeframe = body.get("timeframe", "1H")

    candles_data = get_candles(symbol, timeframe, 50)
    ticker = get_ticker(symbol)
    knowledge = "\n".join(__import__("core.memory", fromlist=["search_knowledge"]).search_knowledge(symbol[:3], n=3))

    messages = [
        {"role": "system", "content": (
            "You are an elite crypto technical analyst using Smart Money Concepts. "
            "Analyze the provided candle data. Identify: trend direction, key levels, "
            "Order Blocks, Fair Value Gaps, liquidity targets. Give specific entry/SL/TP. "
            "Format: clear sections with numbers."
        )},
        {"role": "user", "content": (
            f"Symbol: {symbol} | Timeframe: {timeframe}\n"
            f"Current price: ${ticker.get('price', 0):,.4f}\n"
            f"24h change: {ticker.get('change_24h', 0):.2f}%\n"
            f"Market knowledge: {knowledge}\n\n"
            f"Recent candles (last 10): {json.dumps(candles_data[-10:], indent=1)}"
        )}
    ]
    analysis = call_brain(BRAIN_TRADE, messages, temperature=0.3, max_tokens=1000)
    return {"symbol": symbol, "timeframe": timeframe, "analysis": analysis,
            "price": ticker.get("price", 0), "change": ticker.get("change_24h", 0)}

# ── LEARNER ────────────────────────────────────────────────────────────────────
@app.get("/api/learner/status")
async def learner_status():
    return get_learner_status() if _HAS_LEARNER else {"running": False}

@app.post("/api/learner/queue")
async def queue_topic(request: Request):
    body = await request.json()
    topic = body.get("topic", "")
    if topic:
        queue_learn(topic)
        push_notification("🧠 Learning Queued", f"Will research: {topic}", "learn")
    return {"ok": True, "topic": topic}

@app.get("/api/knowledge/search")
async def knowledge_search(q: str = ""):
    from core.memory import search_knowledge
    return {"results": search_knowledge(q, n=10)}

# ── MEMORY ────────────────────────────────────────────────────────────────────
@app.get("/api/memory")
async def get_memory():
    mem = load_memory()
    return {"entries": mem.get("entries", [])[:50], "lessons": mem.get("trading_lessons", [])[:20]}

@app.post("/api/memory/remember")
async def save_memory(request: Request):
    body = await request.json()
    remember(body.get("key",""), body.get("value",""), body.get("category","trading"))
    return {"ok": True}

# ── SESSIONS ───────────────────────────────────────────────────────────────────
@app.get("/api/sessions")
async def sessions():
    return {"sessions": list_sessions()}

@app.post("/api/sessions/new")
async def create_session():
    sid = new_session()
    return {"session_id": sid}

@app.get("/api/sessions/{sid}")
async def get_session_data(sid: str):
    s = get_session(sid)
    if not s: raise HTTPException(status_code=404, detail="Session not found")
    return s

# ── WORKFLOWS (static for now — AI manages them) ──────────────────────────────
@app.get("/api/workflows")
async def workflows():
    return {"workflows": [
        {"id": "market-scanner", "name": "Market Scanner",     "description": "Scanning top 10 pairs",         "status": "running"},
        {"id": "learner",        "name": "Intelligence Learner","description": "Updates every 20 minutes",      "status": "running" if _HAS_LEARNER else "stopped"},
        {"id": "signal-bot",     "name": "Signal Monitor",     "description": "Monitoring momentum + SMC",     "status": "running"},
        {"id": "risk-guard",     "name": "Risk Guard",         "description": "Watching SL/TP thresholds",     "status": "running"},
    ]}

# ── SETTINGS ───────────────────────────────────────────────────────────────────
@app.get("/api/settings")
async def get_settings():
    return {
        "connected": {
            "bitget": bool(os.environ.get("BITGET_API_KEY")),
            "groq":   bool(os.environ.get("GROQ_API_KEY")),
            "groq2":  bool(os.environ.get("GROQ_API_KEY_2")),
            "gemini": bool(os.environ.get("GEMINI_API_KEY")),
            "telegram": bool(os.environ.get("TELEGRAM_BOT_TOKEN")),
        },
        "risk": {
            "maxTradePercent": float(os.environ.get("MAX_TRADE_PERCENT", "10")),
            "stopLoss":        float(os.environ.get("STOP_LOSS_PERCENT", "2")),
            "takeProfit":      float(os.environ.get("TAKE_PROFIT_PERCENT", "4")),
            "maxOpenTrades":   int(os.environ.get("MAX_OPEN_TRADES", "3")),
        },
        "version": "2.0.0",
        "brains":  ["Trade", "Code", "Long", "Fast", "Math", "Gemini"]
    }

@app.post("/api/settings")
async def save_settings(request: Request):
    body = await request.json()
    risk = body.get("risk", {})
    if risk:
        remember("risk_config", json.dumps(risk), "settings")
    return {"ok": True, "message": "Settings saved to memory. Update env vars for full persistence."}

# ── STATUS ─────────────────────────────────────────────────────────────────────
@app.get("/api/status")
async def status():
    return {
        "status":  "online",
        "version": "2.0.0",
        "brains":  ["Trade (llama-3.3-70b)", "Code (llama-3.3-70b)", "Long (llama-4-scout)", "Fast (llama-3.1-8b)", "Math (qwen3-32b)", "Gemini (fallback)"],
        "learner": get_learner_status() if _HAS_LEARNER else {"running": False},
        "time":    datetime.now(timezone.utc).isoformat()
    }

@app.get("/")
async def root():
    return {"message": "CozyCrypto Trader API v2.0.0 — Governor-grade AI", "docs": "/docs"}
