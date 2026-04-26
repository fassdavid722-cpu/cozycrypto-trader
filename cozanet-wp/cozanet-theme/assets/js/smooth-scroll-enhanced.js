/**
 * Enhanced Smooth Scrolling and Spacing Optimization
 * Ensures tight, continuous scrolling without blank gaps
 */

(function() {
  'use strict';

  // Enable smooth scrolling globally
  document.documentElement.style.scrollBehavior = 'smooth';
  document.body.style.scrollBehavior = 'smooth';

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeLayout);
  } else {
    optimizeLayout();
  }

  function optimizeLayout() {
    // Remove excessive spacing from all sections
    const sections = document.querySelectorAll('section, [class*="section"], .container, main, [role="main"]');
    
    sections.forEach(section => {
      // Remove large padding/margin that creates gaps
      const styles = window.getComputedStyle(section);
      const paddingTop = parseFloat(styles.paddingTop);
      const paddingBottom = parseFloat(styles.paddingBottom);
      const marginTop = parseFloat(styles.marginTop);
      const marginBottom = parseFloat(styles.marginBottom);
      
      // If padding or margin is excessive (> 100px), reduce it
      if (paddingTop > 100) {
        section.style.paddingTop = '2rem';
      }
      if (paddingBottom > 100) {
        section.style.paddingBottom = '2rem';
      }
      if (marginTop > 50) {
        section.style.marginTop = '0';
      }
      if (marginBottom > 50) {
        section.style.marginBottom = '0';
      }
    });

    // Optimize hero sections specifically
    const heroSections = document.querySelectorAll('.hero, [class*="hero"], [class*="Hero"], .banner, header');
    heroSections.forEach(hero => {
      const height = hero.offsetHeight;
      // Cap hero sections at 70vh to avoid excessive blank space
      if (height > window.innerHeight * 0.8) {
        hero.style.maxHeight = '70vh';
        hero.style.minHeight = '50vh';
      }
    });

    // Reduce spacing in nested divs
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
      const styles = window.getComputedStyle(div);
      const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
      const padding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      
      // Reduce excessive margins
      if (parseFloat(styles.marginTop) > 50) {
        div.style.marginTop = '0';
      }
      if (parseFloat(styles.marginBottom) > 50) {
        div.style.marginBottom = '0';
      }
    });

    // Ensure smooth scroll without jumps
    document.documentElement.scrollPaddingTop = '0px';
  }

  // Smooth scroll for anchor links
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link && link.getAttribute('href') !== '#') {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });

  // Disable GSAP animations if present
  if (typeof gsap !== 'undefined') {
    gsap.globalTimeline.pause();
    
    // Override animation methods
    gsap.to = function() {
      return gsap.delayedCall(0, function() {});
    };
    gsap.from = function() {
      return gsap.delayedCall(0, function() {});
    };
    gsap.fromTo = function() {
      return gsap.delayedCall(0, function() {});
    };
    
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.disable();
    }
  }

  // Optimize on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(optimizeLayout, 250);
  });

  // Re-optimize after page fully loads
  window.addEventListener('load', function() {
    setTimeout(optimizeLayout, 500);
  });

})();
