export namespace Server {
    export interface App {
        ports: {
            // input: { send: (msg: Message[]) => void }
            send: {
                subscribe(handler: ([cnn, data]: [string, string]) => void): void
                unsubscribe(handler: ([cnn, data]: [string, string]) => void): void
            }
        }
    }

    export function init(options?: {
        node?: HTMLElement | null
        flags?: null
        // {
        //     screen: { width: number; height: number }
        //     dataUrl: string
        // }
    }): Server.App
}
