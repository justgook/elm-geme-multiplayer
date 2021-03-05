import "./desktop.css"
import PlayerFactory from "./Durak/Player.elm"
import ServerFactory from "./Durak/Server.elm"
import { initServer } from "./init/initServer"
import { PeerJsClient, PeerJsServer } from "./transport/peerjs"
import { tick } from "./init/util"
import { initClient } from "./init/initClient"
import { spawnClient } from "./init/multiClient"

const peerjsSignalingUrl = import.meta.env.SNOWPACK_PUBLIC_PEERJS_URL

if (location.search.startsWith("?server=")) {
    // Server init
    createServer(new URL(location.href).searchParams.get("server") || "")
} else if (location.search.startsWith("?debug=")) {
    document.body.classList.add("debug")
    spawnClient("game1", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game1"))
    spawnClient("game2", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game2"))
    spawnClient("game3", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game3"))
    spawnClient("game4", PlayerFactory.Durak.Player.init, new PeerJsClient(peerjsSignalingUrl, "game4"))
} else {
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

    initClient(client, { server: createServer, transport: new PeerJsClient(peerjsSignalingUrl) })
}

function createServer(channel: string) {
    const serverApp = ServerFactory.Durak.Server.init()
    initServer(serverApp, {
        connection: new PeerJsServer(peerjsSignalingUrl),
        gameChannel: channel,
        tick: tick(30),
    })
}
