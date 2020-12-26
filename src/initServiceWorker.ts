export function initServiceWorker() {
    if ("serviceWorker" in navigator) {
        // navigator.serviceWorker.ready.then(function (swRegistration) {
        //     return swRegistration.sync.register("myFirstSync")
        // })

        // navigator.serviceWorker.ready.then((registration) => {
        //     registration.periodicSync.getTags().then((tags) => {
        //         console.log("registered periodic sync", tags)
        //         // if (tags.includes('get-latest-news'))
        //         //     skipDownloadingLatestNewsOnPageLoad();
        //     })
        // })

        window.addEventListener("load", async () => {
            try {
                const registration = await navigator.serviceWorker.register(
                    "/service-worker.js"
                )
                // Registration was successful
                console.log(
                    "ServiceWorker registration successful with scope: ",
                    registration.scope
                )
            } catch (err) {
                console.log("ServiceWorker registration failed: ", err)
            }
        })
    }

    // Works only in Installed PWA
    // async function registerPeriodicNewsCheck() {
    //     const registration = await navigator.serviceWorker.ready
    //     try {
    //         await registration.periodicSync.register("fetch-news", {
    //             minInterval: 24 * 60 * 60 * 1000,
    //         })
    //     } catch (err) {
    //         console.log("Periodic Sync could not be registered!", err)
    //     }
    // }
    //
    // Notification.requestPermission(function (status) {
    //     console.log("Notification permission status:", status)
    // })
}
