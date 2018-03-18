import * as dgram from "dgram";

export function create() {
  const server = dgram.createSocket("udp4");

  function bind() {
    server.bind(8383, () => {
      server.addMembership("230.185.192.108");
      server.setBroadcast(true);
      server.setMulticastTTL(128);
      //server.setMulticastLoopback(false);
    });
  }

  function send(msg: string) {
    server.send(msg, 8383, "230.185.192.108");
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
