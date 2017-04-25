"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Styles_1 = require("./Styles");
const NavBarDiv = styled_components_1.default.div `
  position: fixed;
  top: 0px;
  height = 200px;
`;
const Button = styled_components_1.default.button `
  display: inline-block;
`;
exports.NavBar = (props) => (React.createElement(NavBarDiv, null,
    React.createElement(Styles_1.H1, null, "TarlyFM"),
    React.createElement(Button, { onClick: () => (props.change_state('Emissions')) }, "Emissions"),
    React.createElement(Button, { onClick: () => (props.change_state('Replay')) }, "Replay"),
    React.createElement(Button, { onClick: () => (props.change_state('About')) }, "About")));
//# sourceMappingURL=NavBar.js.map