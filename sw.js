/**
 * AP Schools PWA - Offline Service Worker
 */
const CACHE_NAME = 'apschools-v1-optionc';
const ASSETS_TO_CACHE = [
  'index.html',
  'style.css',
  'js/app.js',
  'manifest.json',
  'assets/emblem.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
