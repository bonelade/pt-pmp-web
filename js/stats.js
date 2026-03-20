// ============================
// Visitor Statistics Tracker
// Uses localStorage (local) + Supabase (global)
// ============================
(function () {
  var STATS_KEY = 'pmp_stats';

  function getStats() {
    try {
      return JSON.parse(localStorage.getItem(STATS_KEY)) || { pages: {}, clicks: {}, daily: {} };
    } catch (e) {
      return { pages: {}, clicks: {}, daily: {} };
    }
  }

  function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }

  function getToday() {
    return new Date().toISOString().split('T')[0];
  }

  function getPageName() {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    if (file === '' || file === '/') file = 'index.html';
    return file;
  }

  // Send page view to Supabase
  function sendToSupabase(page) {
    try {
      var client = getSupabase();
      if (!client) return;
      client.from('page_views').insert({
        page: page,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null
      }).then(function() {});
    } catch (e) {}
  }

  // Track page view
  function trackPageView() {
    var page = getPageName();
    if (page === 'admin.html') return;

    var stats = getStats();
    var today = getToday();

    // Local stats
    if (!stats.pages[page]) {
      stats.pages[page] = { total: 0, daily: {}, last_visit: null };
    }
    stats.pages[page].total++;
    stats.pages[page].daily[today] = (stats.pages[page].daily[today] || 0) + 1;
    stats.pages[page].last_visit = new Date().toISOString();

    if (!stats.daily) stats.daily = {};
    stats.daily[today] = (stats.daily[today] || 0) + 1;

    saveStats(stats);

    // Global stats via Supabase
    sendToSupabase(page);
  }

  // Track channel click
  function trackClick(channel) {
    var stats = getStats();
    var today = getToday();

    if (!stats.clicks) stats.clicks = {};
    if (!stats.clicks[channel]) {
      stats.clicks[channel] = { total: 0, daily: {}, last_click: null };
    }
    stats.clicks[channel].total++;
    stats.clicks[channel].daily[today] = (stats.clicks[channel].daily[today] || 0) + 1;
    stats.clicks[channel].last_click = new Date().toISOString();

    saveStats(stats);
  }

  // Auto-track outbound clicks on social/contact links
  function setupClickTracking() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href') || '';

      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
        trackClick('WhatsApp');
      } else if (href.indexOf('instagram.com') !== -1) {
        trackClick('Instagram');
      } else if (href.indexOf('facebook.com') !== -1) {
        trackClick('Facebook');
      } else if (href.indexOf('mailto:') === 0) {
        trackClick('Email');
      } else if (href.indexOf('tel:') === 0) {
        trackClick('Telepon');
      }
    });
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      trackPageView();
      setupClickTracking();
    });
  } else {
    trackPageView();
    setupClickTracking();
  }

  // Expose for admin page
  window.PmpStats = {
    getStats: getStats,
    trackClick: trackClick
  };
})();
