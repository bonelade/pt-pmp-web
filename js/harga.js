/* ========================================
   PT PMP - Harga Jagung localStorage CRUD
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

function getHarga() {
  try {
    const data = localStorage.getItem(HARGA_KEY);
    if (!data) {
      const defaultData = { ...HARGA_DEFAULT, last_updated: new Date().toISOString() };
      localStorage.setItem(HARGA_KEY, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(data);
  } catch (e) {
    return HARGA_DEFAULT;
  }
}

function saveHarga(data) {
  data.last_updated = new Date().toISOString();
  localStorage.setItem(HARGA_KEY, JSON.stringify(data));
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

window.HargaDB = { getHarga, saveHarga, formatHarga, formatDateTime };
