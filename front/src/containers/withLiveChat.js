import React, { Component } from 'react';
import { AuthWebSocketWrapper } from './';
import { SERVER } from '../networkGenerics';

function withLiveChat(WrappedComponent) {
	return class extends Component {

		constructor (props) {
			super(props);

			this.state = {
				'messages' : [],
				'online': false,
				'nickname': '',
				'__ws_send': () => (false),
			}
		}

		changeNick = ({username}) => {
			this.setState({nickname: username})
		}

		appendMessage = (data) => {
			if (!this.state.online)
				this.setState({'online': true})
			this.setState({messages: this.state.messages.concat(data)})
		}

		handleMessage = ({ data }) => {
			switch (data.action) {
				case 'chat_message':
					this.appendMessage(data.args);
					break;
				default:
					console.warn('unrecognized message: ', data);
					break;
			}
		}

		sendMessage = (text) => {
			if (!this.state.online)
				return (false);
			return (this.state.__ws_send({
				'action': "chat_message",
				'args': {
					'content': text
				}
			}));
		}

		onOpen = (event, send_msg) => this.setState({
			online: true,
			__ws_send: send_msg
		})
 
		//TODO: error, disconnect and retry logic to be implemented

		render () {
			return <div className="max-height max-width">
				<AuthWebSocketWrapper
					url={SERVER.ws_url + "chat/"}
					onOpen={this.onOpen}
					onMessage={this.handleMessage}
					token={this.props.user.auth_token}
				/>
				<WrappedComponent
					chat={{...this.state, sendMessage : this.sendMessage}}
					{...this.props}
				/>
			</div>
		}
	};
}

export default withLiveChat;
