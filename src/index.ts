import { app, BrowserWindow } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { enableLiveReload } from "electron-compile";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: "react-hmr" });
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
import { ipcMain } from "electron";
import { AddressInfo } from "dgram";
import * as Heartbeats from "./Heartbeats";
import * as HeartbeatsServer from "./Heartbeats/server";
import * as HeartbeatsClient from "./Heartbeats/client";
import * as FileTransfersServer from "./FileTransfers/server";
import * as FileTransfersClient from "./FileTransfers/client";
import * as Users from "./Users";
import { SEND_FILE, USERS_UPDATED } from "./app/events";

const FILE_PORT = 8385;

const heartbeatServer = HeartbeatsServer.create(8383);
const heartbeatClient = HeartbeatsClient.create(8384, 8383);
const fileServer = FileTransfersServer.create({
  port: FILE_PORT
});

let users: Users.User[] = [];

heartbeatServer.onHeartbeat(
  (heartbeat: Heartbeats.Heartbeat, rinfo: AddressInfo) => {
    const user = Users.create({
      name: heartbeat.hostname,
      address: rinfo.address,
      port: heartbeat.port
    });

    users = Users.addOrUpdate(users, user);

    if (mainWindow) mainWindow.webContents.send(USERS_UPDATED, users);
  }
);

fileServer.onTransferRequest((filename, accept, request) =>
  console.log("recieved", filename)
);

ipcMain.on(
  SEND_FILE,
  (
    _: Electron.Event,
    { user, files }: { user: Users.User; files: string[] }
  ) => {
    console.log("event", user, files);
    const fileClient = FileTransfersClient.create(user.address, user.port);
    files.forEach(file => {
      console.log("sending", file);
      fileClient.sendFile(file);
    });
  }
);

fileServer.start();
heartbeatServer.bind();
heartbeatClient.bind();

setInterval(() => {
  heartbeatClient.send(
    Heartbeats.create({
      port: FILE_PORT
    })
  );
}, 1000);
