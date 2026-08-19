/**
 * particles.js — Subtle canvas network particles
 * Low density, mouse interaction, pauses when page is hidden.
 * Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Config
  const CONFIG = {
    countDesktop: 48,
    countMobile: 22,
    speed: 0.25,
    connectionDist: 120,
    mouseRadius: 100,
    particleRadius: 1.5,
    colorA: '79,195,247',   // accent-blue
    colorB: '156,109,245',  // accent-purple
  };

  let W, H, particles = [], animId, paused = false;
  const mouse = { x: null, y: null };
  const isMobile = () => window.innerWidth < 768;

  class Particle {
    constructor() { this.reset(true); }

    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : -10;
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
      this.r  = Math.random() * CONFIG.particleRadius + 0.8;
      this.color = Math.random() > 0.5 ? CONFIG.colorA : CONFIG.colorB;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      // Mouse repulsion (gentle)
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.mouseRadius && dist > 0) {
          const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
          this.vx += (dx / dist) * force * 0.3;
          this.vy += (dy / dist) * force * 0.3;
        }
      }

      // Speed cap
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > CONFIG.speed * 3) {
        this.vx = (this.vx / speed) * CONFIG.speed * 3;
        this.vy = (this.vy / speed) * CONFIG.speed * 3;
      }

      this.x += this.vx;
      this.y += this.vy;

      // Soft wall bounce
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;

      this.x = Math.max(0, Math.min(W, this.x));
      this.y = Math.max(0, Math.min(H, this.y));
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i], p2 = particles[j];
        const dx = p1.x - p2.x, dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectionDist) {
          const alpha = (1 - dist / CONFIG.connectionDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${CONFIG.colorA},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function init() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = isMobile() ? CONFIG.countMobile : CONFIG.countDesktop;
    particles = Array.from({ length: count }, () => new Particle());
  }

  function animate() {
    if (paused) return;
    animId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
  }

  // Pause when tab hidden — saves battery/CPU
  document.addEventListener('visibilitychange', () => {
    paused = document.hidden;
    if (!paused) animate();
  });

  // Responsive resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { init(); }, 200);
  });

  // Mouse tracking
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  init();
  animate();
})();
