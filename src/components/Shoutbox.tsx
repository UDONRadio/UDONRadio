import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const ShoutboxDiv = styled.div`
  margin-left: 160px;
  margin-right: 80px;
  width: 240px;
  order: 2;
  z-index: 2;
`

export const Shoutbox = (props) => (
  <ShoutboxDiv>
    Shoutbox
  </ShoutboxDiv>
)
