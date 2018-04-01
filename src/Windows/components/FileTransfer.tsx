import * as React from "react";
import { default as styled } from "styled-components";
import { SuccessButton, DangerButton } from "../../UI/Buttons";
import { PrimaryText, SecondaryText } from "../../UI/Text";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div``;

type Props = {
  userName: string;
  filename: string;
  onAccept: () => void;
  onReject: () => void;
};

export default ({ userName, filename, onAccept, onReject }: Props) => (
  <Container>
    <SecondaryText>{userName} wants to send you</SecondaryText>
    <PrimaryText>{filename}</PrimaryText>
    <Actions>
      <SuccessButton onClick={onAccept}>Accept</SuccessButton>
      <DangerButton onClick={onReject}>Reject</DangerButton>
    </Actions>
  </Container>
);
