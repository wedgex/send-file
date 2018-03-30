import * as net from "net";
import * as FileTransfers from "./index";

const PORT = 8383;

function formatAddress(address: string): string {
  const parts = address.split(":");
  return parts[parts.length - 1];
}

export interface Server {
  start: () => void;
  stop: (callback?: Function) => void;
  onTransferRequest: (
    handler: (
      request: { filename: string; address: string },
      accept: () => void,
      reject: () => void
    ) => void
  ) => void;
  onTransfer: (handler: (filename: string, data: Buffer) => void) => void;
}

function createConnection(
  onRequest: (
    request: { filename: string; address: string },
    accept: () => void,
    reject: () => void
  ) => void,
  onFile: (filename: string, data: Buffer) => void
) {
  return (socket: net.Socket) => {
    let filename: string;
    let fileParts: Buffer[] = [];

    const accept = () => {
      socket.write(FileTransfers.Response.Yes);
      socket.on("data", handleFile);
    };
    const reject = () => {
      socket.write(FileTransfers.Response.No);
    };

    const handleFile = (data: Buffer) => {
      fileParts.push(data);
    };

    const handleFileRequest = (data: Buffer) => {
      filename = data.toString();
      if (onRequest)
        onRequest(
          { filename, address: formatAddress(socket.remoteAddress) },
          accept,
          reject
        );
    };

    socket.once("data", handleFileRequest);
    socket.on("end", () => {
      if (onFile && fileParts.length)
        onFile(filename, Buffer.concat(fileParts));
    });
  };
}

export function create({ port = PORT }: { port: number }) {
  let handleTransferRequest: (
    request: { filename: string; address: string },
    accept: () => void,
    reject: () => void
  ) => void;
  let handleTransfer: (filename: string, data: Buffer) => void;

  const server = net.createServer((socket: net.Socket) => {
    createConnection(handleTransferRequest, handleTransfer)(socket);
  });

  function onTransferRequest(
    handler: (
      request: { filename: string; address: string },
      accept: () => void,
      reject: () => void
    ) => void
  ) {
    handleTransferRequest = handler;
  }

  function onTransfer(hanlder: (filename: string, data: Buffer) => void) {
    handleTransfer = hanlder;
  }

  function start() {
    server.listen(port);
  }

  function stop(callback?: Function) {
    server.close(callback);
  }

  return {
    start,
    stop,
    onTransferRequest,
    onTransfer
  };
}
