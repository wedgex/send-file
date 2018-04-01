import { ipcRenderer } from "electron";
import * as React from "react";
import { default as styled } from "styled-components";
import { SEND_FILE } from "../../app/events";
import { User, isOnline } from "../index";
import { Online, Offline } from "./StatusIndicator";
import { PrimaryText, SecondaryText } from "../../UI/Text";

type Props = {
  user: User;
};

const UserContainer = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 10px;
`;

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
  <UserContainer onDrop={createDropHanlder(user)}>
    <PrimaryText>{user.name}</PrimaryText>
    <SecondaryText>{user.address}</SecondaryText>
    {isOnline(user) ? <Online>Online</Online> : <Offline>Offline</Offline>}
    <SecondaryText>{user.lastSeen.toString()}</SecondaryText>
  </UserContainer>
);
