import * as dgram from "dgram";
import * as Heartbeat from "./index";

const PORT = 8383;
const BROADCAST_IP = "230.185.192.108";

export function create(port: number = PORT) {
  const server = dgram.createSocket("udp4");

  function bind() {
    server.bind(port, () => {
      server.addMembership(BROADCAST_IP);
      server.setBroadcast(true);
      server.setMulticastTTL(128);
      server.setMulticastLoopback(false);
    });
  }

  function onHeartbeat(
    handleHeartbeat: (msg: Heartbeat.Heartbeat, rinfo: dgram.AddressInfo) => void
  ) {
    server.on("message", (msg, rinfo) => {
      const heartbeat = Heartbeat.decode(msg.toString());
      if (heartbeat) handleHeartbeat(heartbeat, rinfo);
    });
  }

  function close(callback?: () => void) {
    server.close(callback);
  }

  return {
    bind,
    onHeartbeat,
    close
  };
}
