import * as Server from "../server";
import * as dgram from "dgram";
import * as Heartbeat from "./index";

export function create() {
  const server = Server.create();

  function sendHeartbeat() {
    server.send(Heartbeat.encode());
  }

  function onHeartbeat(
    handleHeartbeat: (msg: Heartbeat.Heartbeat, rinfo: dgram.AddressInfo) => void
  ) {
    server.onMessage((msg, rinfo) => {
      const heartbeat = Heartbeat.decode(msg);
      if (heartbeat) {
        handleHeartbeat(heartbeat, rinfo);
      }
    });
  }

  return {
    bind: server.bind,
    sendHeartbeat,
    onHeartbeat
  };
}