import * as React from "react";
import * as ReactDOM from "react-dom";
import {Emission} from './components/Emission'
import {Emissions} from './containers/Emissions'

ReactDOM.render(
  <div>
    <Emissions url="/api/emissions/"/>
  </div>,
  document.getElementById("root")
);
