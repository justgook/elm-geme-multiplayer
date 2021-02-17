import type { ServerProps } from "./initServer"

export const tick = (fps: number): ServerProps["tick"] => {
    let lastTime = 0
    const frameDuration = 1000 / fps
    return (callback: (time: number) => void) => {
        const currTime = Date.now()
        const timeToCall = Math.max(0, frameDuration - (currTime - lastTime))
        setTimeout(() => callback(currTime + timeToCall), timeToCall)
        lastTime = currTime + timeToCall
    }
}
