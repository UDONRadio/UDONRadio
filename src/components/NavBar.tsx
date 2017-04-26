import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Tabs} from '../containers/';
import {P, H1} from './';

const Title = styled(H1)`
  font-size: 5.85em;
  color: #000000;
`

const NavBarDiv = styled.div`
  position: fixed;
  top: 0px;
  height = 200px;
`
const Button = styled.button`
  display: inline-block;
`;

interface NavBarProps {
  tabs: any,
  change_state: (selected: Tabs) => undefined,
  current: Tabs
}
export const NavBar = (props: NavBarProps) => (
  <NavBarDiv>
    <Title>TarlyFM</Title>
    <Button onClick={() => (props.change_state('Emissions'))}>Emissions</Button>
    <Button onClick={() => (props.change_state('Replay'))}>Replay</Button>
    <Button onClick={() => (props.change_state('About'))}>About</Button>
  </NavBarDiv>
)
