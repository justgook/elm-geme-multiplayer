import Elm from "../Server.elm"
//TODO convert to https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker
const app = Elm.Server.init()
// chrome://inspect/#workers
app.ports.output.subscribe(([cnn, data]) => {
    postMessage([cnn, data], "*")
})

// onmessage = function ({ data }) {
//     const [key, args] = data
//     app.ports[key].send(args)
// }
