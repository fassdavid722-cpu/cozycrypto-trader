<?php
/**
 * Template Name: How It Works
 */
get_header(); ?>
<div class="cz-page">

<section class="cz-page-hero">
  <div class="cz-page-hero-inner">
    <div class="cz-section-eyebrow" data-reveal>HOW IT WORKS</div>
    <h1 class="cz-page-h1" data-reveal data-delay="1">Smart routing for every transfer</h1>
    <p class="cz-page-sub" data-reveal data-delay="2">Our Aegis engine scans 20+ providers across Africa to find you the fastest, cheapest, and safest route every single time.</p>
  </div>
</section>

<!-- TIMELINE STEPS -->
<section class="cz-steps-section">
  <div class="cz-steps-inner">
    <div class="cz-timeline-line"></div>

    <div class="cz-step-item" data-reveal>
      <div class="cz-step-content">
        <div class="cz-step-big-num">01</div>
        <h3 class="cz-step-h3">Enter Your Details</h3>
        <p class="cz-step-p">Tell us how much you want to send, which currency, and your destination wallet. Our system supports 15+ African currencies and all major crypto networks.</p>
      </div>
      <div class="cz-step-dot"></div>
      <div class="cz-step-spacer"></div>
    </div>

    <div class="cz-step-item right" data-reveal>
      <div class="cz-step-content right">
        <div class="cz-step-big-num" style="left:auto;right:-8px">02</div>
        <h3 class="cz-step-h3">Aegis Scans the Market</h3>
        <p class="cz-step-p">In under 2 seconds, our AI engine queries 20+ liquidity providers, P2P markets, and institutional corridors across Africa. We analyze fees, speed, reliability, and risk in real-time.</p>
      </div>
      <div class="cz-step-dot"></div>
      <div class="cz-step-spacer"></div>
    </div>

    <div class="cz-step-item" data-reveal>
      <div class="cz-step-content">
        <div class="cz-step-big-num">03</div>
        <h3 class="cz-step-h3">Get Your Best Route</h3>
        <p class="cz-step-p">See a clear comparison of all available options. Our AI Insight explains why the recommended route is best for your specific transfer, including exactly how much you'll save.</p>
      </div>
      <div class="cz-step-dot"></div>
      <div class="cz-step-spacer"></div>
    </div>

    <div class="cz-step-item right" data-reveal>
      <div class="cz-step-content right">
        <div class="cz-step-big-num" style="left:auto;right:-8px">04</div>
        <h3 class="cz-step-h3">Complete Your Transfer</h3>
        <p class="cz-step-p">Follow our step-by-step guide to complete the transfer with your chosen provider. Track progress in real-time and receive confirmation when your funds arrive.</p>
      </div>
      <div class="cz-step-dot"></div>
      <div class="cz-step-spacer"></div>
    </div>
  </div>
</section>

<!-- FEATURE CARDS -->
<section class="cz-feat-section">
  <div class="cz-feat-inner">
    <div class="cz-section-eyebrow" data-reveal>FEATURES</div>
    <div class="cz-section-h2" data-reveal>Everything you need to move money</div>
    <div class="cz-feat-grid">
      <?php
      $features = [
        ['icon'=>'🛣', 'title'=>'Smart Route Finder', 'desc'=>'AI-powered comparison across 20+ providers to find the optimal path for every transfer.'],
        ['icon'=>'📈', 'title'=>'Real-Time Rates', 'desc'=>'Live exchange rates updated every 30 seconds from multiple sources.'],
        ['icon'=>'👁', 'title'=>'Fee Transparency', 'desc'=>'See every fee upfront. No hidden charges, no surprises. Ever.'],
        ['icon'=>'🌍', 'title'=>'Multi-Currency Support', 'desc'=>'15+ African currencies and all major stablecoins including USDT, USDC, and BUSD.'],
        ['icon'=>'🔐', 'title'=>'Bank-Grade Security', 'desc'=>'256-bit encryption, non-custodial architecture, and multi-sig protection.'],
        ['icon'=>'🤖', 'title'=>'24/7 AI Support', 'desc'=>'Our Aegis AI agent is always online to answer questions and guide you.'],
      ];
      foreach($features as $i => $f): ?>
        <div class="cz-feat-card" data-reveal data-delay="<?php echo $i+1; ?>">
          <div style="font-size:40px;margin-bottom:20px"><?php echo $f['icon']; ?></div>
          <h3 class="cz-feat-title"><?php echo esc_html($f['title']); ?></h3>
          <p class="cz-feat-desc"><?php echo esc_html($f['desc']); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- COMPARISON TABLE -->
<section class="cz-compare-section">
  <div class="cz-compare-inner">
    <h2 class="cz-section-h2" style="text-align:center" data-reveal>How we compare</h2>
    <div class="cz-compare-table" data-reveal>
      <div class="cz-compare-head">
        <div class="cz-compare-head-cell">Feature</div>
        <div class="cz-compare-head-cell" style="color:#FFC300">Cozanet</div>
        <div class="cz-compare-head-cell">Traditional Banks</div>
        <div class="cz-compare-head-cell">Other P2P</div>
      </div>
      <?php
      $rows = [
        ['Transfer Speed','2–15 minutes','1-5 days','30min–2hrs',true,false,false],
        ['Fees','0.5% – 3.2%','5% – 12%','2% – 8%',true,true,false],
        ['Currency Support','15+ African','3-5 major','5-10',true,false,false],
        ['Hidden Fees','None','Common','Sometimes',true,true,false],
        ['AI Routing','Yes','No','No',true,true,true],
        ['24/7 Support','Yes','Limited','Varies',true,false,false],
      ];
      foreach($rows as $r): ?>
        <div class="cz-compare-row">
          <div class="cz-compare-cell label"><?php echo esc_html($r[0]); ?></div>
          <div class="cz-compare-cell good">
            <svg class="cz-check" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            <?php echo esc_html($r[1]); ?>
          </div>
          <div class="cz-compare-cell <?php echo $r[4] ? 'bad' : ''; ?>">
            <?php if($r[4]): ?><svg class="cz-x" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><?php endif; ?>
            <?php echo esc_html($r[2]); ?>
          </div>
          <div class="cz-compare-cell <?php echo $r[5] ? 'bad' : ''; ?>">
            <?php if($r[5]): ?><svg class="cz-x" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><?php endif; ?>
            <?php echo esc_html($r[3]); ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CTA -->
<section style="padding:80px 24px;background:var(--surface)">
  <div style="max-width:1000px;margin:0 auto">
    <div style="background:linear-gradient(135deg,rgba(255,195,0,0.1),rgba(204,255,0,0.05));border:1px solid rgba(255,195,0,0.2);border-radius:24px;padding:80px 48px;text-align:center" data-reveal>
      <h2 style="font-size:clamp(28px,4vw,48px);color:#fff;margin-bottom:16px">Ready to move your money smarter?</h2>
      <p style="font-size:16px;color:#C5C6C7;margin-bottom:32px">Join 5,000+ Africans using Cozanet to fund their wallets.</p>
      <a href="<?php echo esc_url(home_url('/dashboard')); ?>" class="cz-btn-gold" style="font-size:16px;padding:14px 36px">Get Started Free →</a>
    </div>
  </div>
</section>

</div>
<?php get_footer(); ?>
