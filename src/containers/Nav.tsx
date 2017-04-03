import * as React from "react";
import * as ReactDOM from "react-dom";
import {Emissions} from '../containers/Emissions'
import {NavBar} from '../components/NavBar'

interface NavState {
  selected : string
}

export class Nav extends React.Component<undefined, NavState> {

  constructor () {
    super();
    this.state = {
      selected : 'Emissions'
    };
  }

  render () {
    return <div>
      <NavBar/>
      <Emissions url="/api/emissions/"/>
    </div>
  }
}
