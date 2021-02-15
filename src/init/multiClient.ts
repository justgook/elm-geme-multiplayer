import { ClientProps, initClient, keyboardMap, KeyOf, Options } from "./initClient"
import type { ClientConnection } from "../connection/ConnectionInterface"
import type { Game } from "../Game"

export function spawnClient(id: string, factory: typeof Game.Client.init, connection: ClientConnection, options = {}): void {
    const element = document.createElement("div")
    element.id = `${id}`
    element.tabIndex = -1
    const aaa = element.appendChild(document.createElement("div"))
    aaa.append(document.createElement("canvas"))
    document.body.appendChild(element)
    // autofocus
    element.addEventListener("mouseenter", () => element.focus())
    setTimeout(() => {
        const { width, height } = element.getBoundingClientRect()
        const app = factory({
            flags: {
                screen: { width, height },
                dataUrl: "dataURL",
                login: id,
                password: `${id}_password`,
            },
            node: element.firstChild as HTMLElement,
        })

        const resize: Options["resize"] = (callback) => {
            window.addEventListener("resize", () => {
                const { width, height } = element.getBoundingClientRect()
                callback(width, height)
            })
        }
        const mouse: ClientProps["mouse"] = (callback) => {
            const mouseTracker = (e: MouseEvent) => {
                if (element === document.activeElement) {
                    e.preventDefault()
                    callback(e.offsetX, e.offsetY, e.buttons === 1, e.buttons === 2)
                }
            }
            element.addEventListener("mousemove", mouseTracker)
            element.addEventListener("mousedown", mouseTracker)
            element.addEventListener("mouseup", mouseTracker)
            element.addEventListener("contextmenu", mouseTracker)
        }
        const keyBind: ClientProps["keyboard"] = (callback) => {
            element.addEventListener("keydown", (e) => {
                e.preventDefault()
                if (!e.repeat && e.code in keyboardMap) {
                    callback(true, keyboardMap[e.code as KeyOf<typeof keyboardMap>])
                }
            })
            element.addEventListener("keyup", (e) => {
                e.preventDefault()
                if (e.code in keyboardMap) {
                    callback(false, keyboardMap[e.code as KeyOf<typeof keyboardMap>])
                }
            })
        }
        initClient(app, { ...options, connection: connection, resize, keyboard: keyBind, mouse })
    }, 0)
}
