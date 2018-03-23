import { ipcRenderer } from "electron";
import * as React from "react";
import { SEND_FILE } from "../../app/events";
import { User, isOnline } from "../index";

type Props = {
  user: User;
};

function sendFiles(user: User, files: string[]) {
  ipcRenderer.send(SEND_FILE, {
    user,
    files
  });
}

function createDropHanlder(user: User) {
  return (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    sendFiles(user, Array.from(event.dataTransfer.files).map((f: File) => f.path));
  };
}

export default ({ user }: Props) => (
  <div onDrop={createDropHanlder(user)}>
    <div>{user.name}</div>
    <div>{user.address}</div>
    <div>{isOnline(user) ? "Online" : "Offline"}</div>
    <div>{user.lastSeen.toString()}</div>
  </div>
);
