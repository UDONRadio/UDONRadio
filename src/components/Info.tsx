import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Nav} from '../containers/Nav'
import {Shoutbox} from './Shoutbox'

export const InfoDIV = styled.div`
  display: flex;
  height: calc(100% - 80px);
  flex: 1 1 auto;
  flex-flow: row;
`

export const Info = (props) => (
  <InfoDIV>
    <Nav/>
    <Shoutbox/>
  </InfoDIV>
)
