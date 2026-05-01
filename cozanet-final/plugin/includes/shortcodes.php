<?php
defined('ABSPATH') || exit;

class CZP_Shortcodes {
    public static function init() {
        add_shortcode('cozanet_route_widget', [__CLASS__, 'route_widget']);
    }

    public static function route_widget($atts): string {
        $atts = shortcode_atts(['variant' => 'hero'], $atts);
        $is_dash = ($atts['variant'] === 'dashboard');
        ob_start();
        ?>
        <div data-route-form class="cz-route-widget<?php echo $is_dash ? ' dash' : ''; ?>">

          <?php if (!$is_dash): ?>
          <div class="cz-widget-title">Find the best way to fund your wallet</div>
          <?php endif; ?>

          <div class="cz-form-grid">

            <!-- You send -->
            <div class="cz-field">
              <label>YOU SEND</label>
              <div class="cz-input-box">
                <input type="text" class="cz-amount-in" data-field="amount" value="100,000" autocomplete="off" inputmode="numeric">
                <div class="cz-currency-btn">
                  <span>🇳🇬</span>
                  <strong>NGN</strong>
                  <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>

            <!-- You want -->
            <div class="cz-field">
              <label>YOU WANT</label>
              <div class="cz-select-row">
                <div class="cz-select-icon" style="background:#16a34a;font-size:11px">₮</div>
                <span class="cz-select-label" data-field="to_crypto">USDT</span>
                <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <!-- Network -->
            <div class="cz-field">
              <label>NETWORK</label>
              <div class="cz-select-row">
                <div class="cz-select-icon" style="background:#d97706">B</div>
                <span class="cz-select-label" data-field="network">BSC</span>
                <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <!-- Priority -->
            <div class="cz-field">
              <label>PRIORITY</label>
              <div class="cz-select-row">
                <span class="cz-select-label" data-field="priority">Cheapest</span>
                <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <!-- Wallet address (full width) -->
            <div class="cz-field cz-form-full">
              <label>WALLET ADDRESS</label>
              <div class="cz-addr-box">
                <input type="text" class="cz-addr-in" data-field="wallet" placeholder="0x8f3c...9Ab4" autocomplete="off">
                <span class="cz-addr-valid" style="display:none">✓ Valid address</span>
                <div class="cz-addr-btns">
                  <button type="button" class="cz-addr-btn" title="Copy"
                    onclick="var i=this.closest('[data-route-form]').querySelector('.cz-addr-in');if(i.value)navigator.clipboard.writeText(i.value)">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                  <button type="button" class="cz-addr-btn" data-paste title="Paste">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
                  </button>
                </div>
              </div>
            </div>

          </div><!-- /grid -->

          <!-- CTA button -->
          <button type="button" class="cz-find-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Find Best Route →
          </button>

          <!-- Trust micro-text (hero only) -->
          <?php if (!$is_dash): ?>
          <div class="cz-widget-trust">
            <span class="cz-widget-trust-item">Best price guarantee</span>
            <span class="cz-widget-trust-item">Real-time comparison</span>
            <span class="cz-widget-trust-item">No hidden fees</span>
          </div>
          <?php endif; ?>

        </div>
        <?php
        return ob_get_clean();
    }
}
