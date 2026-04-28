<?php get_header(); ?>

<!-- ═══════════════════════════════════
     SECTION 1: HERO
═══════════════════════════════════ -->
<section class="cz-hero" id="home" aria-label="Hero">
  <div class="cz-hero-bg">
    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero_city.jpg" alt="" aria-hidden="true" loading="eager">
    <div class="cz-hero-overlay"></div>
    <div class="cz-hero-glow"></div>
  </div>

  <div class="cz-hero-inner">
    <!-- Left: Headline -->
    <div class="cz-hero-left">
      <div class="cz-phase-badge">🛡 Phase 1: Wallet Funding</div>
      <h1 class="cz-hero-h1">
        The Future of<br>
        <span class="cz-gold">African Remittance</span>
      </h1>
      <p class="cz-hero-p">Move your money the smart way. Cozanet finds the best route to fund any crypto wallet from your bank.</p>

      <div class="cz-hero-pills">
        <div class="cz-pill">
          <div class="cz-pill-icon">💰</div>
          <div><strong>Cheaper</strong><small>Save on fees</small></div>
        </div>
        <div class="cz-pill">
          <div class="cz-pill-icon">⚡</div>
          <div><strong>Faster</strong><small>Get there in minutes</small></div>
        </div>
        <div class="cz-pill">
          <div class="cz-pill-icon">🛡</div>
          <div><strong>Safer</strong><small>Routed with care</small></div>
        </div>
      </div>

      <div class="cz-trust-line">
        <span>Trusted by Africans across 20+ countries</span>
        <div class="cz-flags">🇳🇬 🇬🇭 🇰🇪 🇿🇦 🇨🇮 🇨🇲</div>
        <span class="cz-tx-count">5,000+ transactions</span>
      </div>
    </div>

    <!-- Right: Aegis Widget (calls REST API via JS) -->
    <div class="cz-hero-right">
      <?php echo do_shortcode('[cozanet_aegis_widget]'); ?>
    </div>
  </div>

  <!-- Trust bar -->
  <div class="cz-trust-bar-wrap">
    <div class="cz-trust-bar">
      <div class="cz-trust-item"><span class="cz-t-icon">🛡</span><div><strong>Secure & Trusted</strong><small>Your safety is our priority</small></div></div>
      <div class="cz-trust-item"><span class="cz-t-icon">🔐</span><div><strong>Bank-Level Security</strong><small>256-bit encryption</small></div></div>
      <div class="cz-trust-item"><span class="cz-t-icon">🔓</span><div><strong>Non-Custodial</strong><small>You own your assets</small></div></div>
      <div class="cz-trust-item"><span class="cz-t-icon">🕐</span><div><strong>24/7 Support</strong><small>Here for you always</small></div></div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════
     SECTION 2: HOW IT WORKS
═══════════════════════════════════ -->
<section class="cz-section cz-how" id="how-it-works" aria-label="How it works">
  <div class="cz-container">
    <div class="cz-section-hdr">
      <div class="cz-section-tag">HOW IT WORKS</div>
      <h2>Three simple steps to fund<br>your crypto wallet</h2>
      <p>No more guessing which platform to use. Aegis does the heavy lifting.</p>
    </div>

    <div class="cz-steps-grid">
      <div class="cz-step-card">
        <div class="cz-step-num">1</div>
        <div class="cz-step-icon">💳</div>
        <h3>Enter your details</h3>
        <p>Tell us how much you want to send, your currency, target crypto, and wallet address.</p>
      </div>
      <div class="cz-step-connector">→</div>
      <div class="cz-step-card">
        <div class="cz-step-num">2</div>
        <div class="cz-step-icon">🤖</div>
        <h3>Aegis finds best route</h3>
        <p>Our AI scans 20+ providers in real-time — comparing fees, speed, and reliability.</p>
      </div>
      <div class="cz-step-connector">→</div>
      <div class="cz-step-card">
        <div class="cz-step-num">3</div>
        <div class="cz-step-icon">✅</div>
        <h3>Follow the guide</h3>
        <p>Get a step-by-step guide and complete your transaction safely in minutes.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════
     SECTION 3: AEGIS APP (Full Dashboard)
═══════════════════════════════════ -->
<section class="cz-section cz-app-section" id="aegis-app" aria-label="Aegis Dashboard">
  <div class="cz-app-layout">

    <!-- Sidebar -->
    <aside class="cz-sidebar" role="complementary" aria-label="Navigation">
      <div class="cz-sb-logo">
        <div class="cz-logo-icon">🛡</div>
        <div class="cz-logo-text">
          <span class="cz-logo-name">Cozanet</span>
          <span class="cz-logo-tag">AEGIS</span>
        </div>
      </div>

      <nav class="cz-sb-nav" aria-label="Sidebar navigation">
        <div class="cz-sb-section-label">Main</div>
        <a href="#" class="cz-sb-item active" data-section="aegis">
          <span class="cz-sb-icon">🛡</span>
          <span class="cz-sb-label">Aegis<small>Wallet Funding</small></span>
        </a>
        <a href="#" class="cz-sb-item" data-section="transactions">
          <span class="cz-sb-icon">📋</span>
          <span class="cz-sb-label">Transactions</span>
        </a>
        <a href="#" class="cz-sb-item" data-section="beneficiaries">
          <span class="cz-sb-icon">👥</span>
          <span class="cz-sb-label">Beneficiaries</span>
        </a>
        <a href="#" class="cz-sb-item" data-section="saved-routes">
          <span class="cz-sb-icon">⭐</span>
          <span class="cz-sb-label">Saved Routes</span>
        </a>
        <a href="#" class="cz-sb-item" data-section="price-monitor">
          <span class="cz-sb-icon">📊</span>
          <span class="cz-sb-label">Price Monitor<span class="cz-badge cz-badge-new">New</span></span>
        </a>

        <div class="cz-sb-section-label" style="margin-top:16px">Account</div>
        <a href="#" class="cz-sb-item" data-section="rewards">
          <span class="cz-sb-icon">🎁</span>
          <span class="cz-sb-label">Rewards<span class="cz-badge cz-badge-beta">Beta</span></span>
        </a>
        <a href="#" class="cz-sb-item" data-section="settings">
          <span class="cz-sb-icon">⚙️</span>
          <span class="cz-sb-label">Settings</span>
        </a>
      </nav>

      <div class="cz-sb-footer">
        <div class="cz-community-card">
          <strong>Join Cozanet Community</strong>
          <p>Get updates, guides and exclusive rewards.</p>
          <a href="#" class="cz-btn-primary" style="display:block;margin-top:10px;text-align:center;padding:8px 0;font-size:13px;">Join Now</a>
        </div>
        <div class="cz-secure-badge">🛡 Secured by Cozanet · Bank-level security</div>
      </div>
    </aside>

    <!-- App Main Content -->
    <div class="cz-app-main" id="czAppContent">

      <!-- App Topbar -->
      <div class="cz-app-topbar">
        <div class="cz-app-title">
          <span class="cz-app-title-icon">🛡</span>
          <div>
            <h2>Aegis</h2>
            <p>Your shield for smart, secure wallet funding.</p>
          </div>
        </div>
        <div class="cz-app-topbar-right">
          <button class="cz-tb-btn" id="czHowAegisWorks">▶ How Aegis Works</button>
          <button class="cz-tb-icon" id="czNotifBtn" aria-label="Notifications">🔔</button>
          <button class="cz-tb-icon" id="czThemeBtn2" aria-label="Theme">🌙</button>
          <div class="cz-wallet-chip" id="czWalletChip">
            <div class="cz-w-status"></div>
            <span id="czWalletAddr">0x8f3...9Ab4</span>
            <span class="cz-chip-caret">▾</span>
          </div>
        </div>
      </div>

      <!-- Main Aegis Widget (shortcode renders the form + results) -->
      <div class="cz-aegis-wrap" id="czAegisWrap">
        <?php echo do_shortcode('[cozanet_aegis_app]'); ?>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════
     SECTION 4: STATS / GLOBAL NETWORK
═══════════════════════════════════ -->
<section class="cz-section cz-stats-section" id="ecosystem" aria-label="Network stats">
  <div class="cz-container">
    <div class="cz-section-hdr">
      <div class="cz-section-tag">GLOBAL NETWORK</div>
      <h2>Cozanet is live across Africa</h2>
    </div>
    <div class="cz-stats-grid">
      <div class="cz-stat-card">
        <div class="cz-stat-val" id="czStatTVL">$4.1M</div>
        <div class="cz-stat-lbl">Total Value Routed</div>
      </div>
      <div class="cz-stat-card">
        <div class="cz-stat-val" id="czStatTx">3,450</div>
        <div class="cz-stat-lbl">Transactions Today</div>
      </div>
      <div class="cz-stat-card">
        <div class="cz-stat-val" id="czStatSettle">112s</div>
        <div class="cz-stat-lbl">Avg. Settlement</div>
      </div>
      <div class="cz-stat-card">
        <div class="cz-stat-val">20+</div>
        <div class="cz-stat-lbl">Countries Supported</div>
      </div>
    </div>
    <!-- Map visual placeholder -->
    <div class="cz-map-wrap">
      <div class="cz-map-overlay">
        <div class="cz-map-node" style="top:60%;left:50%">Lagos</div>
        <div class="cz-map-node" style="top:58%;left:53%">Accra</div>
        <div class="cz-map-node" style="top:62%;left:51%">Abidjan</div>
        <div class="cz-map-node" style="top:52%;left:62%">Nairobi</div>
        <div class="cz-map-node" style="top:70%;left:57%">Johannesburg</div>
      </div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
