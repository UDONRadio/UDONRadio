"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const Emission_1 = require("../components/Emission");
const Inline = styled_components_1.default.li `
  display: inline;
`;
class Emissions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        fetch(props.url)
            .then(response => response.json())
            .then(json => {
            this.setState((prevState, props) => ({
                list: prevState.list.concat(json.results)
            }));
        });
        console.log('pute');
    }
    render() {
        console.log(this.state.list);
        const listEmissions = this.state.list.slice(0, 3).map((emission) => React.createElement(Inline, { key: emission.starts },
            React.createElement(Emission_1.Emission, { picture_link: emission.emission.picture_link, pitch: emission.emission.pitch, title: emission.emission.title })));
        return React.createElement("ul", null, listEmissions);
    }
}
exports.Emissions = Emissions;
//# sourceMappingURL=Emissions.js.map