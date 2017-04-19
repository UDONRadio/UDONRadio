"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const ShoutboxDiv = styled_components_1.default.div `
  position: fixed;
  right: 0px;
  top: 0px;
  width: 240px;
  min-height: calc(100% - 80px);
  margin-left: 160px;
  margin-right: 80px;

  background-color: inherit;

  z-index: 2;
`;
const ShoutboxInput = styled_components_1.default.input `
  position: absolute;
  bottom: 40px;
  left: 0px;
  right: 0px;
  height: 80px;
  width: 100%;
  overflow: auto;
  border: solid;
  border-width: 3px;
  border-color: #a3a3a3;
  background-color: inherit;
`;
exports.Shoutbox = (props) => (React.createElement(ShoutboxDiv, null,
    React.createElement("form", null,
        React.createElement(ShoutboxInput, null))));
//# sourceMappingURL=Shoutbox.js.map