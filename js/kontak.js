/* ========================================
   PT PMP - Social & Contact Links CRUD
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

function getKontak() {
  try {
    const data = localStorage.getItem(KONTAK_KEY);
    if (!data) {
      localStorage.setItem(KONTAK_KEY, JSON.stringify(KONTAK_DEFAULT));
      return { ...KONTAK_DEFAULT };
    }
    return { ...KONTAK_DEFAULT, ...JSON.parse(data) };
  } catch (e) {
    return { ...KONTAK_DEFAULT };
  }
}

function saveKontak(data) {
  data.last_updated = new Date().toISOString();
  localStorage.setItem(KONTAK_KEY, JSON.stringify(data));
}

window.KontakDB = { getKontak, saveKontak };
