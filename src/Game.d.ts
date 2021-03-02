export namespace Game {
    export namespace Client {
        interface PortOut {
            subscribe(handler: (data: string) => void): void

            unsubscribe(handler: (data: string) => void): void
        }

        export interface App {
            ports: {
                input: { send: (msg: Message[]) => void }
                output: PortOut
                open: PortOut
                connect: PortOut
                disconnect: PortOut
            }
        }

        export function init(options: {
            node?: HTMLElement | null
            flags: {
                screen: { width: number; height: number }
                meta?: unknown
            }
        }): Client.App

        export type Message =
            | [cmd: MessageId.tick, timestamp: number]
            | [cmd: MessageId.resize, width: number, height: number]
            | [cmd: MessageId.inputKeyboard, isDown: boolean, key: number]
            | [cmd: MessageId.inputMouse, x: number, y: number, key1: boolean, key2: boolean]
            | [cmd: MessageId.inputTouch, touches: Touch[]]
            // Network stuff
            | [cmd: MessageId.networkJoin]
            | [cmd: MessageId.networkLeave]
            | [cmd: MessageId.networkReceive, data: string]
            | [cmd: MessageId.networkError, data: string]

        export type Touch = [identifier: number, x: number, y: number]
    }
    export namespace Server {
        export interface App {
            ports: {
                input: { send: (msg: Message[]) => void }
                output: NetworkOut
            }
        }

        export function init(options?: { node?: HTMLElement | null; flags?: unknown }): Server.App

        export type Message =
            | [cmd: MessageId.tick, timestamp: number]
            // Network stuff
            | [cmd: MessageId.networkJoin, cnn: string]
            | [cmd: MessageId.networkLeave, cnn: string]
            | [cmd: MessageId.networkReceive, cnn: string, data: string]
            | [cmd: MessageId.networkError, data: string]
    }

    interface NetworkOut {
        subscribe(handler: (args: [cnn: string, data: string]) => void): void
        unsubscribe(handler: (data: string) => void): void
    }
}
