export namespace ClientDebug {
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
            login?: string
            password?: string
        }
    }): ClientDebug.App
}
