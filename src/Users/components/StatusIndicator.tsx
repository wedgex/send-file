import { default as styled, StyledComponentClass } from "styled-components";
import { HTMLProps } from "react";

const StatusIndicator = styled.div`
  ::before {
    content: "•";
    margin-right: 5px;
  }
`;

export const Online = styled(StatusIndicator)`
  ::before {
    color: green;
  }
`;

export const Offline = styled(StatusIndicator)`
  ::before {
    color: red;
  }
`;
