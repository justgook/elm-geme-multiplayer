// const { PeerServer } = require("peer")
// const server = PeerServer({ port: 9000, path: "/peerjs" })
module.exports.start = (port = process.env.PORT || 9000) => {
    const express = require("express")
    const { ExpressPeerServer } = require("peer")
    const app = express()

    const server = app.listen(port)

    const peerServer = ExpressPeerServer(server, {
        path: "/",
    })

    app.get("/lobby", (req, res) => res.send("lobby!"))

    app.use("/", peerServer)
}
