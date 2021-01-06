const version = "{{ version }}";
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";
self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Installed version", version);
  console.log("caches", caches);
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, {cache: "reload"}));
  })());
  return self.skipWaiting();
});
self.addEventListener("activate", function(event) {
  self.clients.matchAll({includeUncontrolled: true}).then(function(clientList) {
    const urls = clientList.map(function(client) {
      return client.url;
    });
    console.log("[ServiceWorker] Matching clients:", urls.join(", "));
  });
  event.waitUntil((async () => {
    if ("navigationPreload" in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    return event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_URL)).then());
  }
});
self.addEventListener("sync", function(event) {
  console.log("[ServiceWorker]::sync", event);
});
self.addEventListener("push", function(event) {
  console.log("[ServiceWorker]::push", event);
});
