import * as path from "path";
import * as fs from "fs";
import { app } from "electron";
import * as uuid from "uuid/v1";

export const APP_DATA_PATH = path.join(app.getPath("appData"), "SendFile");
export const USER_ID_FILE = path.join(APP_DATA_PATH, "userId");

export function init() {
  if (!fs.existsSync(APP_DATA_PATH)) fs.mkdirSync(APP_DATA_PATH);
  if (!fs.existsSync(USER_ID_FILE)) fs.writeFileSync(USER_ID_FILE, uuid());
}

export function readUserId(): string {
  return fs.readFileSync(USER_ID_FILE, "utf-8");
}
