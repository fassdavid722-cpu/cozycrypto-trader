"""
CozyCrypto Trader — Bitget Exchange Tool
Spot trading: balances, prices, orders, position management.
Micro-account mode: handles $3+ accounts with proper sizing.
"""

import os, json, time, hmac, hashlib, base64, requests
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple

BASE_URL   = "https://api.bitget.com"
API_KEY    = os.environ.get("BITGET_API_KEY", "")
SECRET_KEY = os.environ.get("BITGET_SECRET_KEY", "")
PASSPHRASE = os.environ.get("BITGET_PASSPHRASE", "")

# Risk config
MAX_TRADE_PERCENT = float(os.environ.get("MAX_TRADE_PERCENT", "10"))
STOP_LOSS_PCT     = float(os.environ.get("STOP_LOSS_PERCENT", "2"))
TAKE_PROFIT_PCT   = float(os.environ.get("TAKE_PROFIT_PERCENT", "4"))
MAX_OPEN_TRADES   = int(os.environ.get("MAX_OPEN_TRADES", "3"))
MIN_ORDER_USDT    = 2.0  # Bitget minimum

def _sign(timestamp: str, method: str, path: str, body: str = "") -> str:
    msg = timestamp + method.upper() + path + body
    return base64.b64encode(hmac.new(SECRET_KEY.encode(), msg.encode(), hashlib.sha256).digest()).decode()

def _headers(method: str, path: str, body: str = "") -> Dict:
    ts = str(int(time.time() * 1000))
    return {
        "ACCESS-KEY":        API_KEY,
        "ACCESS-SIGN":       _sign(ts, method, path, body),
        "ACCESS-TIMESTAMP":  ts,
        "ACCESS-PASSPHRASE": PASSPHRASE,
        "Content-Type":      "application/json",
        "locale":            "en-US"
    }

def _get(path: str) -> Dict:
    if not API_KEY:
        return {"error": "No API keys configured"}
    try:
        r = requests.get(BASE_URL + path, headers=_headers("GET", path), timeout=15)
        return r.json()
    except Exception as e:
        return {"error": str(e)}

def _post(path: str, data: Dict) -> Dict:
    if not API_KEY:
        return {"code": "no_key", "msg": "No API keys — simulation mode"}
    body = json.dumps(data)
    try:
        r = requests.post(BASE_URL + path, headers=_headers("POST", path, body), data=body, timeout=15)
        return r.json()
    except Exception as e:
        return {"error": str(e)}

# ── Account ────────────────────────────────────────────────────────────────────

def get_balance() -> Dict:
    """Get all spot balances + total USDT value."""
    data = _get("/api/v2/spot/account/assets")
    if "error" in data:
        return {"total_usdt": 0, "usdt_available": 0, "assets": [], "error": data["error"]}

    assets = data.get("data", [])
    total_usdt = 0
    usdt_available = 0
    asset_list = []

    for a in assets:
        available = float(a.get("available", 0))
        usd_val   = float(a.get("usdtValue", 0))
        total_usdt += usd_val
        if a.get("coinName") == "USDT":
            usdt_available = available
        if available > 0 or usd_val > 0.001:
            asset_list.append({
                "coin": a.get("coinName"),
                "available": available,
                "usd_value": round(usd_val, 4)
            })

    return {
        "total_usdt": round(total_usdt, 4),
        "usdt_available": round(usdt_available, 4),
        "assets": asset_list,
        "micro_mode": total_usdt < 10
    }

# ── Market data ────────────────────────────────────────────────────────────────

def get_ticker(symbol: str) -> Dict:
    """Get price data for a symbol. symbol format: BTCUSDT"""
    data = _get(f"/api/v2/spot/market/tickers?symbol={symbol}")
    if "error" in data:
        return {"error": data["error"]}
    t = data.get("data", [{}])[0] if data.get("data") else {}
    return {
        "symbol":    t.get("symbol", symbol),
        "price":     float(t.get("lastPr", t.get("last", 0))),
        "change_24h":float(t.get("change24h", t.get("changeUtc24h", 0))) * 100,
        "high_24h":  float(t.get("high24h", 0)),
        "low_24h":   float(t.get("low24h", 0)),
        "volume":    float(t.get("usdtVolume", t.get("quoteVol", 0)))
    }

def get_all_tickers(symbols: List[str] = None) -> List[Dict]:
    """Get multiple tickers. Uses public API — no auth needed."""
    default_syms = ["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT","LINKUSDT","ADAUSDT","DOGEUSDT","AVAXUSDT","MATICUSDT"]
    syms = symbols or default_syms
    results = []
    for sym in syms:
        try:
            r = requests.get(f"{BASE_URL}/api/v2/spot/market/tickers?symbol={sym}", timeout=8)
            if r.status_code == 200:
                d = r.json().get("data", [{}])
                if d:
                    t = d[0]
                    price = float(t.get("lastPr", t.get("last", 0)) or 0)
                    change = float(t.get("change24h", t.get("changeUtc24h", 0)) or 0) * 100
                    results.append({
                        "symbol":    sym.replace("USDT", "/USDT"),
                        "price":     price,
                        "change_24h":round(change, 2),
                        "high_24h":  float(t.get("high24h", 0) or 0),
                        "low_24h":   float(t.get("low24h", 0) or 0),
                        "volume":    float(t.get("usdtVolume", t.get("quoteVol", 0)) or 0),
                    })
        except Exception:
            pass
    return results

def get_candles(symbol: str, granularity: str = "1H", limit: int = 50) -> List[Dict]:
    """Get OHLCV candles for technical analysis."""
    data = _get(f"/api/v2/spot/market/candles?symbol={symbol}&granularity={granularity}&limit={limit}")
    candles = data.get("data", [])
    result = []
    for c in candles:
        try:
            result.append({
                "time":   int(c[0]),
                "open":   float(c[1]),
                "high":   float(c[2]),
                "low":    float(c[3]),
                "close":  float(c[4]),
                "volume": float(c[5])
            })
        except Exception:
            pass
    return result

# ── Order execution ────────────────────────────────────────────────────────────

def calculate_position_size(balance_usdt: float, price: float, risk_pct: float = None) -> float:
    """Calculate safe position size for micro-accounts."""
    risk = risk_pct or MAX_TRADE_PERCENT
    trade_usdt = balance_usdt * (risk / 100)
    # Minimum $2, maximum set by config
    trade_usdt = max(MIN_ORDER_USDT, min(trade_usdt, balance_usdt * 0.5))
    qty = trade_usdt / price
    # Round to reasonable precision
    if price > 1000:   return round(qty, 6)
    if price > 1:      return round(qty, 4)
    return round(qty, 2)

def place_order(symbol: str, side: str, size: float,
                order_type: str = "market", price: float = None) -> Dict:
    """Place a spot order on Bitget."""
    if not API_KEY:
        return {
            "success": True,
            "simulated": True,
            "message": f"[SIMULATION] {side.upper()} {size} {symbol} @ market",
            "orderId": f"sim_{int(time.time())}"
        }

    payload = {
        "symbol":    symbol,
        "side":      side.lower(),
        "orderType": order_type,
        "size":      str(size),
        "force":     "gtc"
    }
    if price and order_type == "limit":
        payload["price"] = str(price)

    result = _post("/api/v2/spot/trade/place-order", payload)

    if result.get("code") == "00000":
        return {
            "success":  True,
            "simulated":False,
            "orderId":  result.get("data", {}).get("orderId", ""),
            "message":  f"{side.upper()} {size} {symbol} placed"
        }
    return {
        "success": False,
        "simulated": False,
        "message": result.get("msg", "Order failed"),
        "code":    result.get("code", "")
    }

def get_open_orders(symbol: str = "") -> List[Dict]:
    path = f"/api/v2/spot/trade/unfilled-orders{('?symbol=' + symbol) if symbol else ''}"
    data = _get(path)
    orders = data.get("data", {}).get("orderList", []) if isinstance(data.get("data"), dict) else data.get("data", [])
    return [{"orderId": o.get("orderId"), "symbol": o.get("symbol"),
             "side": o.get("side"), "size": o.get("size"), "price": o.get("price"),
             "status": o.get("status")} for o in orders]

def cancel_order(symbol: str, order_id: str) -> Dict:
    return _post("/api/v2/spot/trade/cancel-order", {"symbol": symbol, "orderId": order_id})
