import "./desktop.css"
import { iOS, initOverlay } from "./capabilities/ios"
import { initServiceWorker } from "./init/initServiceWorker"
import { initServer } from "./init/initServer"
import PlayerFactory from "./Rpg/Client.elm"
import ServerFactory from "./Rpg/Server.elm"
import { spawnClient } from "./init/multiClient"
import { tick } from "./init/util"

import { PeerJsClient, PeerJsServer } from "./transport/peerjs"
import { initClient } from "./init/initClient"
// import { PeerJsClient, PeerJsServer } from "./connection/peerjs"

initServiceWorker()
if (iOS()) {
    // console.log("im ios")
    initOverlay()
} else {
    // console.log("im great browser")
}

// -----
const peerjsSignalingUrl = import.meta.env.SNOWPACK_PUBLIC_PEERJS_URL
const channel = "justgook-durak"

// const connection = new Debug()

// Server init
// const serverApp = ElmServer.Rpg.Server.init()
// initServer(serverApp, {
//     connection: connection.server,
//     tick: tick(10),
// })
if (location.search.startsWith("?server=")) {
    const serverApp = ServerFactory.Rpg.Server.init()
    initServer(serverApp, {
        connection: new PeerJsServer(peerjsSignalingUrl),
        gameChannel: channel,
        tick: tick(10),
    })
}

const client = PlayerFactory.Rpg.Client.init({
    flags: {
        screen: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
        meta: {},
    },
    node: document.body.appendChild(document.createElement("div")),
})

initClient(client, { transport: new PeerJsClient(peerjsSignalingUrl) })
if (location.search.startsWith("?debug=")) {
    document.body.classList.add("debug")
    spawnClient("game1", PlayerFactory.Rpg.Client.init, new PeerJsClient(peerjsSignalingUrl, "game1"))
    spawnClient("game2", PlayerFactory.Rpg.Client.init, new PeerJsClient(peerjsSignalingUrl, "game2"))
    spawnClient("game3", PlayerFactory.Rpg.Client.init, new PeerJsClient(peerjsSignalingUrl, "game3"))
    spawnClient("game4", PlayerFactory.Rpg.Client.init, new PeerJsClient(peerjsSignalingUrl, "game4"))
}
// console.log("serverWorker", serverWorker)
// serverWorker.terminate()
