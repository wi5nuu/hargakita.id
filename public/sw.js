// Minimal Service Worker to trigger PWA Install Prompt in Chrome/Android
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // An empty fetch handler is the minimum requirement for PWA installability
});
