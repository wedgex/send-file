import * as net from "net";
import * as FileTransfers from "./index";

const PORT = 8383;

export interface Server {
  start: () => void;
  stop: (callback?: Function) => void;
  onTransferRequest: (
    handler: (filename: string, accept: () => void, reject: () => void) => void
  ) => void;
  onTransfer: (handler: (data: Buffer) => void) => void;
}

function createConnection(
  onRequest: (filename: string, accept: () => void, reject: () => void) => void,
  onFile: (data: Buffer) => void
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
      if (onRequest) onRequest(filename, accept, reject);
    };

    socket.once("data", handleFileRequest);
    socket.on("end", () => {
      if (onFile && fileParts.length) onFile(Buffer.concat(fileParts));
    });
  };
}

export function create({
  port = PORT,
  address
}: {
  port: number;
  address: string;
}) {
  let handleTransferRequest: (
    filename: string,
    accept: () => void,
    reject: () => void
  ) => void;
  let handleTransfer: (data: Buffer) => void;

  const server = net.createServer((socket: net.Socket) => {
    createConnection(handleTransferRequest, handleTransfer)(socket);
  });

  function onTransferRequest(
    handler: (filename: string, accept: () => void, reject: () => void) => void
  ) {
    handleTransferRequest = handler;
  }

  function onTransfer(hanlder: (data: Buffer) => void) {
    handleTransfer = hanlder;
  }

  function start() {
    server.listen(port, address);
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
