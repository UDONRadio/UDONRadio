import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Info} from './Info'
import {Player} from './Player'

const WindowDIV = styled.div`
  display: flex;
  flex-flow: column;
  background-color: #efefef;
  border: 0px;
  margin: 0px;
  padding: 0px;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;
  position: fixed;
`

export const Window = (props) => (
  <WindowDIV>
    <Info/>
    <Player/>
  </WindowDIV>
)
