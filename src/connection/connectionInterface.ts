export const enum ConnectionEvent {
    send = 0,
    join = 1,
    receive = 2,
    error = 3,
    leave = 4,
}

export type ClientOnParams =
    | [event: "send", handler: (data: string) => boolean]
    | [event: "join", handler: () => void]
    | [event: "receive", handler: (data: string) => void]
    | [event: "error", handler: (error: string) => void]
    | [event: "leave", handler: () => void]

export interface ClientConnection {
    send(data: string): void

    connect(channel: string): void

    dispose(): void

    on(...args: ClientOnParams): void
}

export type ServerOnParams =
    | [event: "send", handler: (cnn: string, data: string) => boolean]
    | [event: "join", handler: (cnn: string) => void]
    | [event: "receive", handler: (cnn: string, data: string) => void]
    | [event: "error", handler: (error: string) => void]
    | [event: "leave", handler: (cnn: string) => void]

export interface ServerConnection {
    send(cnn: string, data: string): void

    connect(channel: string): void

    dispose(): void

    on(...args: ServerOnParams): void
}
