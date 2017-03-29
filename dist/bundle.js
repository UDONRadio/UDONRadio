/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var Player_1 = __webpack_require__(3);
	ReactDOM.render(React.createElement(Player_1.Player, null), document.getElementById("root"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_audio_player_1 = __webpack_require__(4);
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
	            React.createElement(react_audio_player_1.default, { src: "http://musique.tombarnier.com:8000/stream", autoPlay: true, onError: this.offlineCallback.bind(this) }),
	            React.createElement("label", null, this.state.online ? "Online" : "Offline"));
	    };
	    return Player;
	}(React.Component));
	exports.Player = Player;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var p=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=r(1),u=n(l),i=1e4,c=function(e){function t(){return o(this,t),s(this,Object.getPrototypeOf(t).apply(this,arguments))}return a(t,e),p(t,[{key:"componentDidMount",value:function(){var e=this,t=this.audioEl;t.addEventListener("error",function(t){e.props.onError&&e.props.onError(t)}),t.addEventListener("canplay",function(t){e.props.onCanPlay&&e.props.onCanPlay(t)}),t.addEventListener("canplaythrough",function(t){e.props.onCanPlayThrough&&e.props.onCanPlayThrough(t)}),t.addEventListener("play",function(t){e.setListenTrack(),e.props.onPlay&&e.props.onPlay(t)}),t.addEventListener("abort",function(t){e.clearListenTrack(),e.props.onAbort&&e.props.onAbort(t)}),t.addEventListener("ended",function(t){e.clearListenTrack(),e.props.onEnded&&e.props.onEnded(t)}),t.addEventListener("pause",function(t){e.clearListenTrack(),e.props.onPause&&e.props.onPause(t)}),t.addEventListener("seeked",function(t){e.clearListenTrack(),e.props.onSeeked&&e.props.onSeeked(t)})}},{key:"componentWillReceiveProps",value:function(e){if(e.selectedPlayerEvent){var t=this.audioEl;t.currentTime=e.selectedPlayerEvent.playTime,t.play()}}},{key:"setListenTrack",value:function(){var e=this;if(!this.listenTracker){var t=this.props.listenInterval||i;this.listenTracker=setInterval(function(){e.props.onListen&&e.props.onListen(e.audioEl.currentTime)},t)}}},{key:"clearListenTrack",value:function(){this.listenTracker&&(clearInterval(this.listenTracker),this.listenTracker=null)}},{key:"render",value:function(){var e=this,t=this.props.children||u["default"].createElement("p",null,"Your browser does not support the ",u["default"].createElement("code",null,"audio")," element."),r=!(this.props.controls===!1);return u["default"].createElement("audio",{className:"react-audio-player "+this.props.className,style:this.props.style,src:this.props.src||"",autoPlay:this.props.autoPlay,preload:this.props.preload,controls:r,ref:function(t){e.audioEl=t},onPlay:this.onPlay},t)}}]),t}(l.Component);c.propTypes={autoPlay:u["default"].PropTypes.bool,children:u["default"].PropTypes.element,className:u["default"].PropTypes.string,listenInterval:u["default"].PropTypes.number,onAbort:u["default"].PropTypes.func,onCanPlay:u["default"].PropTypes.func,onCanPlayThrough:u["default"].PropTypes.func,onEnded:u["default"].PropTypes.func,onError:u["default"].PropTypes.func,onListen:u["default"].PropTypes.func,onPause:u["default"].PropTypes.func,onPlay:u["default"].PropTypes.func,onSeeked:u["default"].PropTypes.func,preload:u["default"].PropTypes.string,src:u["default"].PropTypes.string,controls:u["default"].PropTypes.bool,style:u["default"].PropTypes.object};var d=c;t["default"]=d;(function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(i,"DEFAULT_LISTEN_INTERVAL","/Users/mccandj/Documents/Projects/react-audio-player/src/index.jsx"),__REACT_HOT_LOADER__.register(c,"ReactAudioPlayer","/Users/mccandj/Documents/Projects/react-audio-player/src/index.jsx"),__REACT_HOT_LOADER__.register(d,"default","/Users/mccandj/Documents/Projects/react-audio-player/src/index.jsx"))})()},function(e,t){e.exports=__webpack_require__(1)}]);

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map