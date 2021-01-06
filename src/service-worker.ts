export {}
declare const self: ServiceWorkerGlobalScope

// https://serviceworke.rs/immediate-claim_service-worker_doc.html
// https://googlechrome.github.io/samples/service-worker/custom-offline-page/
const version = "{{ version }}"

const CACHE_NAME = "offline"
const OFFLINE_URL = "offline.html"

self.addEventListener("install", (event) => {
    console.log("[ServiceWorker] Installed version", version)
    // console.log("[ServiceWorker] Skip waiting on install")
    console.log("caches", caches)
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME)
            // Setting {cache: 'reload'} in the new request will ensure that the response
            // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
            await cache.add(new Request(OFFLINE_URL, { cache: "reload" }))
        })(),
    )
    return self.skipWaiting()
})

self.addEventListener("activate", function (event) {
    self.clients.matchAll({ includeUncontrolled: true }).then(function (clientList) {
        const urls = clientList.map(function (client) {
            return client.url
        })
        console.log("[ServiceWorker] Matching clients:", urls.join(", "))
    })
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ("navigationPreload" in self.registration) {
                await self.registration.navigationPreload.enable()
            }
        })(),
    )
    // Tell the active service worker to take control of the page immediately.
    self.clients.claim()
})

self.addEventListener("fetch", (event) => {
    // console.log("[ServiceWorker]::fetch", event)
    if (event.request.mode === "navigate") {
        return event.respondWith(
            fetch(event.request)
                .catch(() => caches.match(OFFLINE_URL))
                .then(),
        )
    }
    // event.respondWith(
    //     (async () => {
    //         try {
    //             // Respond from the cache if we can
    //             const cachedResponse = await caches.match(event.request)
    //             if (cachedResponse) return cachedResponse
    //
    //             // Else, use the preloaded response, if it's there
    //             const response = await event.preloadResponse
    //             if (response) return response
    //
    //             // Else try the network.
    //             return fetch(event.request)
    //         } catch (error) {
    //             // catch is only triggered if an exception is thrown, which is likely
    //             // due to a network error.
    //             // If fetch() returns a valid HTTP response with a response code in
    //             // the 4xx or 5xx range, the catch() will NOT be called.
    //             console.log(
    //                 "Fetch failed; returning offline page instead.",
    //                 error
    //             )
    //             const cache = await caches.open(CACHE_NAME)
    //             const cachedResponse = await cache.match(OFFLINE_URL)
    //             return cachedResponse
    //         }
    //     })()
    // )
})

self.addEventListener("sync", function (event) {
    console.log("[ServiceWorker]::sync", event)
})

self.addEventListener("push", function (event) {
    console.log("[ServiceWorker]::push", event)
})

// self.addEventListener("periodicsync", function (event: SyncEvent) {
//     console.log("[ServiceWorker]::periodicsync", event)
// })
