import * as net from "net";
import * as FileTransfers from "./index";

const PORT = 8383;

function formatAddress(address: string): string {
  const parts = address.split(":");
  return parts[parts.length - 1];
}

export type FileTransferHandler = (filename: string, data: Buffer) => void;
export type FileTransferRequestHandler = (
  request: { filename: string; address: string },
  accept: () => void,
  reject: () => void
) => void;

export interface Server {
  start: () => void;
  stop: (callback?: Function) => void;
  onTransferRequest: (handler: FileTransferRequestHandler) => void;
  onTransfer: (handler: FileTransferHandler) => void;
}

function createConnection(onRequest: FileTransferRequestHandler, onFile: FileTransferHandler) {
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
        onRequest({ filename, address: formatAddress(socket.remoteAddress) }, accept, reject);
    };

    socket.once("data", handleFileRequest);
    socket.on("end", () => {
      if (onFile && fileParts.length) onFile(filename, Buffer.concat(fileParts));
    });
  };
}

export function create({ port = PORT }: { port: number }) {
  let handleTransferRequest: FileTransferRequestHandler;
  let handleTransfer: FileTransferHandler;

  const server = net.createServer((socket: net.Socket) => {
    createConnection(handleTransferRequest, handleTransfer)(socket);
  });

  function onTransferRequest(handler: FileTransferRequestHandler) {
    handleTransferRequest = handler;
  }

  function onTransfer(hanlder: FileTransferHandler) {
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
