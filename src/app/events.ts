import { User } from "../Users";

export const SEND_FILE = "send-file";
export const RECIEVE_FILE_REQUEST = "recieved-file-request";
export const REJECT_FILE = "file-transfer-reject";
export const ACCEPT_FILE = "file-transfer-accpet";
export const USERS_UPDATED = "users-updated";

export type SendFilePayload = {
  user: User;
  files: string[];
};
