/* ========================================
   PT PMP - Harga Jagung - Supabase + localStorage fallback
   ======================================== */

const HARGA_KEY = 'pmp_harga_jagung';

const HARGA_DEFAULT = {
  last_updated: '',
  updated_by: 'Administrator',
  grades: [
    {
      grade: 'A',
      color: '#e8f5ee',
      border: '#16a34a',
      kadar_air: '≤14',
      aflatoxin: '≤100',
      biji_jamur: '≤1',
      biji_mati: '≤3',
      biji_pecah: '≤3',
      benda_asing: '≤1',
      biji_lubang: '≤1',
      biji_putih: '≤3',
      harga: 5960
    },
    {
      grade: 'B',
      color: '#fef3e2',
      border: '#c9932a',
      kadar_air: '14,1 – 15',
      aflatoxin: '101 – 150',
      biji_jamur: '≤2',
      biji_mati: '≤5',
      biji_pecah: '≤5',
      benda_asing: '≤2',
      biji_lubang: '≤2',
      biji_putih: '≤5',
      harga: 5760
    },
    {
      grade: 'C',
      color: '#fde8e9',
      border: '#cc2229',
      kadar_air: '15,1 – 17',
      aflatoxin: '151 – 200',
      biji_jamur: '≤4',
      biji_mati: '≤7',
      biji_pecah: '≤7',
      benda_asing: '≤3',
      biji_lubang: '≤3',
      biji_putih: '≤7',
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
    if (sb || attempts >= 30) {
      clearInterval(timer);
      if (sb) {
        sb.from('harga').select('*').eq('id', 'main').single()
          .then(function (res) {
            if (res.data && res.data.data) {
              _hargaCache = res.data.data;
              _hargaReady = true;
              if (callback) callback(_hargaCache);
            } else {
              // No data in Supabase — use default and seed
              _hargaCache = { ...HARGA_DEFAULT, last_updated: new Date().toISOString() };
              _hargaReady = true;
              if (callback) callback(_hargaCache);
              sb.from('harga').upsert({ id: 'main', data: _hargaCache });
            }
          })
          .catch(function () { _loadHargaLocal(callback); });
      } else {
        _loadHargaLocal(callback);
      }
    }
  }, 100);
}

function _loadHargaLocal(callback) {
  try {
    var data = localStorage.getItem(HARGA_KEY);
    if (data) {
      _hargaCache = JSON.parse(data);
    } else {
      _hargaCache = { ...HARGA_DEFAULT, last_updated: new Date().toISOString() };
      localStorage.setItem(HARGA_KEY, JSON.stringify(_hargaCache));
    }
  } catch (e) {
    _hargaCache = HARGA_DEFAULT;
  }
  _hargaReady = true;
  if (callback) callback(_hargaCache);
}

function getHarga() {
  if (_hargaCache) return _hargaCache;
  // Sync fallback
  try {
    var data = localStorage.getItem(HARGA_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {}
  return { ...HARGA_DEFAULT, last_updated: new Date().toISOString() };
}

function saveHarga(data) {
  data.last_updated = new Date().toISOString();
  _hargaCache = data;
  localStorage.setItem(HARGA_KEY, JSON.stringify(data));
  var sb = _hargaSupa();
  if (sb) {
    sb.from('harga').upsert({ id: 'main', data: data, updated_at: new Date().toISOString() });
  }
}

function formatHarga(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

function formatDateTime(isoStr) {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return d.toLocaleDateString('id-ID', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }) + ' WIB';
}

// Auto-load
loadHarga();

window.HargaDB = { getHarga, saveHarga, formatHarga, formatDateTime, loadHarga };
