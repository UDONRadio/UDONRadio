import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {Emissions} from '../containers/Emissions';
import {NavBar} from '../components/NavBar';
import {About} from '../components/About';
import {Replay} from '../components/Replay';

const NavDiv = styled.div`
  position: fixed;
  max-width: 1440px;
  margin-left: 160px;
  margin-right: 160px;
  z-index: 1;
`

const CurrentTabDiv = styled.div`
  position: fixed;
  top: 300px;
  z-index: -1;
  overflow: auto;
`

React.createElement
export type Tabs = 'Emissions'
                 | 'Replay'
                 | 'About';
const tabs : {[P in Tabs]: any} = { //sigh
  'Emissions': Emissions,
  'Replay': Replay,
  'About': About,
};

interface NavState {
  selected : Tabs
}
export class Nav extends React.Component<undefined, NavState> {

  constructor () {
    super();
    this.state = {
      selected : 'Emissions'
    };
  }

  change_state (selected : Tabs) {
    if (this.state.selected != selected) {
      this.setState({
        selected : selected
      })
    }
  }

  render () {
    const CurrentTab = tabs[this.state.selected];
    return <NavDiv>
      <NavBar tabs={tabs} current={this.state.selected} change_state={this.change_state.bind(this)}/>
      <CurrentTabDiv><CurrentTab/></CurrentTabDiv>
    </NavDiv>
  }
}
