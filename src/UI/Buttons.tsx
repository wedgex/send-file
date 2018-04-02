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
  border-color: ${props => props.theme.backgroundColor};
  border-radius: 3px;
  box-sizing: border-box;
  line-height: 1.5;
  user-select: none;
  text-decoration: none;
  color: #fff;
  background-color: ${props => props.theme.backgroundColor};

  &:hover {
    border-color: ${props => props.theme.hoverColor};
    background-color: ${props => props.theme.hoverColor};
  }
`;

Button.defaultProps = {
  theme: {
    backgroundColor: "#375a7f",
    hoverColor: "#2b4764"
  }
};

export const PrimaryButton = Button;

export const SecondaryButton = (props: Object) => (
  <Button theme={{ backgroundColor: "#444", hoverColor: "#313131" }} {...props} />
);
