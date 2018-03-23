import * as dgram from "dgram";
import * as Heartbeats from "./index";

const BROADCAST_IP = "230.185.192.108";

export function create(port: number, destinationPort: number) {
  const server = dgram.createSocket("udp4");

  function bind() {
    server.bind(port);
  }

  function send(heartbeat: Heartbeats.Heartbeat) {
    server.send(Heartbeats.encode(heartbeat), destinationPort, BROADCAST_IP);
  }

  function close(callback?: () => void) {
    server.close(callback);
  }

  return {
    bind,
    send,
    close
  };
}
