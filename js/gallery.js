/* ========================================
   PT PMP - Gallery / Photo Management
   Storage: IndexedDB (hundreds of MB capacity)
   Fallback: data/photos.json for initial data
   ======================================== */

var GALLERY_DB_NAME = 'pmp_gallery_db';
var GALLERY_STORE = 'photos';
var GALLERY_DB_VERSION = 1;
var GALLERY_JSON_URL = 'data/photos.json';
var _galleryCache = null;
var _galleryReady = false;
var _galleryCallbacks = [];
var _idb = null; // IndexedDB instance

// Album categories organized by page
var GALLERY_ALBUMS = {
  home_hero:        { label: 'Hero Background',        page: 'Beranda',        desc: 'Foto latar belakang hero di halaman utama' },
  home_about:       { label: 'Foto Tentang Kami',       page: 'Beranda',        desc: 'Foto di section Tentang Kami halaman utama (foto peresmian, dsb)' },
  home_gallery:     { label: 'Galeri Beranda',          page: 'Beranda',        desc: 'Foto galeri preview di halaman utama (maks 8 foto)' },
  home_video:       { label: 'Video Profil',            page: 'Beranda',        desc: 'Video profil perusahaan (URL video MP4 atau YouTube embed)' },
  about_slider:     { label: 'Slider Utama',            page: 'Tentang Kami',   desc: 'Foto untuk slider galeri utama di halaman tentang' },
  about_facility:   { label: 'Fasilitas',               page: 'Tentang Kami',   desc: 'Foto fasilitas pabrik, gudang, dan peralatan' },
  about_team:       { label: 'Tim & Manajemen',         page: 'Tentang Kami',   desc: 'Foto tim, manajemen, dan karyawan' },
  about_activity:   { label: 'Kegiatan & Acara',        page: 'Tentang Kami',   desc: 'Foto kegiatan perusahaan dan acara' },
  about_video:      { label: 'Video Tentang',           page: 'Tentang Kami',   desc: 'Video tentang perusahaan, fasilitas, atau kegiatan' },
  products_facility: { label: 'Fasilitas Produksi',     page: 'Produk & Jasa',  desc: 'Foto mesin, proses pengeringan, dan fasilitas produksi' },
  products_corn:     { label: 'Produk Jagung',          page: 'Produk & Jasa',  desc: 'Foto produk jagung berbagai grade' },
  sustainability_program: { label: 'Program & Dampak',  page: 'Keberlanjutan',  desc: 'Foto program keberlanjutan dan dampak sosial' },
  community_farmer:  { label: 'Program Petani',         page: 'Komunitas',      desc: 'Foto pemberdayaan dan kemitraan petani' },
  community_event:   { label: 'Acara Komunitas',        page: 'Komunitas',      desc: 'Foto acara dan kegiatan komunitas' },
  harga_quality:     { label: 'Kualitas Jagung',        page: 'Harga Jagung',   desc: 'Foto sampel jagung grade A, B, dan C' }
};

function getAlbumsByPage() {
  var pages = {};
  for (var key in GALLERY_ALBUMS) {
    var a = GALLERY_ALBUMS[key];
    if (!pages[a.page]) pages[a.page] = [];
    pages[a.page].push({ key: key, label: a.label, desc: a.desc });
  }
  return pages;
}

// ============================
// IndexedDB Layer
// ============================
function openDB(callback) {
  if (_idb) { callback(_idb); return; }
  var request = indexedDB.open(GALLERY_DB_NAME, GALLERY_DB_VERSION);
  request.onupgradeneeded = function (e) {
    var db = e.target.result;
    if (!db.objectStoreNames.contains(GALLERY_STORE)) {
      var store = db.createObjectStore(GALLERY_STORE, { keyPath: 'id' });
      store.createIndex('album', 'album', { unique: false });
      store.createIndex('order', 'order', { unique: false });
    }
  };
  request.onsuccess = function (e) {
    _idb = e.target.result;
    callback(_idb);
  };
  request.onerror = function () {
    console.warn('IndexedDB open failed, using memory only');
    callback(null);
  };
}

function idbGetAll(callback) {
  openDB(function (db) {
    if (!db) { callback([]); return; }
    var tx = db.transaction(GALLERY_STORE, 'readonly');
    var store = tx.objectStore(GALLERY_STORE);
    var req = store.getAll();
    req.onsuccess = function () { callback(req.result || []); };
    req.onerror = function () { callback([]); };
  });
}

function idbPut(photo, callback) {
  openDB(function (db) {
    if (!db) { if (callback) callback({ error: 'no_db' }); return; }
    var tx = db.transaction(GALLERY_STORE, 'readwrite');
    var store = tx.objectStore(GALLERY_STORE);
    var req = store.put(photo);
    req.onsuccess = function () { if (callback) callback({ success: true }); };
    req.onerror = function () { if (callback) callback({ error: 'write_failed' }); };
  });
}

function idbDelete(id, callback) {
  openDB(function (db) {
    if (!db) { if (callback) callback(); return; }
    var tx = db.transaction(GALLERY_STORE, 'readwrite');
    var store = tx.objectStore(GALLERY_STORE);
    store.delete(id);
    tx.oncomplete = function () { if (callback) callback(); };
  });
}

function idbClear(callback) {
  openDB(function (db) {
    if (!db) { if (callback) callback(); return; }
    var tx = db.transaction(GALLERY_STORE, 'readwrite');
    var store = tx.objectStore(GALLERY_STORE);
    store.clear();
    tx.oncomplete = function () { if (callback) callback(); };
  });
}

function idbPutMany(photos, callback) {
  openDB(function (db) {
    if (!db) { if (callback) callback(); return; }
    var tx = db.transaction(GALLERY_STORE, 'readwrite');
    var store = tx.objectStore(GALLERY_STORE);
    photos.forEach(function (p) { store.put(p); });
    tx.oncomplete = function () { if (callback) callback(); };
    tx.onerror = function () { if (callback) callback(); };
  });
}

// ============================
// Load: IndexedDB → fallback JSON → fallback localStorage (migration)
// ============================
function loadGalleryData(callback) {
  if (_galleryReady) {
    if (callback) callback(_galleryCache);
    return;
  }
  if (callback) _galleryCallbacks.push(callback);
  if (_galleryCallbacks.length > 1) return;

  idbGetAll(function (photos) {
    if (photos && photos.length > 0) {
      _galleryCache = photos;
      _galleryReady = true;
      _migrateFromLocalStorage(); // clean up old localStorage data
      _fireCallbacks();
      return;
    }

    // Check localStorage for legacy data to migrate
    var localData = null;
    try {
      var raw = localStorage.getItem('pmp_gallery');
      if (raw) localData = JSON.parse(raw);
    } catch (e) { /* ignore */ }

    if (localData && localData.length > 0) {
      // Migrate localStorage → IndexedDB
      _galleryCache = localData;
      idbPutMany(localData, function () {
        // Clean up localStorage after migration
        try { localStorage.removeItem('pmp_gallery'); } catch (e) { /* ignore */ }
        _galleryReady = true;
        _fireCallbacks();
      });
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
          // Save to IndexedDB
          idbPutMany(_galleryCache, function () {
            _galleryReady = true;
            _fireCallbacks();
          });
          return;
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
  });
}

function _migrateFromLocalStorage() {
  try {
    if (localStorage.getItem('pmp_gallery')) {
      localStorage.removeItem('pmp_gallery');
    }
  } catch (e) { /* ignore */ }
}

function _fireCallbacks() {
  var cbs = _galleryCallbacks.slice();
  _galleryCallbacks = [];
  cbs.forEach(function (cb) { cb(_galleryCache); });
}

// ============================
// Sync API (uses cache, writes to IndexedDB async)
// ============================
function getGallery() {
  return _galleryCache || [];
}

function saveGallery(photos) {
  _galleryCache = photos;
  // Write all to IndexedDB (async, non-blocking)
  idbClear(function () {
    idbPutMany(photos, function () { /* saved */ });
  });
  return { success: true };
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
  var photos = getGallery().slice(); // copy
  var idx = -1;
  for (var i = 0; i < photos.length; i++) { if (photos[i].id === photo.id) { idx = i; break; } }
  if (idx >= 0) photos[idx] = photo; else photos.push(photo);
  _galleryCache = photos;
  // Write single photo to IndexedDB (fast)
  idbPut(photo);
  return { success: true };
}

function deletePhoto(id) {
  _galleryCache = getGallery().filter(function (p) { return p.id !== id; });
  idbDelete(id);
}

function generatePhotoId() {
  return 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

function exportGalleryJSON() {
  return JSON.stringify(getGallery(), null, 2);
}

function resetToJSON() {
  _galleryCache = null;
  _galleryReady = false;
  idbClear(function () {
    // Also clean localStorage legacy
    try { localStorage.removeItem('pmp_gallery'); } catch (e) { /* ignore */ }
  });
}

// Get storage estimate
function getStorageEstimate(callback) {
  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(function (est) {
      callback({
        used: est.usage || 0,
        quota: est.quota || 0,
        photos: getGallery().length
      });
    }).catch(function () {
      callback({ used: 0, quota: 0, photos: getGallery().length });
    });
  } else {
    callback({ used: 0, quota: 0, photos: getGallery().length });
  }
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
  getStorageEstimate: getStorageEstimate,
  ALBUMS: GALLERY_ALBUMS,
  getAlbumsByPage: getAlbumsByPage
};
