import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const ShoutboxDiv = styled.div`
  flex: 0 1;
  margin-left: 160px;
  margin-right: 80px;
  width: 240px;
  height: 100%;
  z-index: 2;
`

export const Shoutbox = (props) => (
  <ShoutboxDiv>
    Shoutbox
  </ShoutboxDiv>
)
