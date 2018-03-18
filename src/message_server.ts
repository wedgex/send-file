import * as Server from "./server";
import * as dgram from "dgram";
import { hostname } from "os";

export interface Heartbeat {
  type: "heartbeat";
  hostname: string;
}

function createHeartbeat(): Heartbeat {
  return {
    type: "heartbeat",
    hostname: hostname()
  };
}

function encodeHeartbeat(): string {
  return JSON.stringify(createHeartbeat());
}

function decodeHeartbeat(msg: string): Heartbeat {
  const json = JSON.parse(msg);
  return json.type === "heartbeat" ? json : null;
}

export function create() {
  const server = Server.create();

  function sendHeartbeat() {
    server.send(encodeHeartbeat());
  }

  function onHeartbeat(
    handleHeartbeat: (msg: Heartbeat, rinfo: dgram.AddressInfo) => void
  ) {
    server.onMessage((msg, rinfo) => {
      const heartbeat = decodeHeartbeat(msg);
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
