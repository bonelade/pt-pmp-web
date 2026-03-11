/* ========================================
   PT PMP - Gallery / Photo localStorage CRUD
   ======================================== */

const GALLERY_KEY = 'pmp_gallery';

// albums: array of { id, album, caption_id, caption_en, src, order }
// album: 'hero' | 'facility' | 'team' | 'activity'

function getGallery() {
  try {
    const data = localStorage.getItem(GALLERY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) { return []; }
}

function saveGallery(photos) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(photos));
}

function getPhotosByAlbum(album) {
  return getGallery().filter(p => p.album === album).sort((a,b) => (a.order||0)-(b.order||0));
}

function upsertPhoto(photo) {
  const photos = getGallery();
  const idx = photos.findIndex(p => p.id === photo.id);
  if (idx >= 0) photos[idx] = photo; else photos.push(photo);
  saveGallery(photos);
}

function deletePhoto(id) {
  saveGallery(getGallery().filter(p => p.id !== id));
}

function generatePhotoId() {
  return 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2,5);
}

window.GalleryDB = { getGallery, saveGallery, getPhotosByAlbum, upsertPhoto, deletePhoto, generatePhotoId };
