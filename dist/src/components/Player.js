"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const PlayerDIV = styled_components_1.default.div `
  height: 75px;
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px

  border-top-style: groove;
  border-top-width: 5px;
  border-top-color: #e5e5e5;
  background-color: inherit;
  z-index: 2;
`;
class Player extends React.Component {
    constructor() {
        super();
        this.state = {
            online: true
        };
    }
    offlineCallback() {
        this.setState({
            online: false
        });
    }
    render() {
        return React.createElement(PlayerDIV, null,
            React.createElement("div", null,
                React.createElement("span", null)),
            "Player",
            React.createElement("div", null));
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map