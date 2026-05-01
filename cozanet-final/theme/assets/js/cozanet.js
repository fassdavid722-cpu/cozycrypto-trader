/**
 * Cozanet — Frontend JS
 * Matches Kimi design exactly: NeonNetwork canvas, RouteFinder, AIInsight, GSAP-style anims
 */
(function () {
  'use strict';
  var API = window.CZ || { restBase: '/wp-json/cozanet/v1', nonce: '' };

  /* ══════════════════════════════════
     NAV SCROLL
  ══════════════════════════════════ */
  var nav = document.getElementById('czNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 100);
    }, { passive: true });
  }

  /* ══════════════════════════════════
     HAMBURGER
  ══════════════════════════════════ */
  var hamburger = document.getElementById('czHamburger');
  var mobileMenu = document.getElementById('czMobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ══════════════════════════════════
     NEON NETWORK CANVAS
  ══════════════════════════════════ */
  (function initCanvas() {
    var canvas = document.getElementById('czNeonCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, nodes = [], ropes = [], mouse = { x: 0, y: 0 };
    var NODE_COUNT = 22;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

    // Create nodes
    for (var i = 0; i < NODE_COUNT; i++) {
      var t = i / NODE_COUNT;
      nodes.push({
        x: (t - 0.5) * window.innerWidth,
        y: Math.sin(t * Math.PI * 2) * 120 + Math.sin(t * Math.PI * 4) * 60,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        baseX: (t - 0.5) * window.innerWidth,
        baseY: Math.sin(t * Math.PI * 2) * 120 + Math.sin(t * Math.PI * 4) * 60,
      });
    }
    // Ropes between consecutive nodes
    for (var j = 0; j < NODE_COUNT; j++) {
      ropes.push({ a: j, b: (j + 1) % NODE_COUNT, phase: Math.random() * Math.PI * 2, signal: Math.random() });
    }

    var t = 0;
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      var cx = W / 2, cy = H / 2;

      // Update nodes
      for (var n = 0; n < nodes.length; n++) {
        var nd = nodes[n];
        // Float gently
        nd.x += nd.vx + Math.sin(t + nd.phase) * 0.15;
        nd.y += nd.vy + Math.cos(t * 0.7 + nd.phase) * 0.1;

        // Mouse repel (subtle)
        var dx = nd.x + cx - mouse.x;
        var dy = nd.y + cy - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          nd.x += (dx / dist) * 0.6;
          nd.y += (dy / dist) * 0.6;
        }

        // Bounds — wrap
        if (nd.x + cx < -100) nd.x = W / 2 - cx;
        if (nd.x + cx > W + 100) nd.x = -W / 2 - cx;
        if (nd.y + cy < -100) nd.y = H / 2 - cy;
        if (nd.y + cy > H + 100) nd.y = -H / 2 - cy;
      }

      // Draw ropes
      for (var r = 0; r < ropes.length; r++) {
        var rope = ropes[r];
        rope.signal = (rope.signal + 0.004) % 1;
        var na = nodes[rope.a], nb = nodes[rope.b];
        var ax = na.x + cx, ay = na.y + cy;
        var bx = nb.x + cx, by = nb.y + cy;

        // Catenary-like curve
        var midX = (ax + bx) / 2 + Math.sin(t + rope.phase) * 20;
        var midY = (ay + by) / 2 + Math.cos(t * 0.8 + rope.phase) * 15;

        // Base rope
        var grad = ctx.createLinearGradient(ax, ay, bx, by);
        grad.addColorStop(0, 'rgba(255,195,0,0.1)');
        grad.addColorStop(0.5, 'rgba(255,195,0,0.35)');
        grad.addColorStop(1, 'rgba(204,255,0,0.1)');

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(midX, midY, bx, by);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Travelling signal dot
        var s = rope.signal;
        var px = ax * (1 - s) * (1 - s) + midX * 2 * (1 - s) * s + bx * s * s;
        var py = ay * (1 - s) * (1 - s) + midY * 2 * (1 - s) * s + by * s * s;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(204,255,0,0.9)';
        ctx.fill();
      }

      // Draw node boxes
      for (var m = 0; m < nodes.length; m++) {
        var nd2 = nodes[m];
        var nx = nd2.x + cx, ny = nd2.y + cy;
        var glow = Math.sin(t * 1.5 + nd2.phase) * 0.5 + 0.5;
        var size = 5 + glow * 3;

        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate(t * 0.5 + nd2.phase);
        ctx.fillStyle = 'rgba(255,195,0,' + (0.6 + glow * 0.4) + ')';
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.restore();
      }
    }
    animate();
  })();

  /* ══════════════════════════════════
     ROUTE FINDER
  ══════════════════════════════════ */
  var findBtns = document.querySelectorAll('.cz-find-btn');
  findBtns.forEach(function (btn) {
    btn.addEventListener('click', handleFindRoute);
  });

  function handleFindRoute(e) {
    var form = e.target.closest('[data-route-form]') || document;
    var amount = parseInt((getVal(form, '[data-field="amount"]') || '100000').replace(/,/g, ''), 10);
    var from_currency = getVal(form, '[data-field="from_currency"]') || 'NGN';
    var to_crypto = getVal(form, '[data-field="to_crypto"]') || 'USDT';
    var network = getVal(form, '[data-field="network"]') || 'BSC';
    var priority = getVal(form, '[data-field="priority"]') || 'cheapest';
    var wallet = getVal(form, '[data-field="wallet"]') || '';

    if (!amount || amount < 100) { alert('Please enter an amount of at least 100'); return; }

    var btn = e.currentTarget;
    btn.disabled = true;
    btn.innerHTML = '<div class="cz-spinner"></div> Scanning providers...';

    // Show loading in results
    var resultsEl = document.getElementById('czRouteResults') || document.getElementById('czDashResults');
    var aiEl = document.getElementById('czAIResults') || document.getElementById('czDashAI');
    if (resultsEl) { resultsEl.innerHTML = '<div class="cz-loading"><div class="cz-spinner"></div> Scanning 20+ providers...</div>'; resultsEl.style.display = 'block'; }
    if (aiEl) { aiEl.style.display = 'none'; }

    fetch(API.restBase + '/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': API.nonce },
      body: JSON.stringify({ amount: amount, from_currency: from_currency, to_crypto: to_crypto, network: network, priority: priority, wallet_address: wallet })
    })
    .then(function (r) { return r.ok ? r.json() : r.json().then(function (d) { throw new Error(d.message || 'Error ' + r.status); }); })
    .then(function (data) {
      btn.disabled = false;
      btn.innerHTML = 'Find Best Route <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
      renderResults(data, resultsEl, aiEl);
      // Scroll to results
      if (resultsEl) setTimeout(function () { resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
    })
    .catch(function (err) {
      btn.disabled = false;
      btn.innerHTML = 'Find Best Route →';
      if (resultsEl) resultsEl.innerHTML = '<div class="cz-error-box">⚠ ' + esc(err.message) + '</div>';
    });
  }

  function getVal(scope, selector) {
    var el = scope.querySelector(selector);
    return el ? el.value || el.textContent.trim() : '';
  }

  /* ══════════════════════════════════
     RENDER RESULTS
  ══════════════════════════════════ */
  function renderResults(data, resultsEl, aiEl) {
    var best = data.best, others = data.others || [], ai = data.ai_insight;
    if (!best || !resultsEl) return;

    var fmt = function (n) { return Number(n).toLocaleString('en-NG'); };
    var riskDot = function (r) {
      if (!r) return 'green';
      r = r.toLowerCase();
      return r === 'low' ? 'green' : r === 'medium' ? 'orange' : 'red';
    };

    resultsEl.innerHTML =
      '<div class="liquid-glass cz-results-card">' +
        // Best route
        '<div class="cz-best-route">' +
          '<span class="cz-rec-tag">Recommended</span>' +
          '<div class="cz-route-head">' +
            '<div class="cz-route-avatar" style="background:' + (best.color || '#7c3aed') + '">' + esc(best.icon || best.name.charAt(0)) + '</div>' +
            '<div><div class="cz-route-name">' + esc(best.name) + '</div>' +
            '<div class="cz-route-type">' + esc(best.type || 'Direct Purchase') + '</div></div>' +
          '</div>' +
          '<div class="cz-route-metrics">' +
            '<div><div class="cz-metric-lbl">You pay (est.)</div><div class="cz-metric-big">₦' + fmt(best.you_pay) + '</div>' +
            (best.savings ? '<div class="cz-metric-save">You save ₦' + fmt(best.savings) + '</div>' : '') + '</div>' +
            '<div><div class="cz-metric-lbl">Time</div><div class="cz-metric-val">' + esc(best.time || best.speed_min + ' min') + '</div>' +
            (best.speed_label === 'Fast' ? '<span class="cz-fast-tag">Fast</span>' : '') + '</div>' +
            '<div><div class="cz-metric-lbl">Total Fees</div><div class="cz-metric-val">₦' + fmt(best.total_fees) + '</div>' +
            '<div style="font-size:12px;color:#C5C6C7">' + (best.fee_pct || '') + '%</div></div>' +
            '<div><div class="cz-metric-lbl">Risk</div><div class="cz-risk-dot"><span class="cz-dot cz-dot-' + riskDot(best.risk) + '"></span><span style="color:#fff;font-size:14px">' + esc(best.risk) + '</span></div></div>' +
          '</div>' +
        '</div>' +
        // Others
        (others.length ? '<div class="cz-others-section">' +
          '<div class="cz-table-header"><span>Route</span><span>You pay (est.)</span><span>Time</span><span>Total Fees</span><span>Risk</span><span></span></div>' +
          others.map(function (r) {
            return '<div class="cz-table-row">' +
              '<div class="cz-table-name"><div class="cz-mini-avatar" style="background:' + (r.color || '#333') + '">' + esc(r.icon || r.name.charAt(0)) + '</div>' + esc(r.name) + '</div>' +
              '<span>₦' + fmt(r.you_pay) + '</span>' +
              '<span>' + esc(r.time || (r.speed_min + ' min')) + '</span>' +
              '<span>₦' + fmt(r.total_fees) + ' (' + (r.fee_pct || '') + '%)</span>' +
              '<span><span class="cz-dot cz-dot-' + riskDot(r.risk) + '"></span> ' + esc(r.risk) + '</span>' +
              '<span class="cz-chevron-right">›</span>' +
              '</div>';
          }).join('') +
        '</div>' : '') +
      '</div>';

    resultsEl.style.display = 'block';

    // AI panel
    if (aiEl && ai) {
      aiEl.style.display = 'block';
      aiEl.innerHTML =
        '<div class="' + (aiEl.dataset.variant === 'dashboard' ? 'cz-dash-form-card' : 'liquid-glass') + ' cz-ai-panel">' +
          '<div class="cz-ai-header">' +
            '<div class="cz-ai-title"><svg class="cz-ai-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>Aegis AI Insight</div>' +
            '<span class="cz-rec-badge">Recommended</span>' +
          '</div>' +
          '<p class="cz-ai-body">' + esc(ai.summary || '') + '</p>' +
          (best.savings ? '<div class="cz-savings-box"><div class="cz-save-amount">You save ₦' + fmt(best.savings) + '</div><div class="cz-save-lbl">compared to the next best option</div><div class="cz-ai-badges"><span class="cz-ai-badge">↗ Low Fees</span><span class="cz-ai-badge">⚡ Fastest</span><span class="cz-ai-badge">✓ Reliable</span></div></div>' : '') +
          '<div class="cz-guide-title">' + (aiEl.dataset.variant === 'dashboard' ? 'Step-by-step Guide' : 'What happens next?') + '</div>' +
          '<div class="cz-steps">' +
          (ai.steps || []).map(function (s, i) {
            return '<div class="cz-step"><div class="cz-step-num">' + (i + 1) + '</div><div><span class="cz-step-title">' + esc(s.title) + '</span><span class="cz-step-desc">' + esc(s.desc) + '</span></div></div>' +
              (i < (ai.steps.length - 1) ? '<div class="cz-step-line"></div>' : '');
          }).join('') +
          '</div>' +
          '<button class="cz-view-guide">View step-by-step guide <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></button>' +
        '</div>';
    }
  }

  /* ══════════════════════════════════
     SIDEBAR (Dashboard)
  ══════════════════════════════════ */
  var sbToggle = document.getElementById('czSidebarToggle');
  var sidebar = document.getElementById('czSidebar');
  var sbOverlay = document.getElementById('czSbOverlay');

  if (sbToggle && sidebar) {
    sbToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (sbOverlay) sbOverlay.classList.toggle('show');
    });
  }
  if (sbOverlay) {
    sbOverlay.addEventListener('click', function () {
      if (sidebar) sidebar.classList.remove('open');
      sbOverlay.classList.remove('show');
    });
  }

  document.querySelectorAll('.cz-sb-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.cz-sb-item').forEach(function (i) { i.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  /* ══════════════════════════════════
     AMOUNT FORMATTING
  ══════════════════════════════════ */
  document.querySelectorAll('.cz-amount-in').forEach(function (input) {
    input.addEventListener('focus', function () { this.value = this.value.replace(/,/g, ''); });
    input.addEventListener('blur', function () {
      var v = parseFloat(this.value.replace(/,/g, ''));
      if (!isNaN(v)) this.value = v.toLocaleString('en-NG');
    });
  });

  /* ══════════════════════════════════
     SCROLL REVEAL (simulate GSAP)
  ══════════════════════════════════ */
  function revealOnScroll() {
    var els = document.querySelectorAll('[data-reveal]');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { observer.observe(el); });
  }

  // Add reveal CSS inline
  var revealStyle = document.createElement('style');
  revealStyle.textContent = '[data-reveal]{opacity:0;transform:translateY(32px);transition:opacity 0.65s ease,transform 0.65s ease}[data-reveal].revealed{opacity:1;transform:none}[data-reveal][data-delay="1"]{transition-delay:0.1s}[data-reveal][data-delay="2"]{transition-delay:0.2s}[data-reveal][data-delay="3"]{transition-delay:0.3s}[data-reveal][data-delay="4"]{transition-delay:0.4s}[data-reveal][data-delay="5"]{transition-delay:0.5s}';
  document.head.appendChild(revealStyle);
  revealOnScroll();

  /* ══════════════════════════════════
     ECOSYSTEM SVG ANIMATION (already in HTML)
  ══════════════════════════════════ */

  /* ══════════════════════════════════
     UTILS
  ══════════════════════════════════ */
  function esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  console.log('Cozanet v2.0.0 loaded');
})();
