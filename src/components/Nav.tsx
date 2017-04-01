import * as React from "react";
import * as ReactDOM from "react-dom";
import {Emissions} from '../containers/Emissions'
import {NavBar} from './NavBar'

export const Nav = (props) => (
  <div>
    <NavBar/>
    <Emissions url="http://localhost:8000/emissions/"/>
  </div>
)
