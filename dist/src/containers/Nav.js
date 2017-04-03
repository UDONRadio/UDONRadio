"use strict";
const React = require("react");
const Emissions_1 = require("../containers/Emissions");
const NavBar_1 = require("../components/NavBar");
class Nav extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: 'Emissions'
        };
    }
    render() {
        return React.createElement("div", null,
            React.createElement(NavBar_1.NavBar, null),
            React.createElement(Emissions_1.Emissions, { url: "/api/emissions/" }));
    }
}
exports.Nav = Nav;
//# sourceMappingURL=Nav.js.map