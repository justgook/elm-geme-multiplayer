import "./desktop.css"
import { iOS, initOverlay } from "./capabilities/ios"
import { initServiceWorker } from "./init/initServiceWorker"
import { initClient } from "./init/initClient"
import { initServer } from "./init/initServer"

initServiceWorker()
if (iOS()) {
    // console.log("im ios")
    initOverlay()
} else {
    // console.log("im great browser")
}

const app = initClient()
console.log(app)
const serverWorker = initServer()
console.log(serverWorker)
// console.log("serverWorker", serverWorker)
// serverWorker.terminate()
