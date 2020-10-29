importScripts("server.js");

const app = Elm.Server.init();

app.ports.send.subscribe(([cnn, data]) => {
    postMessage([cnn, data])
});


onmessage = function ({ data }) {
    const [key, args] = data
    app.ports[key].send(args);
}