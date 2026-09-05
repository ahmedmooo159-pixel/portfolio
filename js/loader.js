/**
 * loader.js — Full terminal preloader with animated hash compilation
 * Impressive developer environment feel. Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader  = document.getElementById('loader');
  const linesEl = document.getElementById('loaderLines');
  const barFill = document.getElementById('loaderBarFill');

  if (!loader) return;

  function dismiss() {
    document.body.style.overflow = '';
    loader.classList.add('hidden');
    loader.addEventListener('transitionend', () => {
      if (loader.parentNode) loader.parentNode.removeChild(loader);
    }, { once: true });
    document.dispatchEvent(new CustomEvent('portfolioReady'));
  }

  if (prefersReducedMotion) {
    document.body.style.overflow = '';
    dismiss();
    return;
  }

  // ── COMMANDS with type-by-type feel ─────────────────────────────────────
  const SCRIPT = [
    { type: 'cmd',     text: 'visitor@guest:~$ curl https://api.mourad.dev/profile' },
    { type: 'info',    text: '  Fetching profile: Ahmed Mourad...' },
    { type: 'success', text: '  [✓] Delta Technological University · Year 4' },
    { type: 'info',    text: '  Stack: JavaScript · Node.js · Firebase · Supabase' },
    { type: 'cmd',     text: 'visitor@guest:~$ npm run start:production' },
    { type: 'info',    text: '  Initializing real-time cloud listeners...' },
    { type: 'info',    text: '  Loading .NET & C# expansion track...' },
    { type: 'success', text: '  [✓] All services mounted & operational' },
    { type: 'cmd',     text: 'visitor@guest:~$ serve --portfolio --live' },
    { type: 'success', text: '  [✓] Ready at http://localhost:2026' },
    { type: 'ready',   text: '  ✦  Portfolio ready — Welcome.' },
  ];

  let lineIdx = 0;

  // Char-by-char typing effect for cmd lines, instant for others
  function appendLine(data, onDone) {
    const el = document.createElement('div');
    el.className = 'loader__line loader__line--' + data.type;
    linesEl.appendChild(el);
    linesEl.scrollTop = linesEl.scrollHeight;

    if (data.type === 'cmd') {
      // Type char by char
      let charIdx = 0;
      const chars = data.text;
      function typeChar() {
        if (charIdx < chars.length) {
          el.textContent = chars.slice(0, ++charIdx);
          setTimeout(typeChar, 22 + Math.random() * 18);
        } else {
          onDone();
        }
      }
      setTimeout(typeChar, 40);
    } else {
      el.textContent = data.text;
      setTimeout(onDone, 90);
    }
  }

  function nextLine() {
    if (lineIdx >= SCRIPT.length) {
      barFill.style.width = '100%';
      setTimeout(dismiss, 500);
      return;
    }

    const step = SCRIPT[lineIdx++];
    barFill.style.width = ((lineIdx / SCRIPT.length) * 100) + '%';
    appendLine(step, nextLine);
  }

  // Lock scroll during load
  document.body.style.overflow = 'hidden';
  setTimeout(nextLine, 300);
})();
