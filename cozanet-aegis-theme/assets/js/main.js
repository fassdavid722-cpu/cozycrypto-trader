/* Cozanet Aegis — Main JS v3.0.0 */
(function() {
  'use strict';

  /* ── View Switching ── */
  window.czShowApp = function() {
    document.getElementById('cz-landing').style.display = 'none';
    document.getElementById('cz-app').style.display = 'block';
    window.scrollTo(0, 0);
  };
  window.czShowLanding = function() {
    document.getElementById('cz-app').style.display = 'none';
    document.getElementById('cz-landing').style.display = 'block';
    window.scrollTo(0, 0);
  };

  /* ── Mobile Menu ── */
  window.czToggleMobile = function() {
    var m = document.getElementById('czMobileMenu');
    if (m) m.classList.toggle('open');
  };

  /* ── Nav scroll effect ── */
  var nav = document.getElementById('cz-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) nav.classList.add('cz-scrolled');
      else nav.classList.remove('cz-scrolled');
    });
  }

  /* ── Find Route animation ── */
  window.czFindRoute = function() {
    var btn = document.getElementById('czFindBtn');
    if (!btn) return;
    var orig = btn.innerHTML;
    btn.innerHTML = '⌛ Scanning 20+ providers...';
    btn.style.opacity = '0.75';
    setTimeout(function() {
      btn.innerHTML = '✓ Best route found!';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      setTimeout(function() {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.style.opacity = '';
      }, 2200);
    }, 1600);
  };

  /* ── Sidebar active state ── */
  document.querySelectorAll('.cz-sb-item[data-tab]').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.cz-sb-item').forEach(function(i) { i.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  /* ── Number formatter for amount input ── */
  document.querySelectorAll('.cz-amount-input').forEach(function(input) {
    input.addEventListener('blur', function() {
      var val = parseFloat(this.value.replace(/,/g, ''));
      if (!isNaN(val)) this.value = val.toLocaleString('en-NG');
    });
    input.addEventListener('focus', function() {
      this.value = this.value.replace(/,/g, '');
    });
  });

  /* ── Route hover highlight ── */
  document.querySelectorAll('.cz-route-other').forEach(function(row) {
    row.style.cursor = 'pointer';
  });

  console.log('Cozanet Aegis v3.0.0 loaded');
})();
