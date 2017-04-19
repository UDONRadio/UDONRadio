"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Styles_1 = require("./Styles");
const EmissionImg = styled_components_1.default.img `
  max-width: 400px;
`;
const EmissionDiv = styled_components_1.default.div `
  flex: 1 1 auto;
  margin: 160px;
`;
exports.Emission = (props) => (React.createElement("div", null,
    React.createElement(EmissionImg, { src: props.picture_link }),
    React.createElement(Styles_1.H1, null, props.title),
    React.createElement(Styles_1.P, null, props.pitch)));
//# sourceMappingURL=Emission.js.map