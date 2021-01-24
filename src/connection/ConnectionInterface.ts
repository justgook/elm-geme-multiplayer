export const enum ConnectionEvent {
    send = 0,
    join = 1,
    receive = 2,
    error = 3,
    leave = 4,
}

export type ClientOnParams =
    | [event: ConnectionEvent.send, handler: (data: string) => boolean]
    | [event: ConnectionEvent.join, handler: () => void]
    | [event: ConnectionEvent.receive, handler: (data: string) => void]
    | [event: ConnectionEvent.error, handler: (error: string) => void]
    | [event: ConnectionEvent.leave, handler: () => void]

export interface ClientConnection {
    send(data: string): void

    connect(channel: string): void

    dispose(): void

    on(...args: ClientOnParams): void
}

export type ServerOnParams =
    | [event: ConnectionEvent.send, handler: (cnn: string, data: string) => boolean]
    | [event: ConnectionEvent.join, handler: (cnn: string) => void]
    | [event: ConnectionEvent.receive, handler: (cnn: string, data: string) => void]
    | [event: ConnectionEvent.error, handler: (error: string) => void]
    | [event: ConnectionEvent.leave, handler: (cnn: string) => void]

export interface ServerConnection {
    send(args: [cnn: string, data: string]): void

    connect(channel: string): void

    dispose(): void

    on(...args: ServerOnParams): void
}
