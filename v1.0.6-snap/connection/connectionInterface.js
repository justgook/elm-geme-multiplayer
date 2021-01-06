export var ConnectionEvent;
(function(ConnectionEvent2) {
  ConnectionEvent2[ConnectionEvent2["send"] = 0] = "send";
  ConnectionEvent2[ConnectionEvent2["join"] = 1] = "join";
  ConnectionEvent2[ConnectionEvent2["receive"] = 2] = "receive";
  ConnectionEvent2[ConnectionEvent2["error"] = 3] = "error";
  ConnectionEvent2[ConnectionEvent2["leave"] = 4] = "leave";
})(ConnectionEvent || (ConnectionEvent = {}));
