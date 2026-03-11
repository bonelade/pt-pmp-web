/* ========================================
   PT PMP - Gallery / Photo Management
   Loads from data/photos.json (static file)
   Admin edits saved to localStorage, then exported to JSON
   ======================================== */

var GALLERY_KEY = 'pmp_gallery';
var GALLERY_JSON_URL = 'data/photos.json';
var _galleryCache = null;
var _galleryReady = false;
var _galleryCallbacks = [];

// Album categories organized by page
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

// Load photos: try localStorage first (admin edits), then fetch JSON
function loadGalleryData(callback) {
  // If already loaded, return cache
  if (_galleryReady) {
    if (callback) callback(_galleryCache);
    return;
  }

  // Queue callback
  if (callback) _galleryCallbacks.push(callback);

  // If already loading, just wait
  if (_galleryCallbacks.length > 1) return;

  // Check localStorage for admin overrides
  var localData = null;
  try {
    var raw = localStorage.getItem(GALLERY_KEY);
    if (raw) localData = JSON.parse(raw);
  } catch (e) { /* ignore */ }

  if (localData && localData.length > 0) {
    _galleryCache = localData;
    _galleryReady = true;
    _fireCallbacks();
    return;
  }

  // Fetch from JSON file
  var xhr = new XMLHttpRequest();
  xhr.open('GET', GALLERY_JSON_URL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200) {
      try {
        _galleryCache = JSON.parse(xhr.responseText);
        // Save to localStorage as working copy
        localStorage.setItem(GALLERY_KEY, JSON.stringify(_galleryCache));
      } catch (e) {
        _galleryCache = [];
      }
    } else {
      _galleryCache = [];
    }
    _galleryReady = true;
    _fireCallbacks();
  };
  xhr.send();
}

function _fireCallbacks() {
  var cbs = _galleryCallbacks.slice();
  _galleryCallbacks = [];
  cbs.forEach(function (cb) { cb(_galleryCache); });
}

// Sync getter (returns cache or empty - use after loadGalleryData)
function getGallery() {
  if (_galleryCache) return _galleryCache;
  // Fallback: try localStorage sync
  try {
    var raw = localStorage.getItem(GALLERY_KEY);
    _galleryCache = raw ? JSON.parse(raw) : [];
  } catch (e) {
    _galleryCache = [];
  }
  return _galleryCache;
}

function saveGallery(photos) {
  _galleryCache = photos;
  try {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(photos));
    return { success: true };
  } catch (e) {
    // localStorage quota exceeded
    console.warn('localStorage full:', e.message);
    return { error: 'storage_full' };
  }
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
  return saveGallery(photos);
}

function deletePhoto(id) {
  saveGallery(getGallery().filter(function (p) { return p.id !== id; }));
}

function generatePhotoId() {
  return 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

// Export current gallery data as JSON string (for admin to download/save)
function exportGalleryJSON() {
  return JSON.stringify(getGallery(), null, 2);
}

// Reset localStorage to force re-fetch from JSON
function resetToJSON() {
  localStorage.removeItem(GALLERY_KEY);
  _galleryCache = null;
  _galleryReady = false;
}

// Auto-load on script init
loadGalleryData();

window.GalleryDB = {
  loadGalleryData: loadGalleryData,
  getGallery: getGallery,
  saveGallery: saveGallery,
  getPhotosByAlbum: getPhotosByAlbum,
  getPhotosByPage: getPhotosByPage,
  upsertPhoto: upsertPhoto,
  deletePhoto: deletePhoto,
  generatePhotoId: generatePhotoId,
  exportGalleryJSON: exportGalleryJSON,
  resetToJSON: resetToJSON,
  ALBUMS: GALLERY_ALBUMS,
  getAlbumsByPage: getAlbumsByPage
};
