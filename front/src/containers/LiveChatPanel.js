import React, { Component } from 'react';
import { Button, TextArea, List, Icon } from 'semantic-ui-react';


import { SERVER } from '../networkGenerics';

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

  makeMessage = (msg, index) => (
    <List.Item key={index} className='max-width'>
      {
        msg.type !== 'server' && <List.Content>
          <List.Header>{(msg.type === 'user') ? <a>{msg.username}</a>: msg.username}</List.Header>
          <List.Description style={{'wordWrap': 'break-word'}}>{msg.content}</List.Description>
        </List.Content>
      }
      {
        msg.type === 'server' && <List.Content>
          <List.Description><i>UDON</i>: {msg.content}</List.Description>
        </List.Content>
      }
    </List.Item>
  );

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

  var placeholder;
  if (props.logged_in || props.nickname)
    placeholder = "Allez, viens tchatcher !"
  else
    placeholder = "C'est quoi ton ptit nom ?";

  return <div className="fixed">
    <form onSubmit={props.onSubmit} style={{'display': 'flex', 'padding-bottom':'0px'}}>
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
      'messages' : [],
      'text': '',
      'connected': false,
      'nickname': ''
    };
  }

  componentDidMount () {
    this.props.user.socket.ready(() => {
      this.props.user.socket.on('chat-message', this.appendMessage)
      this.props.user.socket.on('chat-anon-name', this.changeNick)
      this.props.user.socket.emit('chat-join')
    })
  }

  componentWillUnmount () {
    this.props.user.socket.removeListener('chat-message', this.appendMessage)
    this.props.user.socket.removeListener('chat-anon-name', this.changeNick)
  }

  changeNick = ({username}) => {
    this.setState({nickname: username})
  }

  appendMessage = (data) => {
    if (!this.state.connected)
      this.setState({'connected': true})
    this.setState({messages: this.state.messages.concat(data)})
  }

  handleChange = (event) => {
      this.setState({text: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.text !== '' && this.state.connected) {

      if (this.props.user.logged_in || this.state.nickname)
        this.props.user.socket.emit('chat-message', {'content': this.state.text})
      else
        this.props.user.socket.emit('chat-anon-name', {'username': this.state.text})
      this.setState({
        text: ''
      })
    }
  }

  render () {
    return <div id="live-chat-panel" className="max-height max-width">
      {
        (this.state.connected &&
            <ChatMessages
              messages={this.state.messages}
            />) ||
            <Loading/>
      }
      <ChatInput
        logged_in={this.props.user.logged_in}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        value={this.state.text}
        disabled={!this.state.connected}
        nickname={this.state.nickname}
      />
    </div>
  }
}

export default LiveChatPanel;
