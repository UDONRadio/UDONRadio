"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Nav_1 = require("../containers/Nav");
const Shoutbox_1 = require("./Shoutbox");
const InfoDIV = styled_components_1.default.div `
`;
exports.Info = (props) => (React.createElement(InfoDIV, null,
    React.createElement(Nav_1.Nav, null),
    React.createElement(Shoutbox_1.Shoutbox, null)));
//# sourceMappingURL=Info.js.map