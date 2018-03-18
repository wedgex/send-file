import * as dgram from "dgram";

const BROADCAST_IP = "230.185.192.108";
const PORT = 8383;

export function create() {
  const server = dgram.createSocket("udp4");

  function bind() {
    server.bind(PORT, () => {
      server.addMembership(BROADCAST_IP);
      server.setBroadcast(true);
      server.setMulticastTTL(128);
      //server.setMulticastLoopback(false);
    });
  }

  function send(msg: string) {
    server.send(msg, PORT, BROADCAST_IP);
  }

  function onMessage(
    handleMessage: (msg: string, rinfo: dgram.AddressInfo) => void
  ) {
    server.on("message", (msg, rinfo) => handleMessage(msg.toString(), rinfo));
  }

  return {
    bind,
    send,
    onMessage
  };
}
