<?php get_header(); ?>
<canvas id="czNeonCanvas"></canvas>
<div class="cz-home">

<!-- ══ HERO ══ -->
<section class="cz-hero">
  <div class="cz-hero-radial"></div>
  <div class="cz-hero-inner">
    <div class="cz-hero-left">
      <div class="cz-hero-badge" data-reveal>PHASE 1: WALLET FUNDING</div>
      <h1 class="cz-hero-h1" data-reveal data-delay="1">
        <span class="line1">The Future of</span>
        <span class="line2 gradient-text">African Remittance</span>
      </h1>
      <p class="cz-hero-sub" data-reveal data-delay="2">Move your money the smart way. Cozanet finds the best route to fund any crypto wallet from your bank.</p>
      <div class="cz-hero-icons" data-reveal data-delay="3">
        <div class="cz-hero-icon"><span>💰</span><div><strong>Cheaper</strong><small>Save on fees</small></div></div>
        <div class="cz-hero-icon"><span>⚡</span><div><strong>Faster</strong><small>Get there in minutes</small></div></div>
        <div class="cz-hero-icon"><span>🛡</span><div><strong>Safer</strong><small>Routed with care</small></div></div>
      </div>
      <div data-reveal data-delay="4">
        <p class="cz-hero-trust-line">Trusted by Africans across 20+ countries</p>
        <div class="cz-hero-flags">
          <div class="cz-flag-circle">🇳🇬</div>
          <div class="cz-flag-circle">🇬🇭</div>
          <div class="cz-flag-circle">🇰🇪</div>
          <div class="cz-flag-circle">🇿🇦</div>
          <div class="cz-flag-circle">🇨🇲</div>
          <div class="cz-flag-circle">🇺🇬</div>
          <span class="cz-tx-count">5,000+ Transactions completed</span>
        </div>
      </div>
    </div>

    <div class="cz-hero-right" data-reveal data-delay="2">
      <?php echo do_shortcode('[cozanet_route_widget]'); ?>
    </div>
  </div>

  <div class="cz-scroll-indicator">
    <div class="cz-scroll-line"></div>
  </div>
</section>

<!-- ══ ROUTE RESULTS (shown after search) ══ -->
<section class="cz-results-section" id="czHomeResults" style="display:none">
  <div class="cz-results-grid">
    <div id="czRouteResults"></div>
    <div id="czAIResults" style="display:none"></div>
  </div>
</section>

<!-- ══ NETWORK STATS ══ -->
<section class="cz-network-section">
  <div data-reveal>
    <div class="cz-section-eyebrow">NETWORK STATUS</div>
    <div class="cz-section-h2">Cozanet is live across Africa</div>
  </div>
  <div class="cz-stats-grid">
    <div class="cz-stat-card" data-reveal data-delay="1">
      <div class="cz-stat-eyebrow">TOTAL VALUE ROUTED (TVL)</div>
      <div class="cz-stat-val">$4.1M</div>
      <div class="cz-stat-trend">+12.4% this week</div>
    </div>
    <div class="cz-stat-card" data-reveal data-delay="2">
      <div class="cz-stat-eyebrow">TRANSACTIONS TODAY</div>
      <div class="cz-stat-val">3,450</div>
      <div class="cz-stat-trend">+8.2% vs yesterday</div>
    </div>
    <div class="cz-stat-card" data-reveal data-delay="3">
      <div class="cz-stat-eyebrow">AVG. SETTLEMENT TIME</div>
      <div class="cz-stat-val">112s</div>
      <div class="cz-stat-trend">-15% faster</div>
    </div>
  </div>
</section>

<!-- ══ FEATURE CARDS ══ -->
<section class="cz-features-section">
  <div class="cz-features-inner">
    <div data-reveal>
      <div class="cz-section-eyebrow">SECURITY & TRUST</div>
      <div class="cz-section-h2">Built for the African market</div>
    </div>
    <div class="cz-features-grid">
      <div class="cz-feature-card" data-reveal data-delay="1">
        <span class="cz-feat-icon">🔒</span>
        <div class="cz-feat-title">Secure &amp; Trusted</div>
        <div class="cz-feat-desc">Your safety is our priority. Bank-level 256-bit encryption protects every transaction.</div>
      </div>
      <div class="cz-feature-card" data-reveal data-delay="2">
        <span class="cz-feat-icon">🏦</span>
        <div class="cz-feat-title">Bank-Level Security</div>
        <div class="cz-feat-desc">Enterprise-grade security infrastructure with multi-sig wallets and cold storage.</div>
      </div>
      <div class="cz-feature-card" data-reveal data-delay="3">
        <span class="cz-feat-icon">🔑</span>
        <div class="cz-feat-title">Non-Custodial</div>
        <div class="cz-feat-desc">You own your assets. We never hold your private keys or access your funds.</div>
      </div>
      <div class="cz-feature-card" data-reveal data-delay="4">
        <span class="cz-feat-icon">🎧</span>
        <div class="cz-feat-title">24/7 Support</div>
        <div class="cz-feat-desc">Here for you always. Our team is available round the clock across all time zones.</div>
      </div>
    </div>
  </div>
</section>

</div>
<?php get_footer(); ?>

<script>
// Make home results visible after route find
document.addEventListener('DOMContentLoaded', function(){
  var findBtns = document.querySelectorAll('.cz-find-btn');
  findBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var sec = document.getElementById('czHomeResults');
      if(sec) sec.style.display = 'block';
    });
  });
});
</script>
