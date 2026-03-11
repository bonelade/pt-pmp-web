/* ========================================
   PT PMP - Gallery / Photo Management
   Primary: Supabase (shared cloud database)
   Fallback: data/photos.json (static)
   ======================================== */

var GALLERY_JSON_URL = 'data/photos.json';
var _galleryCache = null;
var _galleryReady = false;
var _galleryCallbacks = [];

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
// Supabase Helpers
// ============================
function _supa() {
  return (typeof getSupabase === 'function') ? getSupabase() : null;
}

// ============================
// Load: Supabase first → fallback to photos.json
// ============================
function loadGalleryData(callback) {
  if (_galleryReady) {
    if (callback) callback(_galleryCache);
    return;
  }
  if (callback) _galleryCallbacks.push(callback);
  if (_galleryCallbacks.length > 1) return;

  var sb = _supa();
  if (sb) {
    // Try Supabase first
    sb.from('photos').select('*').order('order', { ascending: true })
      .then(function (res) {
        if (res.data && res.data.length > 0) {
          _galleryCache = res.data;
          _galleryReady = true;
          _fireCallbacks();
        } else {
          // Supabase empty or error — try JSON fallback then seed Supabase
          _loadFromJSON(function (photos) {
            if (photos.length > 0 && sb) {
              // Auto-seed Supabase with JSON data
              sb.from('photos').upsert(photos).then(function () {
                console.log('Supabase seeded with photos.json data');
              });
            }
          });
        }
      })
      .catch(function (err) {
        console.warn('Supabase fetch failed, using JSON fallback:', err);
        _loadFromJSON();
      });
  } else {
    // No Supabase client available — use JSON
    _loadFromJSON();
  }
}

function _loadFromJSON(onDone) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', GALLERY_JSON_URL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    if (xhr.status === 200 || xhr.status === 0) {
      try {
        _galleryCache = JSON.parse(xhr.responseText);
      } catch (e) {
        _galleryCache = [];
      }
    } else {
      _galleryCache = [];
    }
    _galleryReady = true;
    _fireCallbacks();
    if (onDone) onDone(_galleryCache);
  };
  xhr.send();
}

function _fireCallbacks() {
  var cbs = _galleryCallbacks.slice();
  _galleryCallbacks = [];
  cbs.forEach(function (cb) { cb(_galleryCache); });
}

// ============================
// Read API (from cache)
// ============================
function getGallery() {
  return _galleryCache || [];
}

function getPhotosByAlbum(album) {
  return getGallery().filter(function (p) { return p.album === album; })
    .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
}

function getPhotosByPage(pageName) {
  var albumKeys = [];
  for (var key in GALLERY_ALBUMS) {
    if (GALLERY_ALBUMS[key].page === pageName) albumKeys.push(key);
  }
  return getGallery().filter(function (p) { return albumKeys.indexOf(p.album) !== -1; })
    .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
}

// ============================
// Write API (cache + Supabase)
// ============================
function upsertPhoto(photo, callback) {
  // Update local cache immediately
  var photos = getGallery().slice();
  var idx = -1;
  for (var i = 0; i < photos.length; i++) {
    if (photos[i].id === photo.id) { idx = i; break; }
  }
  if (idx >= 0) photos[idx] = photo; else photos.push(photo);
  _galleryCache = photos;

  // Write to Supabase
  var sb = _supa();
  if (sb) {
    var row = {
      id: photo.id,
      album: photo.album,
      caption_id: photo.caption_id || '',
      caption_en: photo.caption_en || '',
      src: photo.src,
      order: photo.order || 0,
      type: photo.type || null,
      updated_at: new Date().toISOString()
    };
    sb.from('photos').upsert(row).then(function (res) {
      if (res.error) {
        console.error('Supabase upsert error:', res.error);
        if (callback) callback({ error: res.error.message });
      } else {
        if (callback) callback({ success: true });
      }
    });
  } else {
    if (callback) callback({ success: true });
  }
  return { success: true };
}

function deletePhoto(id, callback) {
  // Get photo info before deleting (to clean up storage)
  var photo = null;
  var photos = getGallery();
  for (var i = 0; i < photos.length; i++) {
    if (photos[i].id === id) { photo = photos[i]; break; }
  }

  // Remove from cache
  _galleryCache = photos.filter(function (p) { return p.id !== id; });

  var sb = _supa();
  if (sb) {
    // Delete from Supabase database
    sb.from('photos').delete().eq('id', id).then(function (res) {
      if (res.error) console.error('Supabase delete error:', res.error);
      if (callback) callback();
    });

    // If src is a Supabase Storage URL, also delete the file
    if (photo && photo.src && photo.src.indexOf('/storage/v1/object/public/gallery/') !== -1) {
      var filePath = photo.src.split('/storage/v1/object/public/gallery/')[1];
      if (filePath) {
        sb.storage.from('gallery').remove([decodeURIComponent(filePath)]).then(function (res) {
          if (res.error) console.warn('Storage cleanup error:', res.error);
        });
      }
    }
  } else {
    if (callback) callback();
  }
}

function saveGallery(photos, callback) {
  _galleryCache = photos;
  var sb = _supa();
  if (sb) {
    sb.from('photos').upsert(photos.map(function (p) {
      return {
        id: p.id, album: p.album,
        caption_id: p.caption_id || '', caption_en: p.caption_en || '',
        src: p.src, order: p.order || 0,
        type: p.type || null, updated_at: new Date().toISOString()
      };
    })).then(function (res) {
      if (res.error) console.error('Supabase saveGallery error:', res.error);
      if (callback) callback({ success: !res.error });
    });
  } else {
    if (callback) callback({ success: true });
  }
  return { success: true };
}

// ============================
// Upload to Supabase Storage
// ============================
function uploadToStorage(file, album, callback) {
  var sb = _supa();
  if (!sb) {
    callback({ error: 'Supabase not available' });
    return;
  }

  var ext = file.name ? file.name.split('.').pop().toLowerCase() : 'jpg';
  var fileName = album + '/' + Date.now() + '-' + Math.random().toString(36).substr(2, 5) + '.' + ext;

  sb.storage.from('gallery').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'image/jpeg'
  }).then(function (res) {
    if (res.error) {
      callback({ error: res.error.message });
    } else {
      var publicUrl = getStoragePublicUrl(fileName);
      callback({ success: true, url: publicUrl, path: fileName });
    }
  });
}

// Upload from base64/dataURL
function uploadBase64ToStorage(dataUrl, album, callback) {
  var sb = _supa();
  if (!sb) {
    callback({ error: 'Supabase not available' });
    return;
  }

  // Convert data URL to Blob
  var parts = dataUrl.split(',');
  var mime = parts[0].match(/:(.*?);/)[1];
  var ext = mime.split('/')[1] === 'jpeg' ? 'jpg' : mime.split('/')[1];
  var bstr = atob(parts[1]);
  var arr = new Uint8Array(bstr.length);
  for (var i = 0; i < bstr.length; i++) arr[i] = bstr.charCodeAt(i);
  var blob = new Blob([arr], { type: mime });

  var fileName = album + '/' + Date.now() + '-' + Math.random().toString(36).substr(2, 5) + '.' + ext;

  sb.storage.from('gallery').upload(fileName, blob, {
    cacheControl: '3600',
    upsert: false,
    contentType: mime
  }).then(function (res) {
    if (res.error) {
      callback({ error: res.error.message });
    } else {
      var publicUrl = getStoragePublicUrl(fileName);
      callback({ success: true, url: publicUrl, path: fileName });
    }
  });
}

// ============================
// Utilities
// ============================
function generatePhotoId() {
  return 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5);
}

function exportGalleryJSON() {
  return JSON.stringify(getGallery(), null, 2);
}

function resetToJSON() {
  _galleryCache = null;
  _galleryReady = false;
  var sb = _supa();
  if (sb) {
    // Delete all from Supabase, then reload from JSON
    sb.from('photos').delete().neq('id', '').then(function () {
      loadGalleryData();
    });
  }
}

function getStorageEstimate(callback) {
  var sb = _supa();
  if (sb) {
    sb.storage.from('gallery').list('', { limit: 1000 }).then(function (res) {
      var fileCount = (res.data || []).length;
      callback({ used: 0, quota: 1073741824, photos: getGallery().length, files: fileCount, source: 'supabase' });
    }).catch(function () {
      callback({ used: 0, quota: 0, photos: getGallery().length, source: 'unknown' });
    });
  } else {
    callback({ used: 0, quota: 0, photos: getGallery().length, source: 'json' });
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
  uploadToStorage: uploadToStorage,
  uploadBase64ToStorage: uploadBase64ToStorage,
  ALBUMS: GALLERY_ALBUMS,
  getAlbumsByPage: getAlbumsByPage
};
