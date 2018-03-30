import * as React from "react";
import { default as styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  user: string;
  filename: string;
  onAccept: () => void;
  onReject: () => void;
};

export default ({ user, filename, onAccept, onReject }: Props) => (
  <Container>
    <div>{user} is trying to send you</div>
    <strong>{filename}</strong>
    <div>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  </Container>
);
