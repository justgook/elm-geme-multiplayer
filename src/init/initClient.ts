import type { TransportClient } from "../transport/ConnectionInterface"
import { TransportEvent } from "../transport/ConnectionInterface"
import type { Game } from "../Game"
// import { keyboardBind } from "./util"

export const keyboardBind = (element: GlobalEventHandlers): ClientProps["keyboard"] => (callback) => {
    element.addEventListener("keydown", (e: KeyboardEvent) => {
        e.preventDefault()
        if (!e.repeat && e.code in keyboardMap) {
            callback(true, keyboardMap[e.code as KeyOf<typeof keyboardMap>])
        }
    })
    element.addEventListener("keyup", (e: KeyboardEvent) => {
        e.preventDefault()
        if (e.code in keyboardMap) {
            callback(false, keyboardMap[e.code as KeyOf<typeof keyboardMap>])
        }
    })
}

export type Options = Partial<Omit<ClientProps, "transport">> & Pick<ClientProps, "transport">

export function initClient(app: Game.Client.App, options: Options): void {
    const opt = { ...defaultProps, ...options }
    const { tick, resize, keyboard, mouse, touch, transport } = opt
    const msgBuffer: Game.Client.Message[] = []
    resize((w, h) => msgBuffer.push([MessageId.resize, w, h]))
    keyboard((isDown, key) => msgBuffer.push([MessageId.inputKeyboard, isDown, key]))
    mouse((...args) => msgBuffer.push([MessageId.inputMouse, ...args]))
    touch((touches) => msgBuffer.push([MessageId.inputTouch, touches]))

    transport.on(TransportEvent.join, () => msgBuffer.push([MessageId.networkJoin]))
    transport.on(TransportEvent.receive, (data) => msgBuffer.push([MessageId.networkReceive, data]))
    transport.on(TransportEvent.error, (error) => msgBuffer.push([MessageId.networkError, error]))
    transport.on(TransportEvent.leave, () => msgBuffer.push([MessageId.networkLeave]))

    app.ports.connect.subscribe((channel) => {
        console.log("Client::connect", channel)
    })
    app.ports.disconnect.subscribe((channel) => {
        console.log("Client::disconnect", channel)
    })
    app.ports.open.subscribe((channel) => {
        console.log("Client::StartServer", channel)
    })

    app.ports.output.subscribe(transport.send)
    // transport.connect(channel)
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

export interface ClientProps {
    transport: TransportClient
    tick: (callback: (time: number) => void) => void
    resize: (callback: (w: number, h: number) => void) => void
    keyboard: (callback: (isDown: boolean, key: number) => void) => void
    mouse: (callback: (x: number, y: number, key1: boolean, key2: boolean) => void) => void
    touch: (callback: (args: Game.Client.Touch[]) => void) => void
}

export type KeyOf<T> = Extract<keyof T, string>

export const defaultProps: Omit<ClientProps, "transport"> = {
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
    touch: (callback) => {
        const touchTracker = (e: TouchEvent) => {
            e.preventDefault()
            const { touches } = e
            const output: Game.Client.Touch[] = []
            for (let i = 0; i < touches.length; i++) {
                const { identifier, pageX, pageY } = touches[i]
                output.push([identifier, pageX, pageY])
            }
            callback(output)
        }

        document.addEventListener("touchstart", touchTracker, { passive: false })
        document.addEventListener("touchend", touchTracker, { passive: false })
        document.addEventListener("touchmove", touchTracker, { passive: false })
        document.addEventListener("touchcancel", touchTracker, { passive: false })
    },
    keyboard: keyboardBind(window),
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
