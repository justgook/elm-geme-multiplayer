import "./desktop.css"
import { iOS, initOverlay } from "./capabilities/ios"
import { initClient } from "./initClient"
import { initServiceWorker } from "./initServiceWorker"

initServiceWorker()
if (iOS()) {
    // console.log("im ios")
    initOverlay()
} else {
    // console.log("im great browser")
}

const app = initClient()

const serverWorker = new Worker("worker/server.js", {
    name: "server-web-worker",
    // type: import.meta.env.MODE === "development" ? "module" : "classic",
    type: "module",
})

// console.log("serverWorker", serverWorker)
// serverWorker.terminate()
