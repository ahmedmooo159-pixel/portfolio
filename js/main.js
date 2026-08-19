/**
 * main.js — Entry point & Interactive Developer Console
 */
(function () {
  'use strict';

  /* ── INTERACTIVE TERMINAL CONSOLE ──────────────────────────────────────── */
  const body  = document.getElementById('terminalBody');
  const input = document.getElementById('terminalInput');
  if (!body || !input) return;

  const COMMANDS = {
    help: () => [
      { t: 'out', v: 'Available commands:' },
      { t: 'out', v: '  whoami    — who is Ahmed Mourad' },
      { t: 'out', v: '  skills    — technology stack' },
      { t: 'out', v: '  projects  — list of projects' },
      { t: 'out', v: '  contact   — get in touch' },
      { t: 'out', v: '  status    — current status' },
      { t: 'out', v: '  clear     — clear terminal' },
    ],

    whoami: () => [
      { t: 'out--highlight', v: 'Ahmed Mourad Araby Sayed' },
      { t: 'out', v: 'Role      : Full-Stack .NET Developer' },
      { t: 'out', v: 'Education : Delta Technological University, Year 4' },
      { t: 'out', v: 'Track     : IT — Software Engineering' },
      { t: 'out', v: 'Location  : Egypt' },
      { t: 'out', v: 'Phone     : 01091728680' },
    ],

    skills: () => [
      { t: 'out', v: 'Backend' },
      { t: 'bar', v: 'C#          ██████████  Expert' },
      { t: 'bar', v: '.NET Core   █████████░  Advanced' },
      { t: 'bar', v: 'ASP.NET     █████████░  Advanced' },
      { t: 'bar', v: 'EF Core     ████████░░  Proficient' },
      { t: 'out', v: '' },
      { t: 'out', v: 'Frontend' },
      { t: 'bar', v: 'JavaScript  ████████░░  Proficient' },
      { t: 'bar', v: 'HTML / CSS  █████████░  Advanced' },
      { t: 'out', v: '' },
      { t: 'out', v: 'Database' },
      { t: 'bar', v: 'SQL Server  █████████░  Advanced' },
      { t: 'bar', v: 'Supabase    ████████░░  Proficient' },
    ],

    projects: () => [
      { t: 'out--highlight', v: '[1] Clinic Management System' },
      { t: 'out', v: '    → Complete appointment & admin platform' },
      { t: 'out', v: '    → Live: cms-ochre-eta.vercel.app' },
      { t: 'out', v: '' },
      { t: 'out--highlight', v: '[2] Mla3b El Sadat' },
      { t: 'out', v: '    → Sports facility booking platform' },
      { t: 'out', v: '    → Live: mla3b-el-sadat.vercel.app' },
      { t: 'out', v: '' },
      { t: 'out--highlight', v: '[3] Al-Andalus Sports Club' },
      { t: 'out', v: '    → Full club website with modern UI' },
      { t: 'out', v: '    → Live: al-andalus-sports-club.vercel.app' },
      { t: 'out', v: '' },
      { t: 'out--highlight', v: '[4] Flower Art' },
      { t: 'out', v: '    → Artisan floral storefront' },
      { t: 'out', v: '    → Live: flower-art-opal.vercel.app' },
    ],

    contact: () => [
      { t: 'out', v: 'Get in touch:' },
      { t: 'out--highlight', v: 'Phone / WhatsApp : 01091728680' },
      { t: 'out', v: 'GitHub           : github.com/ahmedmooo159-pixel' },
      { t: 'out', v: 'LinkedIn         : linkedin.com/in/ahmed-mourad-879194414' },
    ],

    status: () => [
      { t: 'out--highlight', v: '● ONLINE' },
      { t: 'out', v: 'Currently building real-world software systems.' },
      { t: 'out', v: 'Specializing in Full-Stack .NET development.' },
      { t: 'out', v: 'Final year @ Delta Technological University.' },
      { t: 'out', v: 'Open to collaboration and opportunities.' },
    ],

    clear: () => {
      body.innerHTML = '';
      return [];
    },
  };

  function appendLine(cls, text) {
    const el = document.createElement('div');
    el.className = 'term-' + cls;
    el.textContent = text;
    body.appendChild(el);
  }

  function appendPrompt(cmd) {
    appendLine('prompt', '~/portfolio $ ');
    const el = document.createElement('div');
    el.innerHTML = '<span class="term-prompt">~/portfolio $ </span><span class="term-cmd">' +
      escapeHTML(cmd) + '</span>';
    body.appendChild(el);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    appendPrompt(raw.trim());

    if (!cmd) { body.scrollTop = body.scrollHeight; return; }

    if (COMMANDS[cmd]) {
      const lines = COMMANDS[cmd]();
      lines.forEach(({ t, v }) => {
        if (v === '') {
          body.appendChild(document.createElement('br'));
        } else {
          appendLine(t, v);
        }
      });
    } else {
      appendLine('err', 'command not found: ' + cmd + "  (try 'help')");
    }

    body.scrollTop = body.scrollHeight;
  }

  // Initial greeting
  function initTerminal() {
    [
      { t: 'out--highlight', v: 'Ahmed Mourad — Developer Console v1.0' },
      { t: 'out', v: "Type 'help' to see available commands." },
      { t: 'out', v: '' },
    ].forEach(({ t, v }) => appendLine(t, v));
  }

  initTerminal();

  // Input handler
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    }
  });

  // Click terminal area to focus input
  document.querySelector('.terminal')?.addEventListener('click', () => input.focus());

})();
