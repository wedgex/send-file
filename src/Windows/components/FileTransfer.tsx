import * as React from "react";

type Props = {
  user: string;
  filename: string;
  onAccept: () => void;
  onReject: () => void;
};

export default ({ user, filename, onAccept, onReject }: Props) => (
  <div>
    <div>{user} is trying to send you</div>
    <div>{filename}</div>
    <div>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  </div>
);
