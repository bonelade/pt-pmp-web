/* ========================================
   PT PMP - Social & Contact Links - Supabase + localStorage fallback
   ======================================== */

const KONTAK_KEY = 'pmp_kontak';

const KONTAK_DEFAULT = {
  whatsapp: '',
  whatsapp_label: 'WhatsApp PT PMP',
  instagram: '',
  instagram_label: '@ptpanganmerahputih',
  facebook: '',
  facebook_label: 'PT Pangan Merah Putih',
  email: '',
  email_label: 'Email Kami',
  last_updated: ''
};

var _kontakCache = null;
var _kontakReady = false;

function _kontakSupa() {
  return (typeof getSupabase === 'function') ? getSupabase() : null;
}

function loadKontak(callback) {
  if (_kontakReady && _kontakCache) {
    if (callback) callback(_kontakCache);
    return;
  }

  var attempts = 0;
  var timer = setInterval(function () {
    attempts++;
    var sb = _kontakSupa();
    if (sb || attempts >= 30) {
      clearInterval(timer);
      if (sb) {
        sb.from('kontak').select('*').eq('id', 'main').single()
          .then(function (res) {
            if (res.data && res.data.data) {
              _kontakCache = { ...KONTAK_DEFAULT, ...res.data.data };
              _kontakReady = true;
              if (callback) callback(_kontakCache);
            } else {
              // No data — use default and seed
              _kontakCache = { ...KONTAK_DEFAULT };
              _kontakReady = true;
              if (callback) callback(_kontakCache);
              sb.from('kontak').upsert({ id: 'main', data: _kontakCache });
            }
          })
          .catch(function () { _loadKontakLocal(callback); });
      } else {
        _loadKontakLocal(callback);
      }
    }
  }, 100);
}

function _loadKontakLocal(callback) {
  try {
    var data = localStorage.getItem(KONTAK_KEY);
    if (data) {
      _kontakCache = { ...KONTAK_DEFAULT, ...JSON.parse(data) };
    } else {
      _kontakCache = { ...KONTAK_DEFAULT };
      localStorage.setItem(KONTAK_KEY, JSON.stringify(_kontakCache));
    }
  } catch (e) {
    _kontakCache = { ...KONTAK_DEFAULT };
  }
  _kontakReady = true;
  if (callback) callback(_kontakCache);
}

function getKontak() {
  if (_kontakCache) return _kontakCache;
  // Sync fallback
  try {
    var data = localStorage.getItem(KONTAK_KEY);
    if (data) return { ...KONTAK_DEFAULT, ...JSON.parse(data) };
  } catch (e) {}
  return { ...KONTAK_DEFAULT };
}

function saveKontak(data) {
  data.last_updated = new Date().toISOString();
  _kontakCache = data;
  localStorage.setItem(KONTAK_KEY, JSON.stringify(data));
  var sb = _kontakSupa();
  if (sb) {
    sb.from('kontak').upsert({ id: 'main', data: data, updated_at: new Date().toISOString() });
  }
}

// Auto-load
loadKontak();

window.KontakDB = { getKontak, saveKontak, loadKontak };
