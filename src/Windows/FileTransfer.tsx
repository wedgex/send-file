import * as React from "react";
import * as ReactDOM from "react-dom";
import { FileTransferRequest } from "../FileTransfers/Request";
import { ipcRenderer } from "electron";
import { RECIEVE_FILE_REQUEST, ACCEPT_FILE, REJECT_FILE } from "../app/events";

let transferRequest: FileTransferRequest;

ipcRenderer.on(RECIEVE_FILE_REQUEST, (_: Electron.Event, request: FileTransferRequest) => {
  transferRequest = request;
  render();
});

function acceptFile() {
  ipcRenderer.send(ACCEPT_FILE);
}

function rejectFile() {
  ipcRenderer.send(REJECT_FILE);
}

export function render() {
  const FileTransferWindow = require("../Windows/components/FileTransfer").default;

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
