import "./desktop.css"
import PlayerFactory from "./Durak/Player.elm"
import ServerFactory from "./Durak/Server.elm"
import { initServer } from "./init/initServer"
import { PeerJsClient, PeerJsServer } from "./transport/peerjs"
import { tick } from "./init/util"
import { initClient } from "./init/initClient"
import { spawnClient } from "./init/multiClient"

const peerjsSignalingUrl = import.meta.env.SNOWPACK_PUBLIC_PEERJS_URL
const channel = "justgook-durak"

// Server init
if (location.search === "") {
    const serverApp = ServerFactory.Durak.Server.init()
    initServer(serverApp, {
        connection: new PeerJsServer(peerjsSignalingUrl),
        gameChannel: channel,
        tick: tick(30),
    })
} else if (location.search.startsWith("?client=")) {
    const client = PlayerFactory.Durak.Player.init({
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
} else if (location.search.startsWith("?debug=")) {
    document.body.classList.add("debug")
    spawnClient("game2", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game2"))
    spawnClient("game1", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game1"))
    spawnClient("game3", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game3"))
    spawnClient("game4", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game4"))
}
