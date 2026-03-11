/* ========================================
   PT PMP - Gallery / Photo localStorage CRUD
   Per-page categorized photo management
   ======================================== */

const GALLERY_KEY = 'pmp_gallery';

// Album categories organized by page
// Each album has: key, label, page, description
var GALLERY_ALBUMS = {
  // Beranda (index.html)
  home_hero:        { label: 'Hero Background',        page: 'Beranda',        desc: 'Foto latar belakang hero di halaman utama' },
  home_gallery:     { label: 'Galeri Beranda',          page: 'Beranda',        desc: 'Foto galeri preview di halaman utama (maks 8 foto)' },

  // Tentang Kami (about.html)
  about_slider:     { label: 'Slider Utama',            page: 'Tentang Kami',   desc: 'Foto untuk slider galeri utama di halaman tentang' },
  about_facility:   { label: 'Fasilitas',               page: 'Tentang Kami',   desc: 'Foto fasilitas pabrik, gudang, dan peralatan' },
  about_team:       { label: 'Tim & Manajemen',         page: 'Tentang Kami',   desc: 'Foto tim, manajemen, dan karyawan' },
  about_activity:   { label: 'Kegiatan & Acara',        page: 'Tentang Kami',   desc: 'Foto kegiatan perusahaan dan acara' },

  // Produk & Jasa (products.html)
  products_facility: { label: 'Fasilitas Produksi',     page: 'Produk & Jasa',  desc: 'Foto mesin, proses pengeringan, dan fasilitas produksi' },
  products_corn:     { label: 'Produk Jagung',          page: 'Produk & Jasa',  desc: 'Foto produk jagung berbagai grade' },

  // Keberlanjutan (sustainability.html)
  sustainability_program: { label: 'Program & Dampak',  page: 'Keberlanjutan',  desc: 'Foto program keberlanjutan dan dampak sosial' },

  // Komunitas (community.html)
  community_farmer:  { label: 'Program Petani',         page: 'Komunitas',      desc: 'Foto pemberdayaan dan kemitraan petani' },
  community_event:   { label: 'Acara Komunitas',        page: 'Komunitas',      desc: 'Foto acara dan kegiatan komunitas' },

  // Harga Jagung (harga-jagung.html)
  harga_quality:     { label: 'Kualitas Jagung',        page: 'Harga Jagung',   desc: 'Foto sampel jagung grade A, B, dan C' }
};

// Legacy album mapping (old key → new key) for backward compatibility
var LEGACY_MAP = {
  hero:     'home_hero',
  facility: 'about_facility',
  team:     'about_team',
  activity: 'about_activity'
};

// Group albums by page
function getAlbumsByPage() {
  var pages = {};
  for (var key in GALLERY_ALBUMS) {
    var a = GALLERY_ALBUMS[key];
    if (!pages[a.page]) pages[a.page] = [];
    pages[a.page].push({ key: key, label: a.label, desc: a.desc });
  }
  return pages;
}

function getGallery() {
  try {
    var data = localStorage.getItem(GALLERY_KEY);
    var photos = data ? JSON.parse(data) : [];
    // Auto-migrate legacy album keys
    var migrated = false;
    photos.forEach(function (p) {
      if (LEGACY_MAP[p.album]) { p.album = LEGACY_MAP[p.album]; migrated = true; }
    });
    if (migrated) saveGallery(photos);
    return photos;
  } catch (e) { return []; }
}

function saveGallery(photos) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(photos));
}

function getPhotosByAlbum(album) {
  return getGallery().filter(function (p) { return p.album === album; }).sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
}

function getPhotosByPage(pageName) {
  var albumKeys = [];
  for (var key in GALLERY_ALBUMS) {
    if (GALLERY_ALBUMS[key].page === pageName) albumKeys.push(key);
  }
  return getGallery().filter(function (p) { return albumKeys.indexOf(p.album) !== -1; }).sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
}

function upsertPhoto(photo) {
  var photos = getGallery();
  var idx = -1;
  for (var i = 0; i < photos.length; i++) { if (photos[i].id === photo.id) { idx = i; break; } }
  if (idx >= 0) photos[idx] = photo; else photos.push(photo);
  saveGallery(photos);
}

function deletePhoto(id) {
  saveGallery(getGallery().filter(function (p) { return p.id !== id; }));
}

function generatePhotoId() {
  return 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

window.GalleryDB = {
  getGallery: getGallery,
  saveGallery: saveGallery,
  getPhotosByAlbum: getPhotosByAlbum,
  getPhotosByPage: getPhotosByPage,
  upsertPhoto: upsertPhoto,
  deletePhoto: deletePhoto,
  generatePhotoId: generatePhotoId,
  ALBUMS: GALLERY_ALBUMS,
  getAlbumsByPage: getAlbumsByPage
};
