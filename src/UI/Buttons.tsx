import * as React from "react";
import { default as styled, StyledComponentClass } from "styled-components";

const Button = styled.button`
  height: 2.4em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0px 1em;
  outline: none;
  border: 1px solid;
  border-color: ${props => props.theme.color};
  border-radius: 3px;
  box-sizing: border-box;
  line-height: 1.5;
  user-select: none;
  text-decoration: none;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.backgroundColor};

  &:hover {
    color: ${props => props.theme.backgroundColor};
    background-color: ${props => props.theme.color};
  }
`;

Button.defaultProps = {
  theme: {
    color: "#1b8ceb",
    backgroundColor: "#fff"
  }
};

export const PrimaryButton = Button;

export const SuccessButton = (props: Object) => (
  <Button theme={{ color: "#00d1b2", backgroundColor: "#fff" }} {...props} />
);

export const DangerButton = (props: Object) => (
  <Button theme={{ color: "#e91e63", backgroundColor: "#fff" }} {...props} />
);
