importScripts("server.js");

const app = Elm.Server.init();

app.ports.send.subscribe(([cnn, data]) => {
    console.log("app.ports.send.subscribe", cnn, data);
    postMessage([cnn, data])
});


onmessage = function ({ data }) {
    const [key, args] = data
    console.log("Worker got MSG", data)
    app.ports[key].send(args);
}