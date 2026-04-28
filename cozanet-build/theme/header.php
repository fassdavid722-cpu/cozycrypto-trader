<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#070708">
  <?php wp_head(); ?>
</head>
<body <?php body_class('cz-body'); ?>>
<?php wp_body_open(); ?>

<!-- ═══════════════════════════════════
     TOPBAR / NAVIGATION
═══════════════════════════════════ -->
<header class="cz-header" id="cz-header">
  <nav class="cz-nav" role="navigation" aria-label="Main Navigation">
    <div class="cz-nav-inner">

      <!-- Logo -->
      <a href="<?php echo esc_url(home_url('/')); ?>" class="cz-logo" aria-label="Cozanet Home">
        <?php if (has_custom_logo()): ?>
          <?php the_custom_logo(); ?>
        <?php else: ?>
          <div class="cz-logo-icon">🛡</div>
          <div class="cz-logo-text">
            <span class="cz-logo-name">Cozanet</span>
            <span class="cz-logo-tag">AEGIS</span>
          </div>
        <?php endif; ?>
      </a>

      <!-- Desktop Nav Links -->
      <div class="cz-nav-links" id="czNavLinks">
        <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
        <a href="#how-it-works">How it works</a>
        <a href="#for-you">For you ▾</a>
        <a href="#ecosystem">Ecosystem</a>
        <a href="#company">Company ▾</a>
      </div>

      <!-- Nav Actions -->
      <div class="cz-nav-actions">
        <button class="cz-btn-icon" id="czThemeToggle" aria-label="Toggle theme" title="Dark/Light mode">🌙</button>
        <a href="#aegis-app" class="cz-btn-outline" id="czLoginBtn">Log in</a>
        <a href="#aegis-app" class="cz-btn-primary" id="czGetStarted">Get Started</a>
        <button class="cz-hamburger" id="czHamburger" aria-label="Menu" aria-expanded="false">☰</button>
      </div>

    </div>

    <!-- Mobile Menu -->
    <div class="cz-mobile-menu" id="czMobileMenu" aria-hidden="true">
      <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
      <a href="#how-it-works">How it works</a>
      <a href="#for-you">For you</a>
      <a href="#ecosystem">Ecosystem</a>
      <a href="#company">Company</a>
      <a href="#aegis-app" class="cz-btn-primary" style="margin-top:8px;text-align:center;">Get Started</a>
    </div>
  </nav>
</header>

<main id="cz-main" role="main">
