export namespace ClientTouch {
    export interface App {
        ports: {
            input: { send: (msg: Message[]) => void }
            output: {
                subscribe(handler: (data: string) => void): void
                unsubscribe(handler: (data: string) => void): void
            }
        }
    }
    export function init(options: {
        node?: HTMLElement | null
        flags: {
            screen: { width: number; height: number }
            dataUrl: string
        }
    }): ClientTouch.App
}
