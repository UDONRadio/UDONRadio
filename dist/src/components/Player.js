"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_audio_player_1 = require("react-audio-player");
var Event_1 = require("./Event");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.state = {
            current: { title: "Offline", description: "Sorry but we're offline at the moment." },
            online: true
        };
        return _this;
    }
    Player.prototype.offlineCallback = function () {
        this.setState({
            online: false
        });
    };
    Player.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(Event_1.Event, { title: this.state.current.title, description: this.state.current.description }),
            React.createElement(react_audio_player_1.default, { src: "http://musique.tombarnier.com:8000/stream", autoPlay: true, onError: this.offlineCallback.bind(this) }),
            React.createElement("label", null, this.state.online ? "Online" : "Offline"));
    };
    return Player;
}(React.Component));
exports.Player = Player;
//# sourceMappingURL=Player.js.map