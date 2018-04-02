import * as React from "react";
import { default as styled } from "styled-components";
import { PrimaryButton, SecondaryButton } from "../../UI/Buttons";
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
      <PrimaryButton onClick={onAccept}>Accept</PrimaryButton>
      <SecondaryButton onClick={onReject}>Reject</SecondaryButton>
    </Actions>
  </Container>
);
