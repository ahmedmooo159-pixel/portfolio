/**
 * projects.js — Project card hover enhancements
 * Subtle image parallax on featured project visual.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  /* ── FEATURED PROJECT VISUAL TILT ─────────────────────────────────────── */
  const featured = document.querySelector('.project-featured');
  const mockup   = featured ? featured.querySelector('.project-featured__mockup') : null;

  if (featured && mockup) {
    featured.addEventListener('mousemove', e => {
      const rect = featured.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      mockup.style.transform = `
        perspective(600px)
        rotateY(${dx * 4}deg)
        rotateX(${-dy * 2}deg)
        translateZ(8px)
      `;
    });

    featured.addEventListener('mouseleave', () => {
      mockup.style.transform = '';
      mockup.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => { mockup.style.transition = ''; }, 600);
    });
  }

  /* ── PROJECT CARD SUBTLE HOVER ─────────────────────────────────────────── */
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const visual = card.querySelector('.project-card__visual');
    if (!visual) return;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width  - 0.5;
      const dy = (e.clientY - rect.top)  / rect.height - 0.5;
      visual.style.transform = `scale(1.04) translate(${dx * 6}px, ${dy * 4}px)`;
    });

    card.addEventListener('mouseleave', () => {
      visual.style.transform = '';
    });
  });
})();
