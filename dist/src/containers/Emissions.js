"use strict";
const React = require("react");
const Emission_1 = require("../components/Emission");
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
    }
    render() {
        console.log(this.state.list);
        const listEmissions = this.state.list.map((emission) => React.createElement("li", { key: emission.starts },
            React.createElement(Emission_1.Emission, { picture_link: emission.emission.picture_link, pitch: emission.emission.pitch, title: emission.emission.title })));
        return React.createElement("ul", null, listEmissions);
    }
}
exports.Emissions = Emissions;
//# sourceMappingURL=Emissions.js.map
