import * as React from "react";
import { default as styled } from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type Props = {
  userName: string;
  filename: string;
  onAccept: () => void;
  onReject: () => void;
};

export default ({ userName, filename, onAccept, onReject }: Props) => (
  <Container>
    <div>{userName} is trying to send you</div>
    <strong>{filename}</strong>
    <div>
      <button onClick={onAccept}>Accept</button>
      <button onClick={onReject}>Reject</button>
    </div>
  </Container>
);
