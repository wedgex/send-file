import * as React from "react";
import { User, isOnline } from "../index";

type Props = {
  user: User;
};

export default ({ user }: Props) => (
  <div>
    <div>{user.name}</div>
    <div>{user.address}</div>
    <div>{isOnline(user) ? "Online" : "Offline"}</div>
    <div>{user.lastSeen.toString()}</div>
  </div>
);
