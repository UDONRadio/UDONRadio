"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Nav_1 = require("../containers/Nav");
const Player_1 = require("./Player");
const Shoutbox_1 = require("../containers/Shoutbox");
const WindowDIV = styled_components_1.default.div `
  position: fixed;
  bottom: 0px;
  top: 0px;
  right: 0px;
  left: 0px;

  border: 0px;
  margin: 0px;
  padding: 0px;

  background-color: #efefef;
`;
exports.Window = (props) => (React.createElement(WindowDIV, null,
    React.createElement(Nav_1.Nav, null),
    React.createElement(Player_1.Player, null),
    React.createElement(Shoutbox_1.Shoutbox, null)));
//# sourceMappingURL=Window.js.map