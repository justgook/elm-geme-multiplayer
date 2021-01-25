import Elm from "../Server.js";
const app = Elm.Server.init();
app.ports.output.subscribe(([cnn, data]) => {
  postMessage([cnn, data], "*");
});
