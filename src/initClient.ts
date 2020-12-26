// @ts-ignore
import Elm from "./ClientTouch.elm"

interface ElmApp {
    ports: { input: { send: (msg: Message[]) => void } }
}

export function initClient(props: StartProps = defaultProps) {
    const { rAF, screen } = props
    const app = Elm.ClientTouch.init({ flags: { screen } })
    rAF(gameLoop(app, props))
    return app
}

const gameLoop = (app: ElmApp, { rAF, resize, keyBind }: StartProps) => {
    const msgBuffer: Message[] = []
    resize((w, h) => msgBuffer.push([MessageId.resize, w, h]))
    keyBind((isDown, key) => msgBuffer.push([MessageId.inputKey, isDown, key]))
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
}

type Message =
    | [cmd: MessageId.resize, width: number, height: number]
    | [cmd: MessageId.inputKey, isDown: boolean, key: Key]
    | [cmd: MessageId.rAF, timestamp: number]

export enum Key {
    North = 1,
    NorthEast,
    East,
    SouthEast,
    South,
    SouthWest,
    West,
    NorthWest,
}

export interface StartProps {
    rAF: (callback: FrameRequestCallback) => number
    screen: { width: number; height: number }
    resize: (callback: (w: number, h: number) => void) => void
    keyBind: (callback: (isDown: boolean, key: Key) => void) => void
}

const defaultProps: StartProps = {
    screen: { width: window.innerWidth, height: window.innerHeight },
    rAF: window.requestAnimationFrame,
    resize: (callback) => {
        window.addEventListener("resize", (e) => {
            callback(window.innerWidth, window.innerHeight)
        })
    },
    keyBind: (callback) => {
        window.addEventListener("keydown", (e) => {
            e.preventDefault()
            const key = keyboardMap[e.code]
            if (!e.repeat && key) {
                callback(true, key)
            }
        })
        window.addEventListener("keyup", (e) => {
            e.preventDefault()
            const key = keyboardMap[e.code]
            if (key) {
                callback(false, key)
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
