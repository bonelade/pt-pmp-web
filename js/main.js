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

  // Expose observer globally so dynamically rendered elements can be observed
  window._scrollObserver = observer;
  // Helper: observe any new .animate-on-scroll elements inside a container
  window.observeNewAnimations = function(container) {
    if (!container) container = document;
    container.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  };

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

  document.querySelectorAll('[data-count]:not(.section-ornaments)').forEach(el => statObserver.observe(el));

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

  // === Gallery Carousel (auto-scroll train for >3 photos) ===
  window.initGalleryCarousel = function(gridEl) {
    if (!gridEl) return;
    var items = gridEl.querySelectorAll('.gallery-item');
    if (items.length <= 3) return; // keep grid if 3 or fewer

    // Convert grid to carousel
    gridEl.classList.remove('gallery-grid');
    gridEl.classList.add('gallery-carousel');

    // Create track with duplicated items for seamless loop
    var track = document.createElement('div');
    track.className = 'gallery-track';

    // Add original items
    items.forEach(function(item) { track.appendChild(item); });
    // Duplicate all items for seamless infinite scroll
    items.forEach(function(item) { track.appendChild(item.cloneNode(true)); });

    gridEl.innerHTML = '';
    gridEl.appendChild(track);

    // Set duration based on item count (more items = slower)
    var duration = Math.max(20, items.length * 5);
    gridEl.style.setProperty('--scroll-duration', duration + 's');

    // Re-bind lightbox click on cloned items
    track.querySelectorAll('.gallery-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var img = item.querySelector('img');
        if (img && typeof window.openLightbox === 'function') {
          window.openLightbox(img.src);
        }
      });
    });

    // Observe animations on new items
    if (window.observeNewAnimations) window.observeNewAnimations(track);
  };

  // === Offline / connection lost detection ===
  window.addEventListener('offline', function () {
    window.showToast('Tidak ada koneksi internet', 'error');
  });
  window.addEventListener('online', function () {
    window.showToast('Koneksi kembali tersedia', 'success');
  });
});
