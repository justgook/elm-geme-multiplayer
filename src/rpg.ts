import "./desktop.css"
import { iOS, initOverlay } from "./capabilities/ios"
import { initServiceWorker } from "./init/initServiceWorker"
import { initServer } from "./init/initServer"
import { Debug } from "./transport/Debug"
import ElmFactory from "./Rpg/Client.elm"
import ElmServer from "./Rpg/Server.elm"
import { spawnClient } from "./init/multiClient"
import { tick } from "./init/util"
// import { PeerJsClient, PeerJsServer } from "./connection/peerjs"

initServiceWorker()
if (iOS()) {
    // console.log("im ios")
    initOverlay()
} else {
    // console.log("im great browser")
}

const connection = new Debug()

// Server init
const serverApp = ElmServer.Rpg.Server.init()
initServer(serverApp, {
    connection: connection.server,
    tick: tick(10),
})

document.body.classList.add("debug")
spawnClient("game1", ElmFactory.Rpg.Client.init, connection.client())
spawnClient("game2", ElmFactory.Rpg.Client.init, connection.client())
spawnClient("game3", ElmFactory.Rpg.Client.init, connection.client())
spawnClient("game4", ElmFactory.Rpg.Client.init, connection.client())

// console.log("serverWorker", serverWorker)
// serverWorker.terminate()
