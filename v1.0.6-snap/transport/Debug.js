import {TransportEvent} from "./ConnectionInterface.js";
export class Debug {
  constructor() {
    this.participants = new Map();
    this.clientID = 1;
    this.serverOnReceive = noop2;
    this.serverOnJoin = noop1;
    this.server = {
      send: ([cnn, data]) => {
        this.participants.get(cnn)?.(data);
      },
      connect(channel) {
        console.log("server::connect", channel);
      },
      dispose() {
        console.log("server::dispose");
      },
      on: (...args) => {
        switch (args[0]) {
          case TransportEvent.send:
            break;
          case TransportEvent.join:
            this.serverOnJoin = args[1];
            break;
          case TransportEvent.receive:
            this.serverOnReceive = args[1];
            break;
          case TransportEvent.error:
            break;
          case TransportEvent.leave:
            break;
        }
      }
    };
    this.client = () => {
      const call = {
        join: noop,
        receive: noop1
      };
      let myID = "";
      return {
        send: (data) => {
          this.serverOnReceive(myID, data);
        },
        connect: () => {
          myID = `ClientId-${this.clientID++}`;
          this.participants.set(myID, call.receive);
          this.serverOnJoin(myID);
          call.join();
        },
        dispose: () => {
          console.log("client::dispose");
        },
        on: (...args) => {
          switch (args[0]) {
            case TransportEvent.send:
              break;
            case TransportEvent.join:
              call.join = args[1];
              break;
            case TransportEvent.receive:
              call.receive = args[1];
              break;
            case TransportEvent.error:
              break;
            case TransportEvent.leave:
              break;
          }
        }
      };
    };
  }
}
const noop = () => {
};
const noop1 = (data) => {
};
const noop2 = () => {
};
