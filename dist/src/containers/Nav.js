"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Emissions_1 = require("../containers/Emissions");
const NavBar_1 = require("../components/NavBar");
const About_1 = require("../components/About");
const Replay_1 = require("../components/Replay");
const NavDiv = styled_components_1.default.div `
  position: fixed;
  max-width: 1440px;
  margin-left: 160px;
  margin-right: 160px;
  z-index: 1;
`;
const CurrentTabDiv = styled_components_1.default.div `
  position: fixed;
  top: 300px;
  z-index: -1;
  overflow: auto;
`;
React.createElement;
const tabs = {
    'Emissions': Emissions_1.Emissions,
    'Replay': Replay_1.Replay,
    'About': About_1.About,
};
class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: 'Emissions'
        };
    }
    change_state(selected) {
        if (this.state.selected != selected) {
            this.setState({
                selected: selected
            });
        }
    }
    render() {
        const CurrentTab = tabs[this.state.selected];
        return React.createElement(NavDiv, null,
            React.createElement(NavBar_1.NavBar, { tabs: tabs, current: this.state.selected, change_state: this.change_state.bind(this) }),
            React.createElement(CurrentTabDiv, null,
                React.createElement(CurrentTab, null)));
    }
}
exports.Nav = Nav;
//# sourceMappingURL=Nav.js.map