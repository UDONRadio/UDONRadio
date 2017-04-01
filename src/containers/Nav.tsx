import * as React from "react";
import * as ReactDOM from "react-dom";
import {Emissions} from '../containers/Emissions'
import {NavBar} from './NavBar'

interface NavState {
  selected = React.Component
}
export class extends React.Component<undefined, NavState> {

  constructor () {
    super();
    this.state = {
      selected = Emissions
    };
  }

  render () {
    <div>
      <NavBar/>
      <{this.state.selected} url="http://localhost:8000/emissions/"/>
    </div>
  }
}
