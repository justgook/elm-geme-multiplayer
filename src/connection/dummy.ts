import type { ClientConnection, ServerConnection, ClientOnParams, ServerOnParams } from "./connectionInterface"

export class DummyClient implements ClientConnection {
    send: (data: string) => void

    constructor() {
        // const { onSend, onJoin, onReceive, onError, onLeave } = options
        // onJoin()
        // setInterval(() => onReceive(""), 1000)
        this.send = (data) => {
            console.log("DummyClient::send", data)
        }
    }

    dispose(): void {
        console.log("DummyClient:dispose")
    }

    connect(channel: string): void {
        console.log("DummyClient:connect", channel)
    }

    on(...args: ClientOnParams): void {
        switch (args[0]) {
            case "send":
                console.log("register send")
                break
            case "join":
                console.log("register join")
                break
            case "receive":
                console.log("register receive")
                break
            case "error":
                console.log("register error")
                break
            case "leave":
                console.log("register leave")
                break
        }
    }
}

export class DummyServer implements ServerConnection {
    constructor() {
        console.log("DummyServer::constructor")
    }

    send(cnn: string, data: string): void {
        console.log("DummyServer::send", cnn, data)
    }

    dispose(): void {
        console.log("dispose")
    }

    connect(channel: string): void {
        console.log("DummyServer::connect", channel)
    }

    on(...args: ServerOnParams): void {
        console.log("DummyServer:on", args)
    }
}
