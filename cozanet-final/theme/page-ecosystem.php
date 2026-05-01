<?php
/**
 * Template Name: Ecosystem
 */
get_header(); ?>
<canvas id="czNeonCanvas"></canvas>
<div class="cz-page" style="position:relative;z-index:1">

<section class="cz-page-hero">
  <div class="cz-page-hero-inner">
    <div class="cz-section-eyebrow" data-reveal>ECOSYSTEM</div>
    <h1 class="cz-page-h1" data-reveal data-delay="1">A network built for Africa</h1>
    <p class="cz-page-sub" data-reveal data-delay="2">Connected corridors, local providers, and global liquidity — all woven into one intelligent network.</p>
  </div>
</section>

<!-- ANIMATED NETWORK MAP -->
<section class="cz-eco-map-section">
  <!-- Status badges -->
  <div class="cz-network-badge liquid-glass">
    <span class="live-dot"></span>
    <span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#C5C6C7">Network Status: ACTIVE</span>
    <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(197,198,199,0.5);display:block;margin-top:3px">BSC GAS: 3 Gwei</span>
  </div>

  <div class="cz-eco-stat-float liquid-glass" style="top:33%;left:32px">
    <div class="eco-stat-eyebrow">Total Value Routed</div>
    <div class="eco-stat-val">$4.1M</div>
  </div>

  <div class="cz-eco-stat-float liquid-glass" style="top:33%;right:32px">
    <div class="eco-stat-eyebrow">Active Corridors</div>
    <div class="eco-stat-val">24</div>
  </div>

  <div class="cz-eco-stat-float liquid-glass" style="bottom:32px;left:50%;transform:translateX(-50%)">
    <div class="eco-stat-eyebrow" style="text-align:center">Avg. Settlement</div>
    <div class="eco-stat-val" style="text-align:center">112s</div>
  </div>

  <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;position:absolute;inset:0">
    <defs>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFC300" stop-opacity="0.1"/>
        <stop offset="50%" stop-color="#FFC300" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#CCFF00" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <!-- Connection lines -->
    <line x1="200" y1="350" x2="500" y2="300" stroke="url(#lineGrad)" stroke-width="1.5" stroke-dasharray="6 4"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2s" repeatCount="indefinite"/></line>
    <line x1="500" y1="300" x2="800" y2="250" stroke="url(#lineGrad)" stroke-width="1.5" stroke-dasharray="6 4"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.5s" repeatCount="indefinite"/></line>
    <line x1="500" y1="300" x2="700" y2="400" stroke="url(#lineGrad)" stroke-width="1.5" stroke-dasharray="6 4"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite"/></line>
    <line x1="200" y1="350" x2="350" y2="450" stroke="url(#lineGrad)" stroke-width="1.5" stroke-dasharray="6 4"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.2s" repeatCount="indefinite"/></line>
    <line x1="800" y1="250" x2="1000" y2="200" stroke="url(#lineGrad)" stroke-width="1.5" stroke-dasharray="6 4"><animate attributeName="stroke-dashoffset" from="0" to="-20" dur="2.8s" repeatCount="indefinite"/></line>
    <!-- City nodes -->
    <g>
      <circle cx="200" cy="350" r="12" fill="none" stroke="#FFC300" stroke-width="1" opacity="0.5"><animate attributeName="r" from="8" to="24" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="200" cy="350" r="5" fill="#FFC300"/>
      <text x="200" y="368" text-anchor="middle" fill="#C5C6C7" font-size="12" font-family="JetBrains Mono">Lagos</text>
    </g>
    <g><circle cx="500" cy="300" r="5" fill="#FFC300"/><text x="500" y="318" text-anchor="middle" fill="#C5C6C7" font-size="12" font-family="JetBrains Mono">Accra</text></g>
    <g><circle cx="350" cy="450" r="5" fill="#FFC300"/><text x="350" y="468" text-anchor="middle" fill="#C5C6C7" font-size="12" font-family="JetBrains Mono">Abidjan</text></g>
    <g><circle cx="700" cy="400" r="5" fill="#CCFF00"/><text x="700" y="418" text-anchor="middle" fill="#C5C6C7" font-size="12" font-family="JetBrains Mono">Nairobi</text></g>
    <g><circle cx="800" cy="250" r="5" fill="#FFC300"/><text x="800" y="268" text-anchor="middle" fill="#C5C6C7" font-size="12" font-family="JetBrains Mono">London</text></g>
    <g><circle cx="1000" cy="200" r="5" fill="#CCFF00"/><text x="1000" y="218" text-anchor="middle" fill="#C5C6C7" font-size="12" font-family="JetBrains Mono">Dubai</text></g>
  </svg>
</section>

<!-- PROVIDERS GRID -->
<section class="cz-providers-section">
  <div class="cz-providers-inner">
    <div class="cz-section-eyebrow" data-reveal>PROVIDERS</div>
    <div class="cz-section-h2" data-reveal>20+ providers, one smart router</div>
    <div class="cz-providers-grid">
      <?php
      $providers = ['Quidax'=>'Exchange','Binance P2P'=>'P2P','Yellow Card'=>'Exchange','Paxful'=>'P2P','Luno'=>'Exchange','Busha'=>'Exchange','Chipper Cash'=>'Fintech','Eversend'=>'Fintech','Bitnob'=>'Exchange','Payday'=>'Fintech','Fluidcoins'=>'Payments','BuyCoins'=>'Exchange','Trove'=>'Investment','Pillow'=>'Savings','Mazzuma'=>'Payments','Changera'=>'Fintech'];
      foreach($providers as $name => $type): ?>
        <div class="cz-provider-card" data-reveal>
          <div class="cz-provider-icon"><?php echo mb_substr($name, 0, 1); ?></div>
          <div class="cz-provider-name"><?php echo esc_html($name); ?></div>
          <div class="cz-provider-type"><?php echo esc_html($type); ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- COUNTRIES -->
<section style="padding:0 24px 80px;background:#0B0C10">
  <div style="max-width:1200px;margin:0 auto">
    <div class="cz-section-h2" data-reveal>Coverage Map</div>
    <div class="cz-countries-grid" style="margin-top:32px">
      <?php
      $countries = [
        ['🇳🇬','Nigeria','NGN'],['🇬🇭','Ghana','GHS'],['🇰🇪','Kenya','KES'],['🇿🇦','South Africa','ZAR'],
        ['🇨🇲','Cameroon','XAF'],['🇺🇬','Uganda','UGX'],['🇹🇿','Tanzania','TZS'],['🇷🇼','Rwanda','RWF'],
        ['🇿🇲','Zambia','ZMW'],['🇨🇮','Ivory Coast','XOF'],['🇸🇳','Senegal','XOF'],['🇪🇹','Ethiopia','ETB'],
        ['🇪🇬','Egypt','EGP'],['🇲🇦','Morocco','MAD'],['🇹🇳','Tunisia','TND'],
      ];
      foreach($countries as $c): ?>
        <div class="cz-country-card" data-reveal>
          <span class="cz-country-flag"><?php echo $c[0]; ?></span>
          <div>
            <span class="cz-country-name"><?php echo esc_html($c[1]); ?></span>
            <span class="cz-country-code"><?php echo esc_html($c[2]); ?></span>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

</div>
<?php get_footer(); ?>
