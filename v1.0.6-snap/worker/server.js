import Elm from "../Server.js";
const app = Elm.Server.init();
app.ports.send.subscribe(([cnn, data]) => {
  postMessage([cnn, data], "*");
});
