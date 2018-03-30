import * as React from "react";
import * as ReactDOM from "react-dom";
import { FileTransferRequest } from "../FileTransfers/Request";
import { ipcRenderer } from "electron";

let transferRequest: FileTransferRequest;

ipcRenderer.on(
  "recieved-file-request",
  (_: Electron.Event, request: FileTransferRequest) => {
    transferRequest = request;
    render();
  }
);

function acceptFile() {
  ipcRenderer.send("file-transfer-accpet");
}

function rejectFile() {
  ipcRenderer.send("file-transfer-reject");
}

export function render() {
  const FileTransferWindow = require("../Windows/components/FileTransfer")
    .default;

  ReactDOM.render(
    <FileTransferWindow
      filename={transferRequest.filename}
      userName={transferRequest.user.name}
      onAccept={acceptFile}
      onReject={rejectFile}
    />,
    document.getElementById("App")
  );
}
