import "./desktop.css"
import PlayerFactory from "./Durak/Player.elm"
import ServerFactory from "./Durak/Server.elm"
import { spawnClient } from "./init/multiClient"
import { initServer, tick } from "./init/initServer"
import { PeerJsClient, PeerJsServer } from "./connection/peerjs"

const url = import.meta.env.SNOWPACK_PUBLIC_PEERJS_URL
// const url = "https://peer-js-server.glitch.me/"
// const url = "https://peerjs.z0.lv/"
const connection = {
    server: new PeerJsServer(url),
    client: () => new PeerJsClient(url),
}
const gameChannel = "justgook-durak"
// Server init
if (location.search === "") {
    const serverApp = ServerFactory.Durak.Server.init()
    initServer(serverApp, {
        connection: connection.server,
        gameChannel: gameChannel,
        tick: tick(30),
    })
}

// Init Clients

// spawnClient("game1", SpectatorFactory.Durak.Spectator.init, connection.client())
spawnClient("game2", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
// spawnClient("game3", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
// spawnClient("game4", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
// spawnClient("game5", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
// spawnClient("game6", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
// spawnClient("game7", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
// spawnClient("game8", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
// spawnClient("game9", PlayerFactory.Durak.Player.init, connection.client(), { gameChannel })
