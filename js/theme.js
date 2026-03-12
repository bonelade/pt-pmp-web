/* ========================================
   Dark Mode Toggle
   ======================================== */

(function () {
  var STORAGE_KEY = 'pmp_theme';

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
  }

  function toggleTheme() {
    var current = getTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Apply immediately (before DOMContentLoaded) to prevent flash
  applyTheme(getTheme());

  // Bind toggle button when DOM ready
  function bindToggle() {
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
      // Update icon in case it wasn't set by inline script
      applyTheme(getTheme());
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
  }

  window.toggleTheme = toggleTheme;
})();
