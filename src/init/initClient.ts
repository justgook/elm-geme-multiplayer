import type { ClientConnection } from "../connection/ConnectionInterface"
import { ConnectionEvent } from "../connection/ConnectionInterface"
import type { Game } from "../Game"

export type Options = Partial<Omit<ClientProps, "connection">> & Pick<ClientProps, "connection">

export function initClient(app: Game.Client.App, options: Options): void {
    const opt = { ...defaultProps, ...options }
    const { tick, resize, keyboard, mouse, connection, gameChannel } = opt
    const msgBuffer: Message[] = []
    resize((w, h) => msgBuffer.push([MessageId.resize, w, h]))
    keyboard((isDown, key) => msgBuffer.push([MessageId.inputKeyboard, isDown, key]))
    mouse((...args) => msgBuffer.push([MessageId.inputMouse, ...args]))

    connection.on(ConnectionEvent.join, () => msgBuffer.push([MessageId.networkJoin]))
    connection.on(ConnectionEvent.receive, (data) => msgBuffer.push([MessageId.networkReceive, data]))
    connection.on(ConnectionEvent.error, (error) => msgBuffer.push([MessageId.networkError, error]))
    connection.on(ConnectionEvent.leave, () => msgBuffer.push([MessageId.networkLeave]))
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
    resize = 101,
    inputKeyboard = 102,
    inputMouse = 103,
    inputTouch = 104,
    networkJoin = 201,
    networkLeave = 202,
    networkReceive = 203,
    networkError = 204,
}

type Message =
    | [cmd: MessageId.tick, timestamp: number]
    | [cmd: MessageId.resize, width: number, height: number]
    | [cmd: MessageId.inputKeyboard, isDown: boolean, key: number]
    | [cmd: MessageId.inputMouse, x: number, y: number, key1: boolean, key2: boolean]
    | [cmd: MessageId.inputTouch, x: number, y: number, isDown: boolean]
    // Network stuff
    | [cmd: MessageId.networkJoin]
    | [cmd: MessageId.networkLeave]
    | [cmd: MessageId.networkReceive, data: string]
    | [cmd: MessageId.networkError, data: string]

// const ClientProps = Partial<Omit<ClientProps, "connection">> & Pick<ClientProps, "connection">

export interface ClientProps {
    gameChannel: string
    connection: ClientConnection
    tick: (callback: (time: number) => void) => void
    resize: (callback: (w: number, h: number) => void) => void
    keyboard: (callback: (isDown: boolean, key: number) => void) => void
    mouse: (callback: (x: number, y: number, key1: boolean, key2: boolean) => void) => void
    // touch: (callback: (isDown: boolean, key: Key) => void) => void
}

export type KeyOf<T> = Extract<keyof T, string>

export const defaultProps: Omit<ClientProps, "connection"> = {
    gameChannel: "gameChannel-client",
    tick: window.requestAnimationFrame,
    resize: (callback) => {
        window.addEventListener("resize", () => {
            callback(window.innerWidth, window.innerHeight)
        })
    },
    mouse: (callback) => {
        const mouseTracker = (e: MouseEvent) => {
            e.preventDefault()
            callback(e.offsetX, e.offsetY, e.buttons === 1, e.buttons === 2)
        }
        document.addEventListener("mousemove", mouseTracker)
        document.addEventListener("mousedown", mouseTracker)
        document.addEventListener("mouseup", mouseTracker)
        document.addEventListener("contextmenu", mouseTracker)
    },
    keyboard: (callback) => {
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

export const keyboardMap = {
    ArrowDown: 0,
    ArrowLeft: 1,
    ArrowRight: 2,
    ArrowUp: 3,
    Backslash: 4,
    Backspace: 5,
    BracketLeft: 6,
    BracketRight: 7,
    Comma: 8,
    Digit0: 9,
    Digit1: 10,
    Digit2: 11,
    Digit3: 12,
    Digit4: 13,
    Digit5: 14,
    Digit6: 15,
    Digit7: 16,
    Digit8: 17,
    Digit9: 18,
    Enter: 19,
    Equal: 20,
    IntlBackslash: 21,
    KeyA: 22,
    KeyB: 23,
    KeyC: 24,
    KeyD: 25,
    KeyE: 26,
    KeyF: 27,
    KeyG: 28,
    KeyH: 29,
    KeyI: 30,
    KeyJ: 31,
    KeyK: 32,
    KeyL: 33,
    KeyM: 34,
    KeyN: 35,
    KeyO: 36,
    KeyP: 37,
    KeyQ: 38,
    KeyR: 39,
    KeyS: 40,
    KeyT: 41,
    KeyU: 42,
    KeyV: 43,
    KeyW: 44,
    KeyX: 45,
    KeyY: 46,
    KeyZ: 47,
    Minus: 48,
    Period: 49,
    Quote: 50,
    Semicolon: 51,
    Slash: 52,
    Space: 53,
    Tab: 54,
}
