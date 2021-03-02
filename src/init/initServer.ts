import type { TransportServer } from "../transport/ConnectionInterface"
import { TransportEvent } from "../transport/ConnectionInterface"

import type { Game } from "../Game"

export type Options = Partial<Omit<ServerProps, "connection">> & Pick<ServerProps, "connection">
export const initServer = (app: Game.Server.App, options: Options): void => {
    const msgBuffer: Game.Server.Message[] = []
    const opt = { ...defaultProps, ...options }
    const { connection, tick, gameChannel } = opt

    connection.on(TransportEvent.join, (cnn: string) => msgBuffer.push([MessageId.networkJoin, cnn]))
    connection.on(TransportEvent.receive, (cnn, data) => msgBuffer.push([MessageId.networkReceive, cnn, data]))
    connection.on(TransportEvent.error, (error: string) => msgBuffer.push([MessageId.networkError, error]))
    connection.on(TransportEvent.leave, (cnn: string) => msgBuffer.push([MessageId.networkLeave, cnn]))

    app.ports.output.subscribe(connection.send)
    connection.connect(gameChannel)
    const gameLoop = () => {
        msgBuffer.push([MessageId.tick, performance.now()])
        app.ports.input.send(msgBuffer)
        msgBuffer.length = 0
        tick(gameLoop)
    }
    gameLoop()
}

const enum MessageId {
    tick = 100,
    networkJoin = 201,
    networkLeave = 202,
    networkReceive = 203,
    networkError = 204,
}

export interface ServerProps {
    gameChannel: string
    connection: TransportServer
    tick: (callback: (time: number) => void) => void
}

export const defaultProps: Omit<ServerProps, "connection"> = {
    gameChannel: "gameChannel-server",
    tick: window.requestAnimationFrame,
}
