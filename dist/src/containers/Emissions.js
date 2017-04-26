"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Emission_1 = require("../components/Emission");
const Inline = styled_components_1.default.li `
  display: inline-flex;
`;
const EmissionsUl = styled_components_1.default.ul `
  padding: 0px;

  display: flex;
  flex-wrap: wrap;
`;
class Emissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        fetch("http://localhost:8000/api/emissions/")
            .then(response => response.json())
            .then((json) => {
            this.setState((prevState, props) => ({
                list: prevState.list.concat(json.results)
            }));
        });
    }
    render() {
        const listEmissions = this.state.list.slice(0, 3).map((emission) => React.createElement(Inline, { key: emission.starts },
            React.createElement(Emission_1.Emission, { picture_link: emission.emission.picture_link, pitch: emission.emission.pitch, title: emission.emission.title })));
        return React.createElement(EmissionsUl, null, listEmissions);
    }
}
exports.Emissions = Emissions;
//# sourceMappingURL=Emissions.js.map