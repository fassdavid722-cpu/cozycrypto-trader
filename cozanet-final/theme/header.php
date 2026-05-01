<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#0B0C10">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<?php wp_head(); ?>
</head>
<body <?php body_class('cz-body'); ?>>
<?php wp_body_open(); ?>

<!-- ══ NAV ══ -->
<nav class="cz-nav" id="czNav">
  <div class="cz-nav-inner">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="cz-nav-logo">
      <div class="cz-logo-icon">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0B0C10" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <span class="cz-nav-brand">Cozanet</span>
    </a>

    <div class="cz-nav-links">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="<?php echo is_front_page()?'active':''; ?>">Home</a>
      <a href="<?php echo esc_url(home_url('/how-it-works')); ?>" class="<?php echo is_page('how-it-works')?'active':''; ?>">How it works</a>
      <a href="<?php echo esc_url(home_url('/how-it-works')); ?>">For you</a>
      <a href="<?php echo esc_url(home_url('/ecosystem')); ?>" class="<?php echo is_page('ecosystem')?'active':''; ?>">Ecosystem</a>
      <a href="<?php echo esc_url(home_url('/company')); ?>" class="<?php echo is_page('company')?'active':''; ?>">Company</a>
    </div>

    <div class="cz-nav-actions">
      <button class="cz-nav-moon" id="czThemeBtn" aria-label="Toggle theme">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="cz-nav-login">Log in</button>
      <a href="<?php echo esc_url(home_url('/dashboard')); ?>" class="cz-btn-gold">Get Started</a>
      <button class="cz-hamburger" id="czHamburger" aria-label="Open menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>
  </div>
</nav>

<!-- ══ MOBILE MENU — full screen overlay (matches screenshot exactly) ══ -->
<div class="cz-mobile-menu" id="czMobileMenu" role="dialog" aria-label="Navigation">
  <div class="cz-mobile-menu-top">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="cz-nav-logo">
      <div class="cz-logo-icon"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0B0C10" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
      <span class="cz-nav-brand">Cozanet</span>
    </a>
    <button id="czMobileClose" aria-label="Close menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <a href="<?php echo esc_url(home_url('/')); ?>">HOME</a>
  <a href="<?php echo esc_url(home_url('/how-it-works')); ?>">HOW IT WORKS</a>
  <a href="<?php echo esc_url(home_url('/how-it-works')); ?>">FOR YOU</a>
  <a href="<?php echo esc_url(home_url('/ecosystem')); ?>">ECOSYSTEM</a>
  <a href="<?php echo esc_url(home_url('/company')); ?>">COMPANY</a>
  <div class="cz-mobile-menu-actions">
    <button class="cz-nav-login" style="font-size:14px;color:#fff;padding:8px 0">Log in</button>
    <a href="<?php echo esc_url(home_url('/dashboard')); ?>" class="cz-btn-gold" style="width:100%;text-align:center;padding:14px">Get Started</a>
  </div>
</div>

<main id="czMain">
