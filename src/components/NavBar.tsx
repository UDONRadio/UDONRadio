import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Tabs} from '../containers/Nav';

const Button = styled.button`
  display: inline-block;
`;

interface NavBarProps {
  tabs: any,
  change_state: (selected: Tabs) => undefined,
  current: Tabs
}
export const NavBar = (props: NavBarProps) => (
  <div>
    <h1>TarlyFM</h1>
    <Button onClick={() => (props.change_state('Emissions'))}>Emissions</Button>
    <Button onClick={() => (props.change_state('Replay'))}>Replay</Button>
    <Button onClick={() => (props.change_state('About'))}>About</Button>
  </div>
)
