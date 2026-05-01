<?php
/**
 * Template Name: Company
 */
get_header(); ?>
<div class="cz-page">

<section class="cz-page-hero">
  <div class="cz-page-hero-inner">
    <div class="cz-section-eyebrow" data-reveal>COMPANY</div>
    <h1 class="cz-page-h1" data-reveal data-delay="1">Built by Africans, for Africa</h1>
    <p class="cz-page-sub" data-reveal data-delay="2">We're on a mission to make cross-border payments simple, cheap, and accessible for every African.</p>
  </div>
</section>

<!-- MISSION -->
<section class="cz-company-section">
  <div class="cz-company-inner">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center" data-reveal>
      <div>
        <div class="cz-section-eyebrow">OUR MISSION</div>
        <h2 class="cz-section-h2">Fixing Africa's broken payments</h2>
        <p style="color:#C5C6C7;font-size:16px;line-height:1.75;margin-top:20px">Every year, Africans lose billions of dollars in remittance fees. Banks charge 5-12%. Time zones make it impossible. Traditional corridors are unreliable.</p>
        <p style="color:#C5C6C7;font-size:16px;line-height:1.75;margin-top:12px">Cozanet changes that. By aggregating the best providers and using AI to route every transaction, we make sending money home as easy as sending a text.</p>
        <a href="<?php echo esc_url(home_url('/dashboard')); ?>" class="cz-btn-gold" style="margin-top:28px">Try Cozanet Free →</a>
      </div>
      <div style="background:var(--surface);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:40px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
          <?php
          $metrics = [['$4.1M','Total Routed'],['3,450','Daily Tx'],['20+','Countries'],['112s','Avg Speed']];
          foreach($metrics as $m): ?>
            <div style="text-align:center">
              <div style="font-family:'Inter Tight',sans-serif;font-size:36px;font-weight:700;color:#CCFF00"><?php echo $m[0]; ?></div>
              <div style="font-size:12px;color:#C5C6C7;margin-top:4px"><?php echo $m[1]; ?></div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TEAM -->
<section class="cz-company-section" style="padding-top:0;background:var(--surface)">
  <div class="cz-company-inner">
    <div class="cz-section-eyebrow" data-reveal>TEAM</div>
    <div class="cz-section-h2" data-reveal>The people behind Cozanet</div>
    <div class="cz-team-grid">
      <?php
      $team = [
        ['🧑🏾','Founder & CEO','Visionary behind Cozanet\'s mission to democratise African payments.'],
        ['👩🏾','CTO','Leads all technical architecture, AI systems, and engineering.'],
        ['🧑🏿','Head of Growth','Drives expansion across 20+ African markets.'],
        ['👩🏽','Head of Operations','Ensures every transaction is smooth and compliant.'],
        ['🧑🏾','Head of Partnerships','Builds relationships with providers across the continent.'],
        ['👨🏿','Lead Engineer','Builds the routing engine and keeps the lights on.'],
      ];
      foreach($team as $i => $m): ?>
        <div class="cz-team-card" data-reveal data-delay="<?php echo $i+1; ?>">
          <div class="cz-team-avatar"><?php echo $m[0]; ?></div>
          <div class="cz-team-name"><?php echo $m[1]; ?></div>
          <div class="cz-team-role"><?php echo esc_html($m[2]); ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="cz-company-section">
  <div class="cz-company-inner">
    <div class="cz-section-eyebrow" data-reveal>VALUES</div>
    <div class="cz-section-h2" data-reveal>What we stand for</div>
    <div class="cz-values-grid">
      <?php
      $values = [
        ['01','Transparency','No hidden fees. No surprises. We show you exactly what you pay and why.'],
        ['02','Speed','Time is money. We optimise every route for the fastest possible settlement.'],
        ['03','Security','Bank-level encryption, non-custodial wallets. Your assets, always yours.'],
        ['04','Accessibility','Available to anyone with a smartphone — from Lagos to Nairobi.'],
        ['05','Community','We grow with the African diaspora. Your feedback shapes our product.'],
        ['06','Innovation','AI-powered routing today. Cross-border rails for tomorrow.'],
      ];
      foreach($values as $i => $v): ?>
        <div class="cz-value-card" data-reveal data-delay="<?php echo $i+1; ?>">
          <div class="cz-value-num"><?php echo $v[0]; ?></div>
          <h3 class="cz-value-h3"><?php echo esc_html($v[1]); ?></h3>
          <p class="cz-value-p"><?php echo esc_html($v[2]); ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

</div>
<?php get_footer(); ?>
