/**
 * interactions.js — Custom cursor, clipboard actions, toast notifications, mobile drawer & smooth scroll
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
        if (dot) {
          dot.style.left = mX + 'px';
          dot.style.top  = mY + 'px';
        }
      });

      (function lerp() {
        cX += (mX - cX) * 0.14;
        cY += (mY - cY) * 0.14;
        if (ring) {
          ring.style.left = cX + 'px';
          ring.style.top  = cY + 'px';
        }
        requestAnimationFrame(lerp);
      })();

      // Interactive hover hooks
      function attachCursorHovers() {
        const interactives = document.querySelectorAll(
          'a, button, input, textarea, .skill-chip, .project-card, .about-card, .service-card, .education-card, .experience-card, .feedback-card, .contact__channel-link, .nav__lang-btn'
        );
        interactives.forEach(el => {
          el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor--hover'));
          el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor--hover'));
        });
      }

      attachCursorHovers();
    }
  }

  /* ── TOAST NOTIFICATION ────────────────────────────────────────────────── */
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg, duration = 3000) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), duration);
  }

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
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || '✓ Copied');
    } catch (e) {
      showToast('Copy manually: ' + text, 4000);
    }
    document.body.removeChild(ta);
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-copy]');
    if (btn) {
      const value = btn.dataset.copy;
      const isAr = document.documentElement.getAttribute('lang') === 'ar';
      const msg = isAr ? `✓ تم نسخ الرقم: ${value}` : `✓ ${value} copied!`;
      copyToClipboard(value, msg);
    }
  });

  /* ── MOBILE NAVIGATION DRAWER ─────────────────────────────────────────── */
  const toggle   = document.getElementById('navToggle');
  const menu     = document.getElementById('navMenu');
  const navLinks = menu ? menu.querySelectorAll('.nav__link') : [];

  function openMenu() {
    if (!menu || !toggle) return;
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menu || !toggle) return;
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
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
})();
