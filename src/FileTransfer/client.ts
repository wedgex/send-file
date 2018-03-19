import * as net from "net";
import * as fs from "fs";
import { basename } from "path";

export function client(address: string, port: number) {
  const client = new net.Socket();

  function sendFile(filepath: string) {
    const fileStream = fs.createReadStream(filepath);
    client.on("data", data => {
      const response = data.toString();
      if (response === "yes") fileStream.pipe(client);
      else client.end();
    });

    client.connect(port, address, () => {
      client.write(basename(filepath));
    });
  }

  return {
    sendFile,
    on: client.on
  };
}
