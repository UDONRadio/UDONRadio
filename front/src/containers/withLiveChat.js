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
				'__ws_send': () => (false),
				'online_count': 0,
			}
		}

		handleMessage = ({data}) => {
			switch (data.type) {
			case 'auth':
				// Simply ignore this at the moment
				break;
			case 'count':
				this.setState({online_count : data.count});
				break;
			case 'messages':
				this.setState({messages: this.state.messages.concat(data.messages)});
				break;
			default:
					console.warn(`unsupported msg type: ${data.type}`);
					console.warn(data);
			}
		}

		sendMessage = (text, callback, callback_err) => {
			if (!this.state.online)
				callback_err('err: chat is offline');
			else
			{
				this.props.user.request(SERVER.api_url + '/chat/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({'text': text})
				}).then((response) => {
					callback(response);
				}).catch(callback_err);
			}
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
