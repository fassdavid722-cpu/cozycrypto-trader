/**
 * Hide Ethereum and Polygon Chains
 * Show only BNB Chain in the Interoperability section
 */

(function() {
  'use strict';

  function hideChains() {
    // Find all elements that contain chain badges
    const chainBadges = document.querySelectorAll('[class*="rounded-full"][class*="border"][class*="FFD700"]');
    
    chainBadges.forEach(badge => {
      const text = badge.textContent.trim();
      
      // Hide Ethereum and Polygon badges
      if (text.includes('Ethereum') || text.includes('Polygon')) {
        badge.style.display = 'none';
      }
    });

    // Alternative method: search by text content in the entire page
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const text = el.textContent;
      
      // Look for chain name badges specifically
      if (el.className && el.className.includes('px-4') && el.className.includes('py-2')) {
        if ((text.includes('Ethereum') || text.includes('Polygon')) && !text.includes('BNB')) {
          el.style.display = 'none';
        }
      }
    });

    // Hide chain badges by searching for specific patterns
    const supportedSection = document.querySelector('[class*="Supported"]');
    if (supportedSection) {
      const badges = supportedSection.querySelectorAll('div[class*="rounded-full"]');
      badges.forEach(badge => {
        if (badge.textContent.includes('Ethereum') || badge.textContent.includes('Polygon')) {
          badge.style.display = 'none';
        }
      });
    }

    // Search in all divs for chain names and hide them
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
      // Check if this is a chain badge (has specific styling)
      const styles = window.getComputedStyle(div);
      const hasChainStyling = div.className.includes('rounded-full') || 
                              div.className.includes('border') || 
                              div.className.includes('px-4');
      
      if (hasChainStyling && (div.textContent.includes('Ethereum') || div.textContent.includes('Polygon'))) {
        // Only hide if it's a small badge, not a larger section
        if (div.offsetWidth < 300 && div.offsetHeight < 100) {
          div.style.display = 'none';
        }
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideChains);
  } else {
    hideChains();
  }

  // Also run after a short delay to catch dynamically rendered content
  setTimeout(hideChains, 500);
  setTimeout(hideChains, 1000);
  setTimeout(hideChains, 2000);

  // Watch for mutations and hide chains if they appear
  const observer = new MutationObserver(function(mutations) {
    hideChains();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: false
  });

})();
