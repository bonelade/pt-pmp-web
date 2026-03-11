/* ========================================
   Main JS - Shared across all pages
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // === Scroll Animations ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // === Current Year in Footer ===
  document.querySelectorAll('.year-current').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // === Counter Animation ===
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + (suffix || '');
    }, 16);
  }

  // Observe stat numbers for counter animation
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const raw = entry.target.dataset.count;
        const suffix = entry.target.dataset.suffix || '';
        if (raw) {
          const num = parseFloat(raw.replace(/,/g, ''));
          if (!isNaN(num)) {
            animateCounter(entry.target, num, suffix, 1500);
          }
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

  // === Toast Utility ===
  window.showToast = function(message, type = 'success') {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast ${type}`;
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => toast.classList.remove('show'), 3500);
  };

  // === Active nav re-scan after i18n ===
  // Already handled in nav.js
});
