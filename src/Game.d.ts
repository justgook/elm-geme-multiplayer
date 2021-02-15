export namespace Game {
    export namespace Client {
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
                meta?: unknown
            }
        }): Client.App
    }
    export namespace Server {
        export interface App {
            ports: {
                input: { send: (msg: Message[]) => void }
                output: {
                    subscribe(handler: (args: [cnn: string, data: string]) => void): void
                    unsubscribe(handler: (data: string) => void): void
                }
            }
        }

        export function init(options?: { node?: HTMLElement | null; flags?: null }): Server.App
    }
}
