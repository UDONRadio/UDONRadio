import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Nav, Player, Shoutbox} from '../containers';

const WindowDIV = styled.div`
  position: fixed;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;

  border: 0px;
  margin: 0px;
  padding: 0px;

  background-color: #efefef;
  font-size: 32px;
`

export const Window = (props) => (
  <WindowDIV>
    <Nav/>
    <Player/>
    <Shoutbox/>
  </WindowDIV>
)
