/**
 * animations.js — Scroll reveal, bilingual typewriter, skill bar animations & nav highlighting
 * Uses IntersectionObserver for high performance.
 * Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── SCROLL REVEAL ─────────────────────────────────────────────────────── */
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');

    if (prefersReducedMotion) {
      revealEls.forEach(el => el.classList.add('visible'));
    } else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => revealObserver.observe(el));
    }
  }

  /* ── SKILL BARS EXPANSION ──────────────────────────────────────────────── */
  function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-item__fill');
    if (!skillBars.length) return;

    if (prefersReducedMotion) {
      skillBars.forEach(bar => {
        bar.style.width = (bar.getAttribute('data-width') || '80') + '%';
      });
      return;
    }

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const pct = target.getAttribute('data-width') || '80';
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
  function initNavHighlight() {
    const navLinks = document.querySelectorAll('.nav__link[data-section]');
    const sections = document.querySelectorAll('section[id]');

    if (!navLinks.length || !sections.length) return;

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-10% 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ── NAV SCROLL STATE ──────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── HERO ROLE TYPEWRITER (BILINGUAL) ──────────────────────────────────── */
  const roleEl = document.getElementById('heroRoleText');
  let typeTimer = null;

  const ROLES = {
    en: [
      'Freelance Web Developer',
      'Information Technology – Software Track',
      'Full Stack .NET (DEPI Scholar)',
      'Vanilla Web & Cloud Architect'
    ],
    ar: [
      'مطور ويب حر (Freelance)',
      'تكنولوجيا المعلومات – مسار البرمجيات',
      'مطور Full Stack .NET (منحة DEPI)',
      'بناء تطبيقات ويب نقية وسريعة'
    ]
  };

  function initTypewriter() {
    if (!roleEl || prefersReducedMotion) return;

    clearTimeout(typeTimer);

    let rIdx = 0, cIdx = 0, deleting = false;

    function getCurrentRoles() {
      const lang = document.documentElement.getAttribute('lang') || 'en';
      return ROLES[lang] || ROLES.en;
    }

    function typeRole() {
      const currentList = getCurrentRoles();
      if (rIdx >= currentList.length) rIdx = 0;
      const current = currentList[rIdx];

      if (!deleting) {
        roleEl.textContent = current.slice(0, cIdx + 1);
        cIdx++;
        if (cIdx === current.length) {
          deleting = true;
          typeTimer = setTimeout(typeRole, 2200);
          return;
        }
      } else {
        roleEl.textContent = current.slice(0, cIdx - 1);
        cIdx--;
        if (cIdx === 0) {
          deleting = false;
          rIdx = (rIdx + 1) % currentList.length;
          typeTimer = setTimeout(typeRole, 450);
          return;
        }
      }
      typeTimer = setTimeout(typeRole, deleting ? 35 : 75);
    }

    typeRole();
  }

  window.addEventListener('langchange', () => {
    if (roleEl && !prefersReducedMotion) {
      clearTimeout(typeTimer);
      roleEl.textContent = '';
      setTimeout(initTypewriter, 150);
    }
  });

  // Init all on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initReveal();
      initSkillBars();
      initNavHighlight();
      initTypewriter();
    });
  } else {
    initReveal();
    initSkillBars();
    initNavHighlight();
    initTypewriter();
  }
})();
