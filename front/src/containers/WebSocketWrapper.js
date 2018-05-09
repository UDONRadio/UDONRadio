import { Component } from 'react';
import PropTypes from 'prop-types';

class WebSocketWrapper extends Component {

  constructor (props) {
    super(props);
    this.socket = null;
  }

  componentDidMount () {
    this.socket = new WebSocket(this.props.url);
		this.socket.onerror = this.onError;
    this.socket.onopen = this.onOpen;
  }

  componentWillUnmount () {
		if (this.socket !== null)
	    this.socket.close();
  }

	sendMessage = (msg) => {
		if (this.socket !== null)
		{
			this.socket.send(JSON.stringify(msg));
			return (true);
		}
		else
			return (false);
	}

	onOpen = (event) => {
		this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onMessage;
		this.props.onOpen(event, this.sendMessage);
	}

  onMessage = (e) => {
		const event = {...e, data: JSON.parse(e.data)}
		this.props.onMessage(event);
  }

	onClose = (event) => {
		this.props.onClose(event);
		this.socket = null;
	}

	onError = (event) => {
		this.props.onError(event);
	}

  render () {
		return (null);
	}
}

WebSocketWrapper.propTypes = {
	url: PropTypes.string.isRequired,
	onOpen: PropTypes.func,
	onMessage: PropTypes.func,
	onClose: PropTypes.func,
	onError: PropTypes.func
}

const noOp = () => {};

WebSocketWrapper.defaultProps = {
	onOpen: noOp,
	onMessage: noOp,
	onClose: noOp,
	onError: noOp,
}

export default WebSocketWrapper;
