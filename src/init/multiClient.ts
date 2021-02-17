import { ClientProps, initClient, keyboardBind, Options } from "./initClient"
import type { TransportClient } from "../transport/ConnectionInterface"
import type { Game } from "../Game"

export function spawnClient(id: string, factory: typeof Game.Client.init, transport: TransportClient, options = {}): void {
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
                meta: {
                    dataUrl: "dataURL",
                    login: id,
                    password: `${id}_password`,
                },
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
        initClient(app, {
            ...options,
            transport: transport,
            resize,
            keyboard: keyboardBind(element),
            mouse,
        })
    }, 0)
}
