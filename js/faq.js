/**
 * faq.js — Interactive Accordion FAQ Section
 * Smooth open/close transitions and accessibility support.
 */
(function () {
  'use strict';

  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const header = item.querySelector('.faq-item__header');
      const content = item.querySelector('.faq-item__content');

      if (!header || !content) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other FAQ items for a clean single-open accordion feel
        faqItems.forEach((other) => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const otherHeader = other.querySelector('.faq-item__header');
            const otherContent = other.querySelector('.faq-item__content');
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });

      // Keyboard accessibility
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });

    // Recalculate max-height on window resize if open
    window.addEventListener('resize', () => {
      faqItems.forEach((item) => {
        if (item.classList.contains('active')) {
          const content = item.querySelector('.faq-item__content');
          if (content) content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
  } else {
    initFAQ();
  }
})();
