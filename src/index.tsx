import * as React from "react";
import * as ReactDOM from "react-dom";
import {Window} from './components/Window'
import {Emissions} from './containers/Emissions'


ReactDOM.render(
  <Emissions url="/api/emissions/"/>/*<Window/>*/,
  document.getElementById("root")
);
