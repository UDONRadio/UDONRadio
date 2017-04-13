import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Nav} from '../containers/Nav'

export const InfoDIV = styled.div`
  position: fixed;
  max-width: 1440px;
  display: flex;
  justify-content: flex-start;
  align-items:flex-start;

  flex-flow: row;
  flex-grow: 1;
  flex-wrap: wrap;
`

export const Info = (props) => (
  <InfoDIV>
    <Nav/>
  </InfoDIV>
)
