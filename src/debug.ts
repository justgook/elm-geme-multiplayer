import "./desktop.css"
import { iOS, initOverlay } from "./capabilities/ios"
import { initServiceWorker } from "./init/initServiceWorker"
import { ClientProps, initClient, keyboardMap, KeyOf, Options } from "./init/initClient"
import { initServer } from "./init/initServer"
import { Debug } from "./connection/Debug"
import ElmClient from "./ClientDebug.elm"
import ElmServer from "./Server.elm"

initServiceWorker()
if (iOS()) {
    // console.log("im ios")
    initOverlay()
} else {
    // console.log("im great browser")
}

const connection = new Debug()

// Server init
const serverApp = ElmServer.Server.init()
initServer(serverApp, {
    connection: connection.server,
    tick: (() => {
        let lastTime = 0
        const frameDuration = 1000 / 60
        return (callback: (time: number) => void) => {
            const currTime = Date.now()
            const timeToCall = Math.max(0, frameDuration - (currTime - lastTime))
            setTimeout(() => callback(currTime + timeToCall), timeToCall)
            lastTime = currTime + timeToCall
        }
    })(),
})

// Client init
function spawnClient(id: string) {
    const element = document.querySelector(`#${id}`) as HTMLElement
    const { width, height } = element.getBoundingClientRect()
    const app = ElmClient.ClientDebug.init({
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
    initClient(app, { connection: connection.client(), resize, keyboard: keyBind, mouse })
}

spawnClient("game1")
spawnClient("game2")
spawnClient("game3")
spawnClient("game4")

// console.log("serverWorker", serverWorker)
// serverWorker.terminate()
