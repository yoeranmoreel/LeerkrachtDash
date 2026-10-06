// ATLAS development service worker placeholder.
// Offline precaching is intentionally disabled while the toolbox is under active development.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",event=>event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("atlas-")).map(k=>caches.delete(k)))).then(()=>self.registration.unregister())
));