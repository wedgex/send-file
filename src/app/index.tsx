import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { ipcRenderer } from "electron";
import { User, rehydrateDates } from "../User";

let users: User[] = [];

ipcRenderer.on("users-updated", (_: Electron.Event, newUsers: User[]) => {
  users = rehydrateDates(newUsers);
  render();
});

export function render() {
  const MainWindow = require("../Windows/components/Main").default;
  ReactDOM.render(
    <AppContainer>
      <MainWindow users={users} />
    </AppContainer>,
    document.getElementById("App")
  );
}
