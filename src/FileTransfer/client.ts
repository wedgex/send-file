import * as net from "net";
import * as fs from "fs";
import { basename } from "path";
import * as FileTransfer from "./index";

export function create(address: string, port: number) {
  const client = new net.Socket();

  function sendFile(filepath: string) {
    client.on("data", data => {
      if (data.toString() === FileTransfer.Response.Yes) {
        fs.createReadStream(filepath).pipe(client);
      } else {
        client.end();
      }
    });

    client.on("end", client.end);

    client.connect(port, address, () => {
      client.write(basename(filepath));
    });
  }

  return {
    sendFile,
    on: client.on
  };
}
