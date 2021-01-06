import { DummyClient } from "../connection/dummy"
import Elm from "../ClientTouch.elm"
import type { ClientConnection } from "../connection/connectionInterface"

export function initClient(props: ClientProps = defaultProps): Elm.ClientTouch.App {
    const { rAF, screen, gameDataUrl: dataUrl } = props
    const app = Elm.ClientTouch.init({
        flags: { screen, dataUrl },
    })
    rAF(gameLoop(app, props))
    return app
}

const gameLoop = (app: Elm.ClientTouch.App, { rAF, resize, keyBind, connection, gameChannel }: ClientProps) => {
    const msgBuffer: Message[] = []
    resize((w, h) => msgBuffer.push([MessageId.resize, w, h]))
    keyBind((isDown, key) => msgBuffer.push([MessageId.inputKey, isDown, key]))

    // const cnn = new connection(gameChannel, {
    //     // onSend: () => true,
    //     onJoin: () => msgBuffer.push([MessageId.networkJoin]),
    //     onReceive: (data: string) =>
    //         msgBuffer.push([MessageId.networkData, data]),
    //     onError: (error: string) =>
    //         msgBuffer.push([MessageId.networkError, error]),
    //     onLeave: () => msgBuffer.push([MessageId.networkLeave]),
    // })
    connection.connect(gameChannel)
    app.ports.output.subscribe(connection.send)

    const loop = () => {
        msgBuffer.push([MessageId.rAF, performance.now()])
        app.ports.input.send(msgBuffer)
        msgBuffer.length = 0
        rAF(loop)
    }
    return loop
}

const enum MessageId {
    rAF = 0,
    resize = 1,
    inputKey = 2,
    networkJoin = 3,
    networkLeave = 4,
    networkData = 5,
    networkError = 6,
}

type Message =
    | [cmd: MessageId.resize, width: number, height: number]
    | [cmd: MessageId.inputKey, isDown: boolean, key: Key]
    | [cmd: MessageId.rAF, timestamp: number]
    // Network stuff
    | [cmd: MessageId.networkJoin]
    | [cmd: MessageId.networkLeave]
    | [cmd: MessageId.networkData, data: string]
    | [cmd: MessageId.networkError, data: string]

export enum Key {
    North = 1,
    // NorthEast = 2,
    East = 3,
    // SouthEast = 4,
    South = 5,
    // SouthWest = 6,
    West = 7,
    // NorthWest = 8,
}

export interface ClientProps {
    gameChannel: string
    gameDataUrl: string // Data to load game it self
    connection: ClientConnection
    rAF: (callback: FrameRequestCallback) => number
    screen: { width: number; height: number }
    resize: (callback: (w: number, h: number) => void) => void
    keyBind: (callback: (isDown: boolean, key: Key) => void) => void
}

type KeyOf<T> = Extract<keyof T, string>

export const defaultProps: ClientProps = {
    gameChannel: "",
    gameDataUrl: "",
    connection: new DummyClient(),
    screen: { width: window.innerWidth, height: window.innerHeight },
    rAF: window.requestAnimationFrame,
    resize: (callback) => {
        window.addEventListener("resize", () => {
            callback(window.innerWidth, window.innerHeight)
        })
    },
    keyBind: (callback) => {
        window.addEventListener("keydown", (e) => {
            e.preventDefault()
            if (!e.repeat && e.code in keyboardMap) {
                callback(true, keyboardMap[e.code as KeyOf<typeof keyboardMap>])
            }
        })
        window.addEventListener("keyup", (e) => {
            e.preventDefault()
            if (e.code in keyboardMap) {
                callback(false, keyboardMap[e.code as KeyOf<typeof keyboardMap>])
            }
        })
    },
}

const keyboardMap = {
    KeyD: Key.East,
    KeyS: Key.South,
    KeyA: Key.West,
    KeyW: Key.North,
}
