<?php
/**
 * Cozanet Aegis — Main Template
 * Full-page Aegis Wallet Funding experience
 */
get_header();
$theme_uri = get_template_directory_uri();
?>

<!-- ═══════════════════════════════════════════════════════
     COZANET AEGIS v3.0.0
     Premium dark UI — Wallet Funding Platform
═══════════════════════════════════════════════════════ -->

<!-- ────────────── LANDING VIEW ────────────── -->
<div id="cz-landing">

  <!-- Navigation -->
  <nav id="cz-nav">
    <div class="cz-nav-inner">
      <div class="cz-logo" onclick="czShowLanding()">
        <img src="<?= $theme_uri ?>/assets/images/logo.png" alt="Cozanet" onerror="this.style.display='none'">
        <span class="cz-logo-name">Cozanet</span>
      </div>
      <div class="cz-nav-links">
        <a href="#">Home</a>
        <a href="#">How it works</a>
        <a href="#" class="cz-dropdown">For you <span class="caret">▾</span></a>
        <a href="#">Ecosystem</a>
        <a href="#" class="cz-dropdown">Company <span class="caret">▾</span></a>
      </div>
      <div class="cz-nav-actions">
        <button class="cz-btn-theme" title="Toggle theme">🌙</button>
        <button class="cz-btn-login" onclick="czShowApp()">Log in</button>
        <button class="cz-btn-primary" onclick="czShowApp()">Get Started</button>
      </div>
      <button class="cz-hamburger" onclick="czToggleMobile()">☰</button>
    </div>
    <div class="cz-mobile-menu" id="czMobileMenu">
      <a href="#" onclick="czToggleMobile()">Home</a>
      <a href="#" onclick="czToggleMobile()">How it works</a>
      <a href="#" onclick="czToggleMobile()">Ecosystem</a>
      <a href="#" onclick="czToggleMobile()">Company</a>
      <button class="cz-btn-primary" style="width:100%;margin-top:8px;" onclick="czShowApp()">Get Started</button>
    </div>
  </nav>

  <!-- Hero -->
  <section id="cz-hero">
    <div class="cz-hero-glow"></div>
    <div class="cz-hero-bg">
      <img src="<?= $theme_uri ?>/assets/images/hero_city.jpg" alt="" onerror="this.style.display='none'">
      <div class="cz-hero-overlay"></div>
    </div>
    <div class="cz-hero-inner">
      <!-- Left -->
      <div class="cz-hero-left">
        <div class="cz-phase-tag">Phase 1: Wallet Funding</div>
        <h1 class="cz-hero-title">The Future of<br><span class="cz-gold">African Remittance</span></h1>
        <p class="cz-hero-sub">Move your money the smart way. Cozanet finds the best route to fund any crypto wallet from your bank.</p>
        <div class="cz-hero-icons">
          <div class="cz-hero-icon-item">
            <div class="cz-icon-circle">💰</div>
            <div><strong>Cheaper</strong><br><small>Save on fees</small></div>
          </div>
          <div class="cz-hero-icon-item">
            <div class="cz-icon-circle">⚡</div>
            <div><strong>Faster</strong><br><small>Get there in minutes</small></div>
          </div>
          <div class="cz-hero-icon-item">
            <div class="cz-icon-circle">🛡</div>
            <div><strong>Safer</strong><br><small>Routed with care</small></div>
          </div>
        </div>
        <div class="cz-trust-line">
          <span class="cz-muted">Trusted by Africans across 20+ countries</span>
          <div class="cz-flags">🇳🇬🇬🇭🇰🇪🇿🇦🇨🇮🇨🇲</div>
          <span class="cz-gold-text">5,000+ Transactions completed</span>
        </div>
      </div>

      <!-- Right: Route Finder -->
      <div class="cz-hero-right">
        <div class="cz-widget">
          <div class="cz-widget-title">Find the best way to fund your wallet <span class="cz-info">ⓘ</span></div>
          <div class="cz-form-row">
            <div class="cz-form-group">
              <label>You send</label>
              <div class="cz-input-wrap">
                <input type="number" value="100000" class="cz-amount-input">
                <div class="cz-currency-sel">
                  <span>🇳🇬</span>
                  <select class="cz-sel-inline">
                    <option>NGN</option><option>GHS</option><option>KES</option><option>ZAR</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="cz-form-group">
              <label>Wallet address</label>
              <div class="cz-input-full">
                <input type="text" placeholder="0x8f3...9Ab4" class="cz-addr-input">
                <button class="cz-icon-btn" title="Scan QR">⧉</button>
              </div>
            </div>
          </div>
          <div class="cz-form-row cz-form-row-3">
            <div class="cz-form-group">
              <label>You want</label>
              <select class="cz-select"><option>🔵 USDT</option><option>ETH</option><option>BNB</option><option>USDC</option></select>
            </div>
            <div class="cz-form-group">
              <label>Network</label>
              <select class="cz-select"><option>◆ BSC</option><option>Ethereum</option><option>Polygon</option><option>Arbitrum</option></select>
            </div>
            <div class="cz-form-group">
              <label>Priority</label>
              <select class="cz-select"><option>Cheapest</option><option>Fastest</option><option>Most Reliable</option></select>
            </div>
          </div>
          <button class="cz-find-btn" onclick="czShowApp()">Find Best Route →</button>
          <div class="cz-guarantees">
            <span>✓ Best price guarantee</span>
            <span>✓ Real-time comparison</span>
            <span>✓ No hidden fees</span>
          </div>
        </div>

        <!-- Preview route result -->
        <div class="cz-route-preview">
          <div class="cz-rec-route">
            <div class="cz-rec-badge">● Recommended</div>
            <div class="cz-route-row">
              <div class="cz-route-logo cz-q">Q</div>
              <div class="cz-route-info">
                <div class="cz-route-name">Quidax</div>
                <div class="cz-route-type">Direct Purchase</div>
                <div class="cz-savings">You save ₦3,200</div>
              </div>
              <div class="cz-metrics">
                <div class="cz-metric"><div class="cz-mlabel">You pay</div><div class="cz-mval">₦96,800</div></div>
                <div class="cz-metric"><div class="cz-mlabel">Time</div><div class="cz-mval">15 min</div><div class="cz-msub green">Fast</div></div>
                <div class="cz-metric"><div class="cz-mlabel">Fees</div><div class="cz-mval">₦3,200</div></div>
                <div class="cz-metric"><div class="cz-mlabel">Risk</div><div class="cz-mval" style="display:flex;align-items:center;gap:4px;">Low <span class="cz-dot green-dot"></span></div></div>
              </div>
              <span class="cz-chev">›</span>
            </div>
          </div>
          <div class="cz-ai-mini">
            <div class="cz-ai-hdr"><span class="cz-spark">✦</span> AI Insight <span class="cz-rec-tag">Recommended</span></div>
            <p>Quidax offers the best balance of speed, fees, and reliability. You save ₦3,200 vs the next best option.</p>
            <div class="cz-ai-badges">
              <span class="cz-ai-badge"><span class="cz-dot green-dot"></span>Low Fees</span>
              <span class="cz-ai-badge"><span class="cz-dot green-dot"></span>Fastest</span>
              <span class="cz-ai-badge"><span class="cz-dot green-dot"></span>Reliable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust Bar -->
  <div class="cz-trust-bar">
    <div class="cz-trust-item"><div class="cz-t-icon">🛡</div><div><strong>Secure & Trusted</strong><br><small>Your safety is our priority</small></div></div>
    <div class="cz-trust-item"><div class="cz-t-icon">🔐</div><div><strong>Bank-Level Security</strong><br><small>256-bit encryption</small></div></div>
    <div class="cz-trust-item"><div class="cz-t-icon">🔑</div><div><strong>Non-Custodial</strong><br><small>You own your assets</small></div></div>
    <div class="cz-trust-item"><div class="cz-t-icon">💬</div><div><strong>24/7 Support</strong><br><small>Here for you always</small></div></div>
  </div>

  <!-- Footer -->
  <footer class="cz-footer">
    <div class="cz-footer-inner">
      <div class="cz-footer-top">
        <div class="cz-footer-brand">
          <img src="<?= $theme_uri ?>/assets/images/logo.png" alt="Cozanet" height="32" onerror="this.style.display='none'">
          <span>Cozanet</span>
        </div>
        <div class="cz-footer-links">
          <a href="#">About</a><a href="#">How It Works</a><a href="#">Ecosystem</a>
          <a href="#">Whitepaper</a><a href="#">Contact</a>
        </div>
        <div class="cz-social">
          <a href="#" title="Twitter">𝕏</a>
          <a href="#" title="Telegram">✈</a>
          <a href="#" title="Discord">◈</a>
        </div>
      </div>
      <div class="cz-footer-bottom">
        <span>© 2025 Cozanet. All rights reserved.</span>
        <span>Built for Africa. Powered by Cozanet Protocol.</span>
      </div>
    </div>
  </footer>

</div><!-- /landing -->


<!-- ────────────── APP VIEW ────────────── -->
<div id="cz-app" style="display:none;">

  <!-- App Top Bar -->
  <header id="cz-topbar">
    <div class="cz-tb-logo" onclick="czShowLanding()">
      <img src="<?= $theme_uri ?>/assets/images/logo.png" alt="" height="28" onerror="this.style.display='none'">
      <div class="cz-tb-brand">
        <span class="cz-tb-name">Cozanet</span>
        <span class="cz-tb-sub">AEGIS</span>
      </div>
    </div>
    <div class="cz-tb-right">
      <button class="cz-tb-icon" title="Notifications">🔔</button>
      <button class="cz-tb-icon" title="Dark mode">🌙</button>
      <div class="cz-wallet-pill">
        <span class="cz-w-dot"></span>
        <span>0x8f3...9Ab4</span>
        <span class="cz-caret">▾</span>
      </div>
    </div>
  </header>

  <!-- App Layout -->
  <div id="cz-app-layout">

    <!-- Sidebar -->
    <nav id="cz-sidebar">
      <div class="cz-sb-section">Menu</div>
      <div class="cz-sb-item active" data-tab="aegis">
        <span class="cz-sb-icon">🛡</span><span>Aegis</span>
        <span class="cz-sb-sub">Wallet Funding</span>
      </div>
      <div class="cz-sb-section">Tools</div>
      <div class="cz-sb-item" data-tab="tx"><span class="cz-sb-icon">↔</span><span>Transactions</span></div>
      <div class="cz-sb-item" data-tab="ben"><span class="cz-sb-icon">👥</span><span>Beneficiaries</span></div>
      <div class="cz-sb-item" data-tab="routes"><span class="cz-sb-icon">🔗</span><span>Saved Routes</span></div>
      <div class="cz-sb-item" data-tab="price">
        <span class="cz-sb-icon">📊</span><span>Price Monitor</span>
        <span class="cz-badge cz-badge-new">New</span>
      </div>
      <div class="cz-sb-item" data-tab="rewards">
        <span class="cz-sb-icon">⭐</span><span>Rewards</span>
        <span class="cz-badge cz-badge-beta">Beta</span>
      </div>
      <div class="cz-sb-section">Account</div>
      <div class="cz-sb-item" data-tab="settings"><span class="cz-sb-icon">⚙</span><span>Settings</span></div>
      <div class="cz-sb-item" onclick="czShowLanding()"><span class="cz-sb-icon">🚪</span><span>Sign out</span></div>

      <div class="cz-sb-footer">
        <div class="cz-community-card">
          <strong>Join Cozanet Community</strong>
          <p>Get updates, guides and exclusive rewards.</p>
          <button class="cz-btn-primary" style="width:100%;margin-top:8px;font-size:12px;">Join Now</button>
          <div class="cz-avatar-row" style="margin-top:10px;text-align:center;font-size:22px;">👥 👤 👥</div>
        </div>
        <div class="cz-secure-tag">
          <span class="cz-gold-text">🛡</span>
          <div><strong>Secured by Cozanet</strong><br><small>Bank-level security</small></div>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <main id="cz-main">

      <!-- Page Header -->
      <div class="cz-page-hdr">
        <div>
          <h1 class="cz-page-title"><span class="cz-gold-text">🛡</span> Aegis</h1>
          <p class="cz-muted">Your shield for smart, secure wallet funding.</p>
        </div>
        <button class="cz-how-btn">
          <span class="cz-play-btn">▶</span>
          How Aegis Works
        </button>
      </div>

      <!-- Content Grid -->
      <div class="cz-content-grid">

        <!-- LEFT: Main Widget -->
        <div class="cz-left-col">

          <!-- Find Route Widget -->
          <div class="cz-card">
            <div class="cz-card-title">Find the best way to fund your wallet</div>
            <div class="cz-form-row">
              <div class="cz-form-group">
                <label>You send</label>
                <div class="cz-input-wrap">
                  <input type="number" value="100000" class="cz-amount-input">
                  <div class="cz-currency-sel">
                    <span>🇳🇬</span>
                    <select class="cz-sel-inline">
                      <option>NGN</option><option>GHS</option><option>KES</option><option>ZAR</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="cz-form-group">
                <label>You want</label>
                <select class="cz-select"><option>🔵 USDT</option><option>ETH</option><option>BNB</option><option>USDC</option></select>
              </div>
            </div>
            <div class="cz-form-group" style="margin-bottom:14px;">
              <label>Wallet address</label>
              <div class="cz-input-full">
                <input type="text" value="0x8f3c...9Ab4eF2d7B8c6A3fEd6B89c2a4F5e6d7C8b9A0" class="cz-addr-input">
                <button class="cz-icon-btn" title="Copy">⊞</button>
                <button class="cz-icon-btn" title="Scan">⧉</button>
                <span class="cz-valid-tag">✓ Valid address</span>
              </div>
            </div>
            <div class="cz-form-row cz-form-row-2">
              <div class="cz-form-group">
                <label>Network</label>
                <select class="cz-select"><option>◆ BSC</option><option>Ethereum</option><option>Polygon</option><option>Arbitrum</option></select>
              </div>
              <div class="cz-form-group">
                <label>Priority</label>
                <select class="cz-select"><option>Cheapest</option><option>Fastest</option><option>Most Reliable</option></select>
              </div>
            </div>
            <button class="cz-find-btn cz-find-btn-full" id="czFindBtn" onclick="czFindRoute()">Find Best Route ✦</button>
          </div>

          <!-- Routes Section -->
          <div style="margin-top:20px;">
            <div class="cz-section-title">Best Route For You</div>

            <!-- Recommended Route -->
            <div class="cz-rec-route-card">
              <div class="cz-rec-badge">● Recommended</div>
              <div class="cz-route-row">
                <div class="cz-route-logo cz-q">Q</div>
                <div class="cz-route-info">
                  <div class="cz-route-name">Quidax</div>
                  <div class="cz-route-type">Direct Purchase</div>
                  <div class="cz-savings">You save ₦3,200</div>
                </div>
                <div class="cz-metrics">
                  <div class="cz-metric">
                    <div class="cz-mlabel">You pay (est.)</div>
                    <div class="cz-mval">₦96,800</div>
                  </div>
                  <div class="cz-metric">
                    <div class="cz-mlabel">Time</div>
                    <div class="cz-mval">15 min</div>
                    <div class="cz-msub green">Fast</div>
                  </div>
                  <div class="cz-metric">
                    <div class="cz-mlabel">Total Fees</div>
                    <div class="cz-mval">₦3,200</div>
                    <div class="cz-msub">3.2%</div>
                  </div>
                  <div class="cz-metric">
                    <div class="cz-mlabel">Risk</div>
                    <div class="cz-mval" style="display:flex;align-items:center;gap:4px;">Low <span class="cz-dot green-dot"></span></div>
                  </div>
                </div>
                <span class="cz-chev">›</span>
              </div>
            </div>

            <!-- Other Options Table -->
            <div class="cz-other-title">Other Options</div>
            <div class="cz-routes-table-head">
              <span>Route</span><span>You pay (est.)</span><span>Time</span><span>Total Fees</span><span>Risk</span><span></span>
            </div>
            <div class="cz-route-other">
              <div class="cz-route-name-cell"><div class="cz-mini-logo" style="color:#f0b90b;background:#1a1400;">◆</div><span>Binance P2P</span></div>
              <span>₦95,500</span><span>25 min</span><span>₦4,500 (4.5%)</span>
              <span style="display:flex;align-items:center;gap:5px;"><span class="cz-dot orange-dot"></span>Medium</span>
              <span style="color:var(--cz-muted)">›</span>
            </div>
            <div class="cz-route-other">
              <div class="cz-route-name-cell"><div class="cz-mini-logo" style="color:#f59e0b;background:#1a1200;">Y</div><span>Yellow Card</span></div>
              <span>₦97,900</span><span>20 min</span><span>₦2,100 (2.1%)</span>
              <span style="display:flex;align-items:center;gap:5px;"><span class="cz-dot green-dot"></span>Low</span>
              <span style="color:var(--cz-muted)">›</span>
            </div>
            <div class="cz-route-other">
              <div class="cz-route-name-cell"><div class="cz-mini-logo" style="color:#818cf8;background:#0a1020;">Px</div><span>Paxful P2P</span></div>
              <span>₦94,800</span><span>30 min</span><span>₦5,200 (5.5%)</span>
              <span style="display:flex;align-items:center;gap:5px;"><span class="cz-dot red-dot"></span>High</span>
              <span style="color:var(--cz-muted)">›</span>
            </div>

            <!-- Why This Route -->
            <div class="cz-why-grid">
              <div class="cz-why-item">
                <span style="color:#22c55e;font-size:16px;">✓</span>
                <div><strong>Lower total cost</strong><br><small>Saves you more</small></div>
              </div>
              <div class="cz-why-item">
                <span style="color:var(--cz-gold);font-size:16px;">⚡</span>
                <div><strong>Faster settlement</strong><br><small>Money in 15 minutes</small></div>
              </div>
              <div class="cz-why-item">
                <span style="color:#6366f1;font-size:16px;">🛡</span>
                <div><strong>High reliability</strong><br><small>99.9% success rate</small></div>
              </div>
            </div>
          </div>

          <!-- Trust Bar -->
          <div class="cz-trust-bar cz-trust-bar-compact">
            <div class="cz-trust-item"><div class="cz-t-icon">🛡</div><div><strong>Best Price Guarantee</strong><br><small>We compare 20+ providers</small></div></div>
            <div class="cz-trust-item"><div class="cz-t-icon">🔍</div><div><strong>No Hidden Fees</strong><br><small>100% transparent pricing</small></div></div>
            <div class="cz-trust-item"><div class="cz-t-icon">📡</div><div><strong>Real-time Data</strong><br><small>Live rates & availability</small></div></div>
            <div class="cz-trust-item"><div class="cz-t-icon">🔐</div><div><strong>Secure & Trusted</strong><br><small>Your safety is our priority</small></div></div>
          </div>
        </div><!-- /left col -->

        <!-- RIGHT: AI Panel -->
        <div class="cz-right-col">

          <!-- AI Insight Card -->
          <div class="cz-card cz-ai-card">
            <div class="cz-ai-hdr-full">
              <div class="cz-ai-title-full"><span class="cz-spark">✦</span> Aegis AI Insight</div>
              <span class="cz-rec-tag">Recommended</span>
            </div>
            <p class="cz-muted" style="font-size:14px;line-height:1.65;margin-bottom:16px;">
              Quidax offers the best balance of low fees, fast settlement, and high reliability for your transaction.
            </p>
            <div class="cz-savings-box">
              <div class="cz-savings-amt">You save ₦3,200</div>
              <div class="cz-savings-lbl">compared to the next best option</div>
            </div>
            <div class="cz-ai-badges">
              <span class="cz-ai-badge"><span class="cz-dot green-dot"></span>Low Fees</span>
              <span class="cz-ai-badge"><span class="cz-dot green-dot"></span>Fastest</span>
              <span class="cz-ai-badge"><span class="cz-dot green-dot"></span>Reliable</span>
            </div>
          </div>

          <!-- Step Guide -->
          <div class="cz-card">
            <div class="cz-card-title">Step-by-step Guide</div>
            <div class="cz-steps">
              <div class="cz-step">
                <div class="cz-step-num">1</div>
                <div class="cz-step-body">
                  <strong>Deposit ₦100,000</strong>
                  <span>Transfer to Quidax using your bank.</span>
                </div>
              </div>
              <div class="cz-step-line"></div>
              <div class="cz-step">
                <div class="cz-step-num">2</div>
                <div class="cz-step-body">
                  <strong>Buy USDT</strong>
                  <span>Purchase USDT with your NGN balance.</span>
                </div>
              </div>
              <div class="cz-step-line"></div>
              <div class="cz-step">
                <div class="cz-step-num">3</div>
                <div class="cz-step-body">
                  <strong>Withdraw to Wallet</strong>
                  <span>Paste your wallet address and select BSC.</span>
                </div>
              </div>
              <div class="cz-step-line"></div>
              <div class="cz-step">
                <div class="cz-step-num">4</div>
                <div class="cz-step-body">
                  <strong>Confirm Network</strong>
                  <span>Ensure you select BSC network.</span>
                </div>
              </div>
              <div class="cz-step-line"></div>
              <div class="cz-step">
                <div class="cz-step-num">5</div>
                <div class="cz-step-body">
                  <strong>Receive USDT</strong>
                  <span>USDT will be sent to your wallet.</span>
                </div>
              </div>
            </div>
            <button class="cz-outline-btn">View Detailed Guide ↗</button>
          </div>

        </div><!-- /right col -->
      </div><!-- /content grid -->
    </main>
  </div><!-- /app layout -->

</div><!-- /app view -->

<?php get_footer(); ?>
