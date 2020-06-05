class Base {
    constructor(callbacks, peer) {
        this.join = this.join.bind(this, callbacks);
        this.receive = this.receive.bind(this, callbacks);
        this.error = this.error.bind(this, callbacks);
        this.leave = this.leave.bind(this, callbacks);
        peer.on("error", function (err) {
            callbacks.error(err.type)
        })
    }

    join(cn, fn) {
        cn.join = fn;
    }

    receive(cn, fn) {
        cn.receive = fn;
    }

    error(cn, fn) {
        cn.error = fn;
    }

    leave(cn, fn) {
        cn.leave = fn;
    }
}

export class Client extends Base {
    constructor(id, options = {}) {
        const callbacks = {
            join: Function.prototype,
            error: Function.prototype,
            receive: Function.prototype,
            leave: Function.prototype,
            ////
            send: Function.prototype
        }
        const peer = new Peer(null, options);
        super(callbacks, peer);

        peer.on("open", function () {
            console.log("Client:peer::open")
            start(peer, callbacks, id);
        });
        this.send = function (data) {
            callbacks.send(data);
        }
    }
}

function start(peer, callbacks, id) {
    const cnn = peer.connect(id, { serialization: "none", reliable: true });
    const reconnect = setTimeout(() => {
        console.log("Client::reconnecting");
        cnn.close();
        start(peer, callbacks, id);
    }, 1000);
    connect(cnn, callbacks, reconnect);
}

function connect(cnn, callbacks, reconnect) {
    callbacks.send = cnn.send.bind(cnn);
    cnn.on("open", function () {
        clearTimeout(reconnect);
        console.log("Client:connected")
        callbacks.join();
    })

    cnn.on("data", function (data) {
        callbacks.receive(data);
    })

    cnn.on("close", function () {
        console.log("Client::close");
    })
}

export class Server extends Base {
    constructor(id, options = {}) {
        const callbacks = {
            join: Function.prototype,
            error: Function.prototype,
            receive: Function.prototype,
            leave: Function.prototype
        }
        const peer = new Peer(id, options);
        super(callbacks, peer);

        const connections = new Map();

        this.send = function (cnn, data) {
            connections.get(cnn).send(data);
        }
        peer.on("connection", function (cnn) {
            cnn.on("open", function () {
                connections.set(cnn.label, cnn);
                callbacks.join(cnn.label)
            })
            cnn.on("close", function () {
                connections.delete(cnn.label)
                callbacks.leave(cnn.label)
            });
            cnn.on("data", function (data) {
                callbacks.receive(cnn.label, data)
            });
        });
    }
}