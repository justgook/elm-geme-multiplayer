export const enum TransportEvent {
    send = 0,
    join = 1,
    receive = 2,
    error = 3,
    leave = 4,
}

export type ClientOnParams =
    | [event: TransportEvent.send, handler: (data: string) => boolean]
    | [event: TransportEvent.join, handler: () => void]
    | [event: TransportEvent.receive, handler: (data: string) => void]
    | [event: TransportEvent.error, handler: (error: string) => void]
    | [event: TransportEvent.leave, handler: () => void]

export interface TransportClient {
    send(data: string): void

    connect(channel: string): void

    dispose?(): void

    on(...args: ClientOnParams): void
}

export type ServerOnParams =
    | [event: TransportEvent.send, handler: (cnn: string, data: string) => boolean]
    | [event: TransportEvent.join, handler: (cnn: string) => void]
    | [event: TransportEvent.receive, handler: (cnn: string, data: string) => void]
    | [event: TransportEvent.error, handler: (error: string) => void]
    | [event: TransportEvent.leave, handler: (cnn: string) => void]

export interface TransportServer {
    send(args: [cnn: string, data: string]): void

    connect(channel: string): void

    dispose?(): void

    on(...args: ServerOnParams): void
}
