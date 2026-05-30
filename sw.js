// ===========================
// SERVICE WORKER - DADAN CELL
// Fungsi: supaya app bisa dibuka
// walau tidak ada internet
// ===========================

const CACHE_NAME = 'dadan-cell-v3';

// File yang disimpan di cache (offline)
const FILES_TO_CACHE = [
  '/DADAN-CELL/',
  '/DADAN-CELL/index.html',
  '/DADAN-CELL/style.css',
  '/DADAN-CELL/script.js',
  '/DADAN-CELL/logo.png',
  '/DADAN-CELL/manifest.json'
];

// ===========================
// INSTALL — simpan file ke cache
// ===========================
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('DADAN CELL: menyimpan file ke cache...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ===========================
// ACTIVATE — hapus cache lama
// ===========================
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== CACHE_NAME) {
            console.log('DADAN CELL: hapus cache lama', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ===========================
// FETCH — ambil dari cache jika offline
// ===========================
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Kalau ada di cache, pakai cache
      if (response) {
        return response;
      }
      // Kalau tidak ada, ambil dari internet
      return fetch(event.request);
    })
  );
});
