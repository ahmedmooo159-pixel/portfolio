/**
 * animations.js — Scroll reveal + nav active state
 * Uses IntersectionObserver for performance.
 * Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── SCROLL REVEAL ─────────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');

  if (prefersReducedMotion) {
    // Instantly show everything — never block content
    revealEls.forEach(el => el.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // Skill Bar Expansion Observer
    const skillBars = document.querySelectorAll('.skill-bar-item__fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const pct = target.getAttribute('data-width') || '85';
          target.style.width = pct + '%';
          skillObserver.unobserve(target);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => {
      bar.style.width = '0%';
      skillObserver.observe(bar);
    });
  }

  /* ── NAV ACTIVE SECTION HIGHLIGHT ─────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav__link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ── NAV SCROLL STATE ──────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── HERO ROLE TYPEWRITER ──────────────────────────────────────────────── */
  const roleEl = document.getElementById('heroRoleText');
  if (roleEl && !prefersReducedMotion) {
    const roles = [
      'Freelance Web Developer',
      'Vanilla Web Craftsman (HTML/CSS/JS)',
      'Backend & APIs (Firebase / Node.js)',
      'Software Engineering Student',
    ];
    let rIdx = 0, cIdx = 0, deleting = false;

    function typeRole() {
      const current = roles[rIdx];
      if (!deleting) {
        roleEl.textContent = current.slice(0, cIdx + 1);
        cIdx++;
        if (cIdx === current.length) {
          deleting = true;
          setTimeout(typeRole, 2200);
          return;
        }
      } else {
        roleEl.textContent = current.slice(0, cIdx - 1);
        cIdx--;
        if (cIdx === 0) {
          deleting = false;
          rIdx = (rIdx + 1) % roles.length;
          setTimeout(typeRole, 400);
          return;
        }
      }
      setTimeout(typeRole, deleting ? 38 : 80);
    }

    // Start after portfolio is ready (loader finished)
    document.addEventListener('portfolioReady', () => setTimeout(typeRole, 600), { once: true });
    // Fallback if loader already gone
    setTimeout(typeRole, 2800);
  }
})();
