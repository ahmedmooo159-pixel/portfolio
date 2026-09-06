/**
 * theme.js — Light/dark theme toggle
 * - Reads localStorage first, then prefers-color-scheme, then defaults dark
 * - Persists choice in localStorage under 'portfolio-theme'
 * - Dispatches a 'themechange' event so other modules can react if needed
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio-theme';
  const html = document.documentElement;

  // ── GET / SET ──────────────────────────────────────────────────────────────
  function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // First visit — respect OS preference
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleLabel(theme);
    html.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  // ── TOGGLE BUTTON ──────────────────────────────────────────────────────────
  function updateToggleLabel(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const isDark = theme === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title',      isDark ? 'Switch to light mode' : 'Switch to dark mode');
    // data-attr drives the CSS icon swap
    btn.setAttribute('data-theme-active', theme);
  }

  function initToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    // Set initial label immediately (theme already applied by inline <head> script)
    updateToggleLabel(html.getAttribute('data-theme') || 'dark');

    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Run after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    initToggle();
  }

  // Also re-apply the correct theme now (the <head> inline script handles the
  // very first paint; this ensures the stored/OS preference is honoured if the
  // inline script ran before localStorage was readable — harmless double-set)
  applyTheme(getTheme());
})();
