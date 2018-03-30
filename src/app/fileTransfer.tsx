import * as React from "react";
import * as ReactDOM from "react-dom";
import { ipcRenderer } from "electron";

let filename: string;

ipcRenderer.on("recieved-file-request", (_: Electron.Event, fname: string) => {
  console.log("got", fname);
  filename = fname;
  render();
});

function acceptFile() {
  ipcRenderer.send("file-transfer-accpet");
}

function rejectFile() {
  ipcRenderer.send("file-transfer-reject");
}

export function render() {
  const FileTransferWindow = require("../Windows/components/FileTransfer")
    .default;

  console.log(filename);

  ReactDOM.render(
    <FileTransferWindow
      user="UserName"
      filename={filename}
      onAccept={acceptFile}
      onReject={rejectFile}
    />,
    document.getElementById("App")
  );
}
