import React, { Component } from 'react';
import { Button, TextArea, List, Icon } from 'semantic-ui-react';
import { BlueSpan } from '../components';

const RegularMessage = ({ author, text, created }) => {
	const date = new Date(created);
	const f = ((
		"0" + date.getHours()).slice(-2) +
		":" +
		("0" + date.getMinutes()).slice(-2)
	);
	return <List.Content>
		{ f + '    '}
		<List.Header style={{'display': 'inline-block'}}>
			{ (author) ? <BlueSpan>{ author }</BlueSpan> : "<anonyme>" }
		</List.Header>
		<List.Description style={{'wordWrap': 'break-word'}}>
			{ text }
		</List.Description>
	</List.Content>
};

class ChatMessages extends Component {

  scrollToBottom = () => {
    this.end.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  makeMessage = (msg, index) => {
    return <List.Item key={index} className='max-width'>
			<RegularMessage {...msg}/>
    </List.Item>
	};

  render = () => (
      <List className='dynamic'
      id="chatbox"
      divided>
      {this.props.messages.map(this.makeMessage)}
      <div ref={(el) => {this.end = el;}}/>
    </List>
  )
}

const Loading = (props) => {
  return <div className="dynamic" style={{'display':'flex', 'flexFlow': 'column'}}>
    <div className="dynamic"/>
    <div style={{'display': 'flex', 'flexFlow': 'row'}}>
      <div className="dynamic"/>
      Chargement...
      <div className="dynamic"/>
    </div>
    <div className="dynamic"/>
  </div>
}

const ChatInput = (props) => {

  function onKeyPress (event) {
    if (event.key === 'Enter' && event.shiftKey === false)
    {
      event.preventDefault();
      props.onSubmit(event);
    }
  }

  const placeholder = "Allez, viens tchatcher !"

  return <div className="fixed">
    <form onSubmit={props.onSubmit} style={{'display': 'flex', 'paddingBottom':'0px'}}>
    <TextArea
      placeholder={placeholder}
      value={props.value}
      onChange={props.onChange}
      style={{'resize':'none', 'padding':'6px', 'margin':'auto'}}
      onKeyPress={onKeyPress}
      className="dynamic"
      rows={1}
    />
    <div style={{'display': 'flex', 'flexFlow': 'row nowrap'}} className="fixed">
      <div className="dynamic"/>
      <Button
      floated='right'
      compact
      color="red"
      className="fixed"
      disabled={props.disabled}>
            <Button.Content visible>
              <Icon name='reply' />
            </Button.Content>
      </Button>
    </div>
    </form>
  </div>
}

class LiveChatPanel extends Component {

  constructor (props) {
    super(props);

    this.state = {
      'text': '',
    };
  }

  handleChange = (event) => {
      this.setState({text: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
		const { sendMessage } = this.props.chat;
		if (this.state.text !== '')
			sendMessage(this.state.text, () => {
	      this.setState({
	        text: ''
	      });
			}, (what) => {console.warn(what)});
  }

	render () {
		const { chat, user } = this.props;
		const messages =
			(chat.online)
			? <ChatMessages messages={chat.messages}/>
			: <Loading/>;

    return <div id="live-chat-panel" className="max-height max-width">
			<span><b>{ chat.online_count }</b> people online !</span>
      { messages }
			{ <ChatInput
        logged_in={user.logged_in}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        value={this.state.text}
        disabled={!chat.online}
			/> }
    </div>
  }
}

export default LiveChatPanel;
