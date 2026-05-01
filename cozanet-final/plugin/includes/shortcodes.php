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
        <div data-route-form>
          <div class="cz-form-grid">
            <!-- You send -->
            <div class="cz-field">
              <label>You send</label>
              <div class="cz-input-box">
                <input type="text" class="cz-amount-in" data-field="amount" value="100,000" autocomplete="off">
                <div class="cz-currency-btn">
                  <span>🇳🇬</span>
                  <strong>NGN</strong>
                  <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>

            <!-- You want -->
            <div class="cz-field">
              <label>You want</label>
              <div class="cz-select-row">
                <div class="cz-select-icon" style="background:#16a34a">₮</div>
                <span class="cz-select-label" data-field="to_crypto">USDT</span>
                <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <!-- Network -->
            <div class="cz-field">
              <label>Network</label>
              <div class="cz-select-row">
                <div class="cz-select-icon" style="background:#d97706">B</div>
                <span class="cz-select-label" data-field="network">BSC</span>
                <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <!-- Priority -->
            <div class="cz-field">
              <label>Priority</label>
              <div class="cz-select-row">
                <span class="cz-select-label" data-field="priority">Cheapest</span>
                <svg class="cz-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            <!-- Wallet address -->
            <div class="cz-field cz-form-full">
              <label>Wallet address</label>
              <div class="cz-addr-box">
                <input type="text" class="cz-addr-in" data-field="wallet" placeholder="0x8f3c...9Ab4" autocomplete="off">
                <div class="cz-addr-btns">
                  <button class="cz-addr-btn" title="Copy" onclick="navigator.clipboard.writeText(this.closest('[data-route-form]').querySelector('[data-field=wallet]').value)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                  <button class="cz-addr-btn" title="Paste" onclick="navigator.clipboard.readText().then(function(t){var inp=this.closest('[data-route-form]').querySelector('[data-field=wallet]');inp.value=t}.bind(this)).catch(function(){})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="8.56 2.9 4.25 7.22 4.25 20.75 19.75 20.75 19.75 7.22 15.44 2.9"/><rect x="8.56" y="1" width="6.88" height="3.8" rx="1"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button class="cz-find-btn" style="margin-top:12px">
            Find Best Route
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
        <?php
        return ob_get_clean();
    }
}
