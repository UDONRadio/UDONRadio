import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Nav} from '../containers/Nav'
import {Shoutbox} from './Shoutbox'

export const InfoDIV = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items:flex-start;

  flex-flow: row;
  flex-grow: 1;
`

export const Info = (props) => (
  <InfoDIV>
    <Nav/>
    <Shoutbox/>
  </InfoDIV>
)
