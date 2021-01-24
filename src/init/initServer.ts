import type { ServerConnection } from "../connection/ConnectionInterface"
import { ConnectionEvent } from "../connection/ConnectionInterface"
import type Elm from "../Server.elm"

export type Options = Partial<Omit<ServerProps, "connection">> & Pick<ServerProps, "connection">
export const initServer = (app: Elm.Server.App, options: Options): void => {
    const msgBuffer: Message[] = []
    const opt = { ...defaultProps, ...options }
    const { connection, tick } = opt

    connection.on(ConnectionEvent.join, (cnn: string) => msgBuffer.push([MessageId.networkJoin, cnn]))
    connection.on(ConnectionEvent.receive, (cnn, data) => msgBuffer.push([MessageId.networkReceive, cnn, data]))
    connection.on(ConnectionEvent.error, (error: string) => msgBuffer.push([MessageId.networkError, error]))
    connection.on(ConnectionEvent.leave, (cnn: string) => msgBuffer.push([MessageId.networkLeave, cnn]))

    app.ports.output.subscribe(connection.send)

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

type Message =
    | [cmd: MessageId.tick, timestamp: number]
    // Network stuff
    | [cmd: MessageId.networkJoin, cnn: string]
    | [cmd: MessageId.networkLeave, cnn: string]
    | [cmd: MessageId.networkReceive, cnn: string, data: string]
    | [cmd: MessageId.networkError, data: string]

export interface ServerProps {
    gameChannel: string
    connection: ServerConnection
    tick: (callback: (time: number) => void) => void
}

export const defaultProps: Omit<ServerProps, "connection"> = {
    gameChannel: "gameChannel-server",
    tick: window.requestAnimationFrame,
}
