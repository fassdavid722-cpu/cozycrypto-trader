<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0B0C10">
<?php wp_head(); ?>
</head>
<body <?php body_class('cz-body'); ?>>
<?php wp_body_open(); ?>

<nav class="cz-nav" id="czNav">
  <div class="cz-nav-inner">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="cz-nav-logo">
      <div class="cz-logo-shield">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B0C10" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <span class="cz-nav-brand">Cozanet</span>
    </a>

    <div class="cz-nav-links" id="czNavLinks">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="<?php echo is_front_page() ? 'active' : ''; ?>">Home</a>
      <a href="<?php echo esc_url(home_url('/how-it-works')); ?>" class="<?php echo is_page('how-it-works') ? 'active' : ''; ?>">How it works</a>
      <a href="<?php echo esc_url(home_url('/how-it-works')); ?>">For you</a>
      <a href="<?php echo esc_url(home_url('/ecosystem')); ?>" class="<?php echo is_page('ecosystem') ? 'active' : ''; ?>">Ecosystem</a>
      <a href="<?php echo esc_url(home_url('/company')); ?>" class="<?php echo is_page('company') ? 'active' : ''; ?>">Company</a>
    </div>

    <div class="cz-nav-actions">
      <button class="cz-nav-moon" id="czThemeBtn" aria-label="Toggle theme">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="cz-nav-login">Log in</button>
      <a href="<?php echo esc_url(home_url('/dashboard')); ?>" class="cz-btn-gold">Get Started</a>
      <button class="cz-hamburger" id="czHamburger" aria-label="Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>

  <div class="cz-mobile-menu" id="czMobileMenu">
    <a href="<?php echo esc_url(home_url('/')); ?>">Home</a>
    <a href="<?php echo esc_url(home_url('/how-it-works')); ?>">How it works</a>
    <a href="<?php echo esc_url(home_url('/how-it-works')); ?>">For you</a>
    <a href="<?php echo esc_url(home_url('/ecosystem')); ?>">Ecosystem</a>
    <a href="<?php echo esc_url(home_url('/company')); ?>">Company</a>
    <div class="cz-mobile-actions">
      <button class="cz-nav-login">Log in</button>
      <a href="<?php echo esc_url(home_url('/dashboard')); ?>" class="cz-btn-gold" style="text-align:center">Get Started</a>
    </div>
  </div>
</nav>

<main id="czMain">
