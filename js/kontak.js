/* ========================================
   PT PMP - Social & Contact Links - Supabase ONLY (JSONB)
   Table: kontak (id TEXT PK, data JSONB, updated_at)
   ======================================== */

var KONTAK_DEFAULT = {
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
    if (sb || attempts >= 50) {
      clearInterval(timer);
      if (sb) {
        sb.from('kontak').select('*').eq('id', 'main').maybeSingle()
          .then(function (res) {
            if (res.data && res.data.data) {
              _kontakCache = Object.assign({}, KONTAK_DEFAULT, res.data.data);
            } else {
              _kontakCache = Object.assign({}, KONTAK_DEFAULT);
              sb.from('kontak').upsert({ id: 'main', data: _kontakCache });
            }
            _kontakReady = true;
            if (callback) callback(_kontakCache);
          })
          .catch(function () {
            _kontakCache = Object.assign({}, KONTAK_DEFAULT);
            _kontakReady = true;
            if (callback) callback(_kontakCache);
          });
      } else {
        _kontakCache = Object.assign({}, KONTAK_DEFAULT);
        _kontakReady = true;
        if (callback) callback(_kontakCache);
      }
    }
  }, 100);
}

function getKontak() {
  return _kontakCache || Object.assign({}, KONTAK_DEFAULT);
}

function saveKontak(data) {
  data.last_updated = new Date().toISOString();
  _kontakCache = data;
  var sb = _kontakSupa();
  if (sb) {
    sb.from('kontak').upsert({ id: 'main', data: data, updated_at: new Date().toISOString() })
      .then(function (res) {
        if (res.error) console.error('[KontakDB] Save failed:', res.error.message);
        else console.log('[KontakDB] Saved OK');
      });
  }
}

loadKontak();

window.KontakDB = { getKontak: getKontak, saveKontak: saveKontak, loadKontak: loadKontak };
