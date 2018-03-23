import * as dgram from "dgram";
import * as Heartbeat from "./index";

const BROADCAST_IP = "230.185.192.108";

export function create(port: number, destinationPort: number) {
  const server = dgram.createSocket("udp4");

  function bind() {
    server.bind(port);
  }

  function send(heartbeat: Heartbeat.Heartbeat) {
    server.send(Heartbeat.encode(heartbeat), destinationPort, BROADCAST_IP);
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
