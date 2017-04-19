"use strict";
const React = require("react");
const styled_components_1 = require("styled-components");
const io = require("socket.io-client");
const ShoutboxDiv = styled_components_1.default.div `
  position: fixed;
  right: 0px;
  top: 0px;
  width: 240px;
  min-height: calc(100% - 80px);
  margin-left: 160px;
  margin-right: 80px;

  background-color: inherit;

  z-index: 2;
`;
const ShoutboxInput = styled_components_1.default.input `
  position: absolute;
  bottom: 40px;
  left: 0px;
  right: 0px;
  height: 80px;
  width: 100%;
  overflow: auto;
  border: solid;
  border-width: 3px;
  border-color: #a3a3a3;
  background-color: inherit;
`;
const Message = ({ name, text, }) => {
    return React.createElement("div", null,
        React.createElement("h1", null, name),
        React.createElement("p", null, text));
};
class Shoutbox extends React.Component {
    constructor() {
        super();
        this.state = {
            socket: io('http://localhost:3000/'),
            text: '',
            msgList: [],
        };
        this.state.socket.on('chat message', function (name, text) {
            this.setState({
                msgList: this.state.msgList.concat([{ name: name, text: text }])
            });
        }.bind(this));
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    ;
    handleChange(event) {
        this.setState({ text: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.text == '')
            return;
        this.state.socket.emit('chat message', this.state.text);
        this.setState({
            text: ''
        });
        event.preventDefault();
    }
    render() {
        const listMsgs = this.state.msgList.map(({ name, text }) => React.createElement("li", null,
            React.createElement(Message, { name: name, text: text })));
        return React.createElement(ShoutboxDiv, null,
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("ul", null, listMsgs),
                React.createElement(ShoutboxInput, { type: "text", value: this.state.text, onChange: this.handleChange })));
    }
}
exports.Shoutbox = Shoutbox;
//# sourceMappingURL=Shoutbox.js.map