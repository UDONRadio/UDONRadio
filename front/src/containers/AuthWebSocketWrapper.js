import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WebSocketWrapper } from './';

class AuthWebSocketWrapper extends Component {

	constructor (props) {
		super(props);
		this.state = {
			send : () => {}
		}
	}

	componentDidUpdate (prevProps, prevState) {
		if (this.props.token !== prevProps.token) {
			this.state.send({
				"action": "auth",
				"args": {
					"content": this.props.token
			}});
		}
	}

	onOpen = (event, send_msg) => {
		this.setState({
			send: send_msg
		});
		this.props.onOpen(event, send_msg);
	}

  onMessage = (event) => {
		/*
	  * intercept auth messages and propagate other messages
		*/
		if (event.data.action === "confirm_auth") {
			if (event.data.args.auth)
				this.props.onAuth();
			else
				this.props.onNoAuth();
			return (true);
		}
		return (this.props.onMessage(event));
  }

	render () {
		const {onClose, onError} = this.props;
		var url;
		if (this.props.token)
			url = this.props.url + '?token=' + this.props.token;
		else
			url = this.props.url;

		return <WebSocketWrapper
			url={url}
			onOpen={this.onOpen}
			onClose={onClose}
			onError={onError}
			onMessage={this.onMessage}
		/>
	}
}

AuthWebSocketWrapper.propTypes = {
	url: PropTypes.string.isRequired,
	token: PropTypes.string,
	onOpen: PropTypes.func,
	onMessage: PropTypes.func,
	onClose: PropTypes.func,
	onError: PropTypes.func,
	onNoAuth: PropTypes.func,
	onAuth: PropTypes.func
}

const noOp = () => {};

AuthWebSocketWrapper.defaultProps = {
	onOpen: noOp,
	onMessage: noOp,
	onClose: noOp,
	onError: noOp,
	onNoAuth: noOp,
	onAuth: noOp,
}

export default AuthWebSocketWrapper;
