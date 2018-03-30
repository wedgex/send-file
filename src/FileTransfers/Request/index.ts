import { User } from "../../Users/index";

export interface FileTransferRequest {
  user: User;
  filename: string;
}

export type FileTransferRequestFields = {
  user: User;
  filename: string;
};

export function create({
  user,
  filename
}: FileTransferRequestFields): FileTransferRequest {
  return {
    user,
    filename
  };
}
