/* ========================================
   Navigation Behavior
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');
  const hamburger = document.getElementById('hamburger');
  const navPanel = document.getElementById('nav-panel');
  const navOverlay = document.getElementById('nav-overlay');
  const navPanelClose = document.getElementById('nav-panel-close');

  // Solid header on non-home pages
  const isHomePage = window.location.pathname.endsWith('index.html') ||
                     window.location.pathname === '/' ||
                     window.location.pathname.endsWith('/');

  if (!isHomePage) {
    header.classList.add('solid');
  }

  // Scroll behavior
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      if (isHomePage) {
        header.classList.remove('scrolled');
      }
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Left edge arrow button
  const edgeHint = document.createElement('div');
  edgeHint.id = 'nav-edge-hint';
  edgeHint.innerHTML = '<div class="hint-arrows"><span></span><span></span><span></span></div>';
  document.body.appendChild(edgeHint);

  // Panel open/close
  function openPanel() {
    navPanel.classList.add('open');
    navOverlay.classList.add('open');
    hamburger.classList.add('open');
    edgeHint.classList.add('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    navPanel.classList.remove('open');
    navOverlay.classList.remove('open');
    hamburger.classList.remove('open');
    edgeHint.classList.remove('hidden');
    document.body.style.overflow = '';
  }

  // Click handlers
  edgeHint.addEventListener('click', openPanel);
  if (hamburger) hamburger.addEventListener('click', openPanel);
  if (navPanelClose) navPanelClose.addEventListener('click', closePanel);
  if (navOverlay) navOverlay.addEventListener('click', closePanel);

  // Close on nav link click
  if (navPanel) {
    navPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closePanel);
    });
  }

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePanel();
  });

  // Active link detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Back to top button
  const backTopBtn = document.getElementById('back-to-top');
  if (backTopBtn) {
    window.addEventListener('scroll', () => {
      backTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
      backTopBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
    }, { passive: true });
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
