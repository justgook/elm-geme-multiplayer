import Elm from "../Server.elm"
//TODO convert to https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
const app = Elm.Server.init()
// chrome://inspect/#workers
app.ports.send.subscribe(([cnn, data]: [string, string]) => {
    postMessage([cnn, data], "*")
})

// onmessage = function ({ data }) {
//     const [key, args] = data
//     app.ports[key].send(args)
// }
