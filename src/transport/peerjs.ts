import Peer from "peerjs"
import { TransportClient, ClientOnParams, TransportEvent, TransportServer, ServerOnParams } from "./ConnectionInterface"

class PeerjsCommon {
    protected callbacks = {
        join: Function.prototype,
        error: Function.prototype,
        receive: Function.prototype,
        leave: Function.prototype,
        send: Function.prototype,
    }
    options: Peer.PeerJSOption

    constructor(url = location.href) {
        this.options = urlToOptions(url)
    }

    on = (...args: ClientOnParams | ServerOnParams): void => {
        switch (args[0]) {
            case TransportEvent.send:
                break
            case TransportEvent.join:
                this.callbacks.join = args[1]
                break
            case TransportEvent.receive:
                this.callbacks.receive = args[1]
                break
            case TransportEvent.error:
                this.callbacks.error = args[1]
                break
            case TransportEvent.leave:
                this.callbacks.leave = args[1]
                break
        }
    }
}

export class PeerJsServer extends PeerjsCommon implements TransportServer {
    connect = (channel: string): void => {
        const peer = new Peer(channel, this.options)
        const connections = new Map()

        this.callbacks.send = ([cnn, data]: [cnn: string, data: string]) => {
            connections.get(cnn)?.send(data)
        }
        peer.on("error", (err) => {
            connections.clear()
            this.callbacks.error(err.message)
        })

        peer.on("connection", (cnn) => {
            cnn.on("open", () => {
                if (connections.has(cnn.label)) {
                    cnn.close()
                } else {
                    connections.set(cnn.label, cnn)
                    this.callbacks.join(cnn.label)
                    cnn.on("close", () => {
                        connections.delete(cnn.label)
                        this.callbacks.leave(cnn.label)
                    })
                    cnn.on("data", (data) => {
                        this.callbacks.receive(cnn.label, data)
                    })
                }
            })
        })
    }

    send = (args: [cnn: string, data: string]): void => {
        this.callbacks.send(args)
    }
}

export class PeerJsClient extends PeerjsCommon implements TransportClient {
    private initialReconnectTime = 100
    private connectTimeOut = 3000
    private retryDelay = this.initialReconnectTime
    private maxRetryTimeOut = 15000

    private msgBuffer: string[] = []
    private buffering = (data: string) => {
        this.msgBuffer.push(data)
    }
    protected callbacks = {
        join: Function.prototype,
        error: Function.prototype,
        receive: Function.prototype,
        leave: Function.prototype,
        send: this.buffering,
    }
    private readonly saveKey
    constructor(url = location.href, saveKey = "peerJsLabel") {
        super(url)
        this.saveKey = saveKey
    }

    connect = (channel: string, label: string = sessionStorage[this.saveKey]): void => {
        const peer = new Peer("", this.options)

        peer.on("error", (err) => {
            this.reconnect(channel, peer, peer.connections[0], err.message)
        })
        peer.on("close", () => {
            peer.destroy()
        })
        peer.on("open", () => {
            const cnn = peer.connect(channel, { serialization: "none", reliable: true, label })
            sessionStorage[this.saveKey] = cnn.label
            const reconnect = setTimeout(() => this.reconnect(channel, peer, cnn), this.connectTimeOut)

            cnn.on("open", () => {
                clearTimeout(reconnect)
                this.retryDelay = this.initialReconnectTime
                this.msgBuffer.forEach((a) => cnn.send(a))
                this.msgBuffer = []
                this.callbacks.send = (data: string) => cnn.send(data)
                this.callbacks.join()
            })

            cnn.on("data", (data) => {
                this.callbacks.receive(data)
            })

            cnn.on("close", () => {
                sessionStorage.removeItem(this.saveKey)
                this.reconnect(channel, peer, cnn)
                this.callbacks.leave()
            })

            cnn.on("error", (err) => {
                this.callbacks.error(err.message)
            })
        })
    }

    private reconnect = (channel: string, peer: Peer, cnn?: Peer.DataConnection, error?: string) => {
        this.callbacks.send = this.buffering
        cnn?.close()
        peer.destroy()
        if (error) {
            this.callbacks.error(error)
        }
        setTimeout(() => this.connect(channel), this.retryDelay)
        this.retryDelay = Math.min(this.retryDelay * 1.5, this.maxRetryTimeOut)
    }

    send = (data: string): void => {
        this.callbacks.send(data)
    }
}

const urlToOptions = (aa: string) => {
    try {
        const url = new URL(aa)
        const options: Peer.PeerJSOption = {
            host: url.hostname,
            path: url.pathname,
            secure: url.protocol === "https:",
        }
        if (url.port !== "") {
            options.port = +url.port
        }

        return options
    } catch (_) {
        return {}
    }
}
