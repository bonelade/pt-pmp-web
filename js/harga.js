/* ========================================
   PT PMP - Harga Jagung - Supabase ONLY (JSONB)
   Table: harga (id TEXT PK, data JSONB, updated_at)
   ======================================== */

var HARGA_DEFAULT = {
  last_updated: '',
  updated_by: 'Administrator',
  grades: [
    {
      grade: 'A', color: '#e8f5ee', border: '#16a34a',
      kadar_air: '\u226414', aflatoxin: '\u2264100',
      biji_jamur: '\u22641', biji_mati: '\u22643', biji_pecah: '\u22643',
      benda_asing: '\u22641', biji_lubang: '\u22641', biji_putih: '\u22643',
      harga: 5960
    },
    {
      grade: 'B', color: '#fef3e2', border: '#c9932a',
      kadar_air: '14,1 \u2013 15', aflatoxin: '101 \u2013 150',
      biji_jamur: '\u22642', biji_mati: '\u22645', biji_pecah: '\u22645',
      benda_asing: '\u22642', biji_lubang: '\u22642', biji_putih: '\u22645',
      harga: 5760
    },
    {
      grade: 'C', color: '#fde8e9', border: '#cc2229',
      kadar_air: '15,1 \u2013 17', aflatoxin: '151 \u2013 200',
      biji_jamur: '\u22644', biji_mati: '\u22647', biji_pecah: '\u22647',
      benda_asing: '\u22643', biji_lubang: '\u22643', biji_putih: '\u22647',
      harga: 5560
    }
  ]
};

var _hargaCache = null;
var _hargaReady = false;

function _hargaSupa() {
  return (typeof getSupabase === 'function') ? getSupabase() : null;
}

function loadHarga(callback) {
  if (_hargaReady && _hargaCache) {
    if (callback) callback(_hargaCache);
    return;
  }

  var attempts = 0;
  var timer = setInterval(function () {
    attempts++;
    var sb = _hargaSupa();
    if (sb || attempts >= 50) {
      clearInterval(timer);
      if (sb) {
        sb.from('harga').select('*').eq('id', 'main').maybeSingle()
          .then(function (res) {
            if (res.data && res.data.data) {
              _hargaCache = res.data.data;
            } else {
              _hargaCache = Object.assign({}, HARGA_DEFAULT, { last_updated: new Date().toISOString() });
              sb.from('harga').upsert({ id: 'main', data: _hargaCache });
            }
            _hargaReady = true;
            if (callback) callback(_hargaCache);
          })
          .catch(function () {
            _hargaCache = Object.assign({}, HARGA_DEFAULT);
            _hargaReady = true;
            if (callback) callback(_hargaCache);
          });
      } else {
        _hargaCache = Object.assign({}, HARGA_DEFAULT);
        _hargaReady = true;
        if (callback) callback(_hargaCache);
      }
    }
  }, 100);
}

function getHarga() {
  return _hargaCache || Object.assign({}, HARGA_DEFAULT);
}

function saveHarga(data) {
  data.last_updated = new Date().toISOString();
  _hargaCache = data;
  var sb = _hargaSupa();
  if (sb) {
    sb.from('harga').upsert({ id: 'main', data: data, updated_at: new Date().toISOString() })
      .then(function (res) {
        if (res.error) console.error('[HargaDB] Save failed:', res.error.message);
        else console.log('[HargaDB] Saved OK');
      });
  }
}

function formatHarga(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function formatDateTime(isoStr) {
  if (!isoStr) return '\u2014';
  var d = new Date(isoStr);
  return d.toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }) + ' WIB';
}

loadHarga();

window.HargaDB = { getHarga: getHarga, saveHarga: saveHarga, formatHarga: formatHarga, formatDateTime: formatDateTime, loadHarga: loadHarga };
