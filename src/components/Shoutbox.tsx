import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const ShoutboxDiv = styled.div`
  position: fixed;
  right: 0px;
  top: 0px;
  width: 240px;
  min-height: calc(100% - 80px);
  margin-left: 160px;
  margin-right: 80px;

  border-left-style: groove;
  border-left-width: 5px;
  border-left-color: #e5e5e5;
  background-color: inherit;

  z-index: 2;
`

export const Shoutbox = (props) => (
  <ShoutboxDiv>
    Shoutbox
  </ShoutboxDiv>
)
