/**
 * Disable All Animations and Enable Smooth Scrolling
 * This script disables GSAP animations and ensures smooth scrolling behavior
 */

(function() {
  'use strict';

  // Enable smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  document.body.style.scrollBehavior = 'smooth';

  // Disable GSAP if it exists
  if (typeof gsap !== 'undefined') {
    // Disable all GSAP animations
    gsap.globalTimeline.pause();
    
    // Override gsap.to() to do nothing
    const originalTo = gsap.to;
    gsap.to = function() {
      return gsap.delayedCall(0, function() {});
    };
    
    // Override gsap.from() to do nothing
    const originalFrom = gsap.from;
    gsap.from = function() {
      return gsap.delayedCall(0, function() {});
    };
    
    // Override gsap.fromTo() to do nothing
    const originalFromTo = gsap.fromTo;
    gsap.fromTo = function() {
      return gsap.delayedCall(0, function() {});
    };
    
    // Disable ScrollTrigger if it exists
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.disable();
    }
  }

  // Remove all CSS animations
  const style = document.createElement('style');
  style.textContent = `
    * {
      animation: none !important;
      transition: none !important;
    }
    
    @keyframes caret-blink {
      0%, 70%, to { opacity: 1; }
      20%, 50% { opacity: 1; }
    }
    
    @keyframes pulse {
      50% { opacity: 1; }
    }
    
    @keyframes spin {
      to { transform: rotate(0deg); }
    }
    
    @keyframes enter {
      0% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotate(0);
      }
    }
    
    @keyframes exit {
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale3d(1, 1, 1) rotate(0);
      }
    }
    
    @keyframes accordion-up {
      0% { height: auto; }
      to { height: 0; }
    }
    
    @keyframes accordion-down {
      0% { height: 0; }
      to { height: auto; }
    }
    
    .animate-caret-blink,
    .animate-pulse,
    .animate-spin {
      animation: none !important;
    }
    
    button,
    a,
    input,
    select,
    textarea,
    [role="button"] {
      transition: none !important;
    }
    
    *:hover {
      transition: none !important;
    }
    
    *:focus,
    *:focus-visible {
      transition: none !important;
    }
    
    [data-gsap-animation],
    [data-animation] {
      animation: none !important;
    }
    
    .scroll-animate,
    [data-scroll-animate] {
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
    
    html {
      scroll-behavior: smooth !important;
    }
    
    body {
      scroll-behavior: smooth !important;
    }
  `;
  document.head.appendChild(style);

  // Smooth scroll polyfill for older browsers
  window.addEventListener('wheel', function(e) {
    if (document.documentElement.style.scrollBehavior === 'smooth') {
      // Browser supports smooth scrolling natively
      return;
    }
    
    // Fallback for older browsers
    const delta = e.deltaY || e.detail || e.wheelDelta;
    if (delta) {
      e.preventDefault();
      const currentScroll = window.scrollY;
      const targetScroll = currentScroll + delta;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, { passive: false });

  // Ensure smooth scrolling on anchor links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Disable all transitions on page load
  window.addEventListener('load', function() {
    document.querySelectorAll('*').forEach(el => {
      el.style.animation = 'none !important';
      el.style.transition = 'none !important';
    });
  });

})();
