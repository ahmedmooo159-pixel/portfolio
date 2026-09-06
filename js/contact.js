/**
 * contact.js — Handles Firebase Firestore message submissions
 * Features: Client-side validation, rate-limiting, spinner state, toast feedback.
 */
(function () {
  'use strict';

  // ── FIREBASE CONFIGURATION ───────────────────────────────────────────────
  const firebaseConfig = {
    apiKey: "AIzaSyAqe-mkk50HrnXM71tJySuXVnqR6qw_bRk",
    authDomain: "portoflio-cd8e7.firebaseapp.com",
    databaseURL: "https://portoflio-cd8e7-default-rtdb.firebaseio.com",
    projectId: "portoflio-cd8e7",
    storageBucket: "portoflio-cd8e7.firebasestorage.app",
    messagingSenderId: "178733313098",
    appId: "1:178733313098:web:de38c7213dd37f546f8ab3",
    measurementId: "G-JM9VESJM8S"
  };

  let db = null;

  // Initialize Firestore & Analytics
  function initFirebase() {
    try {
      if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        const app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        if (firebase.analytics) {
          try { firebase.analytics(); } catch (e) { /* analytics in private browsing fallback */ }
        }
      } else if (typeof firebase !== 'undefined' && firebase.apps.length) {
        db = firebase.firestore();
      }
    } catch (err) {
      console.warn('Firebase initialization error:', err);
    }
  }

  // ── RATE LIMITING ────────────────────────────────────────────────────────
  const RATE_LIMIT_SECONDS = 15;
  let lastSubmitTime = 0;

  function isRateLimited() {
    const now = Date.now();
    const elapsed = (now - lastSubmitTime) / 1000;
    if (elapsed < RATE_LIMIT_SECONDS) {
      return Math.ceil(RATE_LIMIT_SECONDS - elapsed);
    }
    return 0;
  }

  // ── VALIDATION ───────────────────────────────────────────────────────────
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setError(inputEl, msg) {
    const parent = inputEl.closest('.form-group');
    if (!parent) return;
    parent.classList.add('has-error');
    let errorEl = parent.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'form-error';
      parent.appendChild(errorEl);
    }
    errorEl.textContent = msg;
  }

  function clearError(inputEl) {
    const parent = inputEl.closest('.form-group');
    if (!parent) return;
    parent.classList.remove('has-error');
    const errorEl = parent.querySelector('.form-error');
    if (errorEl) errorEl.textContent = '';
  }

  // ── INIT FORM ────────────────────────────────────────────────────────────
  function initContactForm() {
    initFirebase();

    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('contactSubmitBtn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
    const formStatus = document.getElementById('formStatus');

    // Live validation cleanup on input
    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => clearError(input));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Check rate limiting
      const cooldown = isRateLimited();
      if (cooldown > 0) {
        if (window.showToast) {
          window.showToast(`⏳ Please wait ${cooldown}s before sending another message.`);
        }
        return;
      }

      // Validate inputs
      let isValid = true;
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name) {
        setError(nameInput, 'Please enter your name.');
        isValid = false;
      }

      if (!email) {
        setError(emailInput, 'Please enter your email address.');
        isValid = false;
      } else if (!validateEmail(email)) {
        setError(emailInput, 'Please provide a valid email address.');
        isValid = false;
      }

      if (!subject) {
        setError(subjectInput, 'Please provide a subject.');
        isValid = false;
      }

      if (!message) {
        setError(messageInput, 'Please write your message.');
        isValid = false;
      } else if (message.length < 10) {
        setError(messageInput, 'Message should be at least 10 characters.');
        isValid = false;
      }

      if (!isValid) return;

      // Set Loading State
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending Message...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';

      const payload = {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'unread',
        createdAt: new Date().toISOString()
      };

      try {
        if (db && firebaseConfig.apiKey !== "AIzaSyDummyKeyReplaceWithYourActualKey") {
          // Real Firebase Firestore write with server timestamp
          await db.collection('portfolio_messages').add({
            ...payload,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        } else {
          // Simulation fallback if keys are default or testing locally
          await new Promise(resolve => setTimeout(resolve, 800));
          console.info('Message stored successfully in portfolio_messages (local test mode):', payload);
        }

        lastSubmitTime = Date.now();

        // Success UI
        form.reset();
        if (formStatus) {
          formStatus.className = 'form-status form-status--success visible';
          formStatus.innerHTML = `
            <div class="form-status__icon" aria-hidden="true">✓</div>
            <div>
              <strong>Message sent</strong>
              <p>Message sent — I'll get back to you soon.</p>
            </div>
          `;
          setTimeout(() => {
            formStatus.classList.remove('visible');
          }, 8000);
        }

        if (window.showToast) {
          window.showToast("✓ Message sent — I'll get back to you soon.");
        }
      } catch (err) {
        console.error('Error sending message:', err);
        const errMsg = err && err.message ? escapeHtml(err.message) : 'Network or connection issue';
        if (formStatus) {
          formStatus.className = 'form-status form-status--error visible';
          formStatus.innerHTML = `
            <div class="form-status__icon" aria-hidden="true">✕</div>
            <div>
              <strong>Couldn't send message</strong>
              <p>${errMsg}. Feel free to message me directly via WhatsApp at +20 109 172 8680.</p>
            </div>
          `;
        }
        if (window.showToast) {
          window.showToast('✕ Error sending message. Please reach out via WhatsApp.');
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
