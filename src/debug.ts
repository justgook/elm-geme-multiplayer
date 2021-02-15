import "./desktop.css"
import { iOS, initOverlay } from "./capabilities/ios"
import { initServiceWorker } from "./init/initServiceWorker"
import { initServer, tick } from "./init/initServer"
import { Debug } from "./connection/Debug"
import ElmFactory from "./Rpg/Client.elm"
import ElmServer from "./Rpg/Server.elm"
import { spawnClient } from "./init/multiClient"
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

spawnClient("game1", ElmFactory.Rpg.Client.init, connection.client())
spawnClient("game2", ElmFactory.Rpg.Client.init, connection.client())
spawnClient("game3", ElmFactory.Rpg.Client.init, connection.client())
spawnClient("game4", ElmFactory.Rpg.Client.init, connection.client())

// console.log("serverWorker", serverWorker)
// serverWorker.terminate()
