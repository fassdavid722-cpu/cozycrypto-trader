/**
 * Cozanet Aegis — Frontend JS
 * ONLY handles: UI interactions, sending requests to REST API, rendering results.
 * ALL logic (routing, scoring, AI) lives in the WordPress plugin.
 */
(function () {
  'use strict';

  const API = window.CZAPI || { base: '/wp-json/cozanet/v1', nonce: '' };

  /* ══════════════════════════════════
     NAV — scroll effect + hamburger
  ══════════════════════════════════ */
  const header = document.getElementById('cz-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  const hamburger = document.getElementById('czHamburger');
  const mobileMenu = document.getElementById('czMobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
    });
  }

  /* ══════════════════════════════════
     SIDEBAR — active state
  ══════════════════════════════════ */
  document.querySelectorAll('.cz-sb-item[data-section]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.cz-sb-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  /* ══════════════════════════════════
     WALLET ADDRESS — copy/paste
  ══════════════════════════════════ */
  const pasteBtn = document.getElementById('czPasteAddr');
  const addrInput = document.getElementById('czWalletAddr');
  if (pasteBtn && addrInput) {
    pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        addrInput.value = text;
        validateAddress(addrInput);
      } catch (e) {
        addrInput.focus();
      }
    });
  }
  const copyBtn = document.getElementById('czCopyAddr');
  if (copyBtn && addrInput) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(addrInput.value).catch(() => {});
    });
  }

  function validateAddress(input) {
    const val = (input ? input.value : '').trim();
    const validTag = document.getElementById('czAddrValid');
    if (!validTag) return;
    const isValid = /^0x[0-9a-fA-F]{40,}$/.test(val) || val.length > 30;
    validTag.style.display = isValid ? 'flex' : 'none';
  }

  if (addrInput) addrInput.addEventListener('input', () => validateAddress(addrInput));

  /* ══════════════════════════════════
     AMOUNT — number formatting
  ══════════════════════════════════ */
  document.querySelectorAll('.cz-amount-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.value = input.value.replace(/,/g, '');
    });
    input.addEventListener('blur', () => {
      const val = parseFloat(input.value.replace(/,/g, ''));
      if (!isNaN(val)) input.value = val.toLocaleString('en-NG');
    });
  });

  /* ══════════════════════════════════
     FIND BEST ROUTE — main action
  ══════════════════════════════════ */
  const findBtn = document.getElementById('czFindRouteBtn');
  if (findBtn) {
    findBtn.addEventListener('click', findBestRoute);
  }

  async function findBestRoute() {
    const amount = parseInt((document.getElementById('czAmount')?.value || '0').replace(/,/g, ''), 10);
    const from_currency = document.getElementById('czFromCurrency')?.value || 'NGN';
    const to_crypto = document.getElementById('czToCrypto')?.value || 'USDT';
    const network = document.getElementById('czNetwork')?.value || 'BSC';
    const priority = document.getElementById('czPriority')?.value || 'cheapest';
    const wallet_address = document.getElementById('czWalletAddr')?.value?.trim() || '';

    if (!amount || amount < 100) {
      showFormError('Please enter a valid amount (minimum 100).');
      return;
    }

    showLoading();

    try {
      const resp = await fetch(`${API.base}/route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': API.nonce,
        },
        body: JSON.stringify({ amount, from_currency, to_crypto, network, priority, wallet_address }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message || `Server error ${resp.status}`);
      }

      const data = await resp.json();
      renderRoutes(data, amount, from_currency, to_crypto);
    } catch (err) {
      showError(err.message);
    }
  }

  /* ══════════════════════════════════
     RENDER RESULTS
  ══════════════════════════════════ */
  function renderRoutes(data, amount, from_currency, to_crypto) {
    const wrap = document.getElementById('czRouteResults');
    if (!wrap) return;

    const { best, others, ai_insight } = data;
    if (!best) { showEmpty(); return; }

    const fmt = n => Number(n).toLocaleString('en-NG');

    wrap.innerHTML = `
      <div class="cz-results-title">Best Route For You</div>

      <!-- Best route -->
      <div class="cz-route-best">
        <div class="cz-rec-label">🏆 Recommended</div>
        <div class="cz-route-row">
          <div class="cz-route-logo" style="background:${best.color || '#1a2a4a'}">
            ${best.icon || best.name.charAt(0)}
          </div>
          <div class="cz-route-info">
            <div class="cz-route-name">${esc(best.name)}</div>
            <div class="cz-route-type">${esc(best.type || 'Direct Purchase')}</div>
            ${best.savings ? `<div class="cz-route-saving">You save ₦${fmt(best.savings)}</div>` : ''}
          </div>
          <div class="cz-route-metrics">
            <div class="cz-metric">
              <div class="cz-metric-label">You pay (est.)</div>
              <div class="cz-metric-val">₦${fmt(best.you_pay)}</div>
            </div>
            <div class="cz-metric">
              <div class="cz-metric-label">Time</div>
              <div class="cz-metric-val">${esc(best.time)}</div>
              <div class="cz-metric-sub green">${esc(best.speed_label || '')}</div>
            </div>
            <div class="cz-metric">
              <div class="cz-metric-label">Total Fees</div>
              <div class="cz-metric-val">₦${fmt(best.total_fees)}</div>
              <div class="cz-metric-sub">${best.fee_pct || ''}%</div>
            </div>
            <div class="cz-metric">
              <div class="cz-metric-label">Risk</div>
              <div class="cz-metric-val">${esc(best.risk)}</div>
              <div class="cz-dot-risk cz-dot-${riskDot(best.risk)}"></div>
            </div>
          </div>
          <span class="cz-route-chev">›</span>
        </div>

        <!-- Why this route -->
        <div class="cz-why-row">
          ${renderWhyItems(best.why || [])}
        </div>
      </div>

      <!-- Other options -->
      ${others && others.length ? `
        <div class="cz-others-label">Other Options</div>
        <div class="cz-routes-th">
          <span>Route</span><span>You pay (est.)</span><span>Time</span>
          <span>Total Fees</span><span>Risk</span><span></span>
        </div>
        ${others.map(r => `
          <div class="cz-route-row-other">
            <div class="cz-route-cell-name">
              <div class="cz-mini-logo" style="background:${r.color || '#222'}">${r.icon || r.name.charAt(0)}</div>
              <span>${esc(r.name)}</span>
            </div>
            <span>₦${fmt(r.you_pay)}</span>
            <span>${esc(r.time)}</span>
            <span>₦${fmt(r.total_fees)} (${r.fee_pct}%)</span>
            <span><span class="cz-dot-risk cz-dot-${riskDot(r.risk)}"></span> ${esc(r.risk)}</span>
            <span>›</span>
          </div>
        `).join('')}
      ` : ''}
    `;

    // Update AI card
    if (ai_insight) renderAI(ai_insight, best);
  }

  function renderWhyItems(items) {
    const defaults = [
      { icon: '✅', label: 'Lower total cost', desc: 'Saves you more' },
      { icon: '⚡', label: 'Faster settlement', desc: 'Money in minutes' },
      { icon: '🛡', label: 'High reliability', desc: '99.9% success rate' },
    ];
    const list = (items.length ? items : defaults).slice(0, 3);
    return list.map(i => `
      <div class="cz-why-item">
        <span class="cz-why-icon">${i.icon || '✅'}</span>
        <div><strong>${esc(i.label)}</strong><small>${esc(i.desc)}</small></div>
      </div>
    `).join('');
  }

  function renderAI(insight, best) {
    const aiBody = document.getElementById('czAIBody');
    const aiSavings = document.getElementById('czAISavings');
    const aiSteps = document.getElementById('czAISteps');

    if (aiBody) aiBody.textContent = insight.summary || '';
    if (aiSavings && best.savings) {
      aiSavings.querySelector('.cz-savings-amount').textContent = `You save ₦${Number(best.savings).toLocaleString('en-NG')}`;
    }
    if (aiSteps && insight.steps) {
      aiSteps.innerHTML = insight.steps.map((s, i) => `
        <div class="cz-guide-step">
          <div class="cz-step-circle">${i + 1}</div>
          <div class="cz-step-text">
            <strong>${esc(s.title)}</strong>
            <span>${esc(s.desc)}</span>
          </div>
        </div>
        ${i < insight.steps.length - 1 ? '<div class="cz-step-line"></div>' : ''}
      `).join('');
    }
  }

  /* ══════════════════════════════════
     UI STATE HELPERS
  ══════════════════════════════════ */
  function showLoading() {
    const wrap = document.getElementById('czRouteResults');
    if (wrap) wrap.innerHTML = `
      <div class="cz-loading">
        <div class="cz-spinner"></div>
        Scanning 20+ providers for the best route...
      </div>
    `;
    const btn = document.getElementById('czFindRouteBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Scanning...' }
  }

  function showError(msg) {
    const wrap = document.getElementById('czRouteResults');
    if (wrap) wrap.innerHTML = `<div class="cz-error-box">⚠️ ${esc(msg)}</div>`;
    const btn = document.getElementById('czFindRouteBtn');
    if (btn) { btn.disabled = false; btn.innerHTML = 'Find Best Route &rarr;' }
  }

  function showEmpty() {
    const wrap = document.getElementById('czRouteResults');
    if (wrap) wrap.innerHTML = `
      <div class="cz-empty-state">
        <div class="cz-empty-icon">🔍</div>
        <p>No routes found for this combination. Try different settings.</p>
      </div>
    `;
  }

  function showFormError(msg) {
    const existing = document.getElementById('czFormError');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.id = 'czFormError';
    el.className = 'cz-error-box';
    el.style.marginBottom = '14px';
    el.textContent = msg;
    const form = document.getElementById('czFindRouteBtn');
    if (form) form.parentNode.insertBefore(el, form);
    setTimeout(() => el.remove(), 4000);
  }

  function riskDot(risk) {
    if (!risk) return 'green';
    const r = risk.toLowerCase();
    if (r === 'low') return 'green';
    if (r === 'medium') return 'orange';
    return 'red';
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ══════════════════════════════════
     RESET find btn after any render
  ══════════════════════════════════ */
  const observer = new MutationObserver(() => {
    const btn = document.getElementById('czFindRouteBtn');
    const results = document.getElementById('czRouteResults');
    if (btn && results && results.innerHTML && !results.querySelector('.cz-loading')) {
      btn.disabled = false;
      btn.innerHTML = 'Find Best Route &rarr;';
    }
  });
  const results = document.getElementById('czRouteResults');
  if (results) observer.observe(results, { childList: true });

  console.log('Cozanet Aegis UI v1.0.0 ready');
})();
