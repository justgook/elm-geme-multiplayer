import type { TransportClient, ClientOnParams, TransportServer, ServerOnParams } from "./ConnectionInterface"
import { TransportEvent } from "./ConnectionInterface"

export class Debug {
    private participants = new Map<string, (data: string) => void>()
    private clientID = 1
    private serverOnReceive = noop2
    private serverOnJoin = noop1

    server: TransportServer = {
        send: ([cnn, data]) => {
            this.participants.get(cnn)?.(data)
        },
        connect(channel: string) {
            console.log("server::connect", channel)
        },
        dispose() {
            console.log("server::dispose")
        },
        on: (...args: ServerOnParams) => {
            switch (args[0]) {
                case TransportEvent.send:
                    //  (cnn: string, data: string) => boolean]
                    break
                case TransportEvent.join:
                    this.serverOnJoin = args[1]
                    break
                case TransportEvent.receive:
                    this.serverOnReceive = args[1]
                    break
                case TransportEvent.error:
                    //  (error: string) => void]
                    break
                case TransportEvent.leave:
                    //  (cnn: string) => void]
                    break
            }
        },
    }

    client = (): TransportClient => {
        const call = {
            join: noop,
            receive: noop1,
        }
        let myID = ""
        return {
            send: (data: string) => {
                this.serverOnReceive(myID, data)
            },
            connect: (/*channel: string*/) => {
                myID = `ClientId-${this.clientID++}`
                this.participants.set(myID, call.receive)
                this.serverOnJoin(myID)
                call.join()
            },
            dispose: () => {
                console.log("client::dispose")
            },
            on: (...args: ClientOnParams) => {
                switch (args[0]) {
                    case TransportEvent.send:
                        break
                    case TransportEvent.join:
                        call.join = args[1]
                        break
                    case TransportEvent.receive:
                        call.receive = args[1]
                        break
                    case TransportEvent.error:
                        break
                    case TransportEvent.leave:
                        break
                }
            },
        }
    }
}
type Noop = () => void
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: Noop = () => {}
type Noop1 = (data: string) => void
// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
const noop1: Noop1 = (data) => {}
type Noop2 = (data: string, data2: string) => void
// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
const noop2: Noop2 = () => {}
