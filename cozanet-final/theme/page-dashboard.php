<?php
/**
 * Template Name: Dashboard
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0B0C10">
<?php wp_head(); ?>
</head>
<body <?php body_class('cz-body'); ?>>
<?php wp_body_open(); ?>

<div class="cz-dashboard">

  <!-- Sidebar overlay (mobile) -->
  <div class="cz-sb-overlay" id="czSbOverlay"></div>

  <!-- ══ SIDEBAR ══ -->
  <aside class="cz-sidebar" id="czSidebar">
    <div class="cz-sb-logo">
      <a href="<?php echo esc_url(home_url('/')); ?>" style="display:flex;align-items:center;gap:10px">
        <div class="cz-logo-shield"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0C10" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <div><span class="cz-nav-brand" style="font-size:17px">Cozanet</span><div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#FFC300;letter-spacing:0.1em;font-weight:700;margin-top:-2px">AEGIS</div></div>
      </a>
    </div>

    <nav class="cz-sb-nav">
      <button class="cz-sb-item active" data-section="aegis">
        <span class="cz-sb-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
        <span class="cz-sb-label">Aegis<span class="cz-sb-sublabel">Wallet Funding</span></span>
      </button>
      <button class="cz-sb-item">
        <span class="cz-sb-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></span>
        <span class="cz-sb-label">Transactions</span>
      </button>
      <button class="cz-sb-item">
        <span class="cz-sb-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
        <span class="cz-sb-label">Beneficiaries</span>
      </button>
      <button class="cz-sb-item">
        <span class="cz-sb-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></span>
        <span class="cz-sb-label">Saved Routes</span>
      </button>
      <button class="cz-sb-item">
        <span class="cz-sb-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
        <span class="cz-sb-label">Price Monitor <span class="cz-sb-badge new">New</span></span>
      </button>
      <button class="cz-sb-item">
        <span class="cz-sb-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
        <span class="cz-sb-label">Rewards <span class="cz-sb-badge beta">Beta</span></span>
      </button>
      <button class="cz-sb-item">
        <span class="cz-sb-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M16.24 7.76a6 6 0 0 1 0 8.49M4.93 19.07a10 10 0 0 1 0-14.14M7.76 16.24a6 6 0 0 1 0-8.49"/></svg></span>
        <span class="cz-sb-label">Settings</span>
      </button>
    </nav>

    <div class="cz-sb-community">
      <strong>Join Cozanet Community</strong>
      <p>Get updates, guides and exclusive rewards.</p>
      <a href="#" class="cz-sb-community-btn">Join Now</a>
    </div>

    <div class="cz-sb-footer">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
      <div><strong>Secured by Cozanet</strong><small>Bank-level security</small></div>
    </div>
  </aside>

  <!-- ══ MAIN ══ -->
  <div class="cz-dash-main">

    <!-- Topbar -->
    <header class="cz-dash-topbar">
      <div class="cz-dash-topbar-left">
        <button class="cz-hamburger" id="czSidebarToggle" style="display:block" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <div>
          <div class="cz-dash-title">Aegis</div>
          <div class="cz-dash-sub">Your shield for smart, secure wallet funding.</div>
        </div>
      </div>
      <button class="cz-dash-how-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        How Aegis Works
      </button>
    </header>

    <!-- Content -->
    <div class="cz-dash-content">
      <div class="cz-dash-grid">
        <div>
          <div class="cz-dash-form-card">
            <div class="cz-dash-form-title">Find the best way to fund your wallet</div>
            <?php echo do_shortcode('[cozanet_route_widget variant="dashboard"]'); ?>
          </div>
          <div id="czDashResults" style="margin-top:24px"></div>
        </div>
        <div id="czDashAI" data-variant="dashboard" style="display:none"></div>
      </div>
    </div>

    <!-- Trust Bar -->
    <div class="cz-trust-bar">
      <div class="cz-trust-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>
        <div><strong>Best Price Guarantee</strong><small>We compare 20+ providers</small></div>
      </div>
      <div class="cz-trust-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
        <div><strong>No Hidden Fees</strong><small>100% transparent pricing</small></div>
      </div>
      <div class="cz-trust-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div><strong>Real-time Data</strong><small>Live rates &amp; availability</small></div>
      </div>
      <div class="cz-trust-item">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <div><strong>Secure &amp; Trusted</strong><small>Your safety is our priority</small></div>
      </div>
    </div>

  </div><!-- /dash-main -->
</div><!-- /dashboard -->

<?php wp_footer(); ?>
</body>
</html>
