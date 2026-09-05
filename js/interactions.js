/**
 * interactions.js — Cursor, clipboard, toast, mobile nav
 */
(function () {
  'use strict';

  /* ── CUSTOM CURSOR ─────────────────────────────────────────────────────── */
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice()) {
    const cursorEl = document.getElementById('cursor');
    if (cursorEl) {
      const ring = cursorEl.querySelector('.cursor__ring');
      const dot  = cursorEl.querySelector('.cursor__dot');
      let cX = 0, cY = 0, mX = 0, mY = 0;

      document.addEventListener('mousemove', e => {
        mX = e.clientX;
        mY = e.clientY;
        // Dot is instant
        dot.style.left  = mX + 'px';
        dot.style.top   = mY + 'px';
      });

      // Ring follows with lerp for smooth trail
      (function lerp() {
        cX += (mX - cX) * 0.12;
        cY += (mY - cY) * 0.12;
        ring.style.left = cX + 'px';
        ring.style.top  = cY + 'px';
        requestAnimationFrame(lerp);
      })();

      // Hover state on interactive elements
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, .skill-chip, .project-card, .about-card, .service-card, .building-card, .faq-item__header, .contact__channel-link'
      );
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor--hover'));
        el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor--hover'));
      });
    }
  }

  /* ── TOAST NOTIFICATION ────────────────────────────────────────────────── */
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg, duration = 2500) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), duration);
  }

  // Expose globally so other modules can use it
  window.showToast = showToast;

  /* ── COPY TO CLIPBOARD ─────────────────────────────────────────────────── */
  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(successMsg || '✓ Copied to clipboard'))
        .catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showToast(successMsg || '✓ Copied'); }
    catch { showToast('Copy manually: ' + text, 4000); }
    document.body.removeChild(ta);
  }

  // Wire up all copy buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy]');
    if (btn) {
      const value = btn.dataset.copy;
      copyToClipboard(value, '✓ ' + value + ' copied!');
    }
  });

  /* ── MOBILE NAVIGATION ─────────────────────────────────────────────────── */
  const toggle  = document.getElementById('navToggle');
  const menu    = document.getElementById('navMenu');
  const navLinks = menu ? menu.querySelectorAll('.nav__link') : [];

  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.contains('open') ? closeMenu() : openMenu();
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    // Close on outside click
    document.addEventListener('click', e => {
      if (menu.classList.contains('open') &&
          !menu.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
  }

  /* ── SMOOTH SCROLL for anchor links ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
