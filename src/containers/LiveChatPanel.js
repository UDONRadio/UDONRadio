import React, { Component } from 'react';
import { Button, TextArea, List } from 'semantic-ui-react';
import * as io from 'socket.io-client';

import { SERVER } from '../networkGenerics';

const ChatMessages = (props) => {

  const makeMessage = (msg, index) => (
    <List.Item key={index}>
      <List.Content>
        <List.Header>{msg.user}</List.Header>
        <List.Description>{msg.content}</List.Description>
      </List.Content>
    </List.Item>
  );

  return <List style={{'maxHeight': 'calc(100% - 150px)', 'overflowY': 'auto'}}>
    {props.messages.map(makeMessage)}
  </List>
}


const ChatInput = (props) => {

  function onKeyPress (event) {
    if (event.key === 'Enter' && event.shiftKey === false)
    {
      event.preventDefault();
      props.onSubmit(event);
    }
  }

  var placeholder = (props.logged_in) ? "Allez, viens tchatcher !" : "Register to start chatting !";

  return <div style={{'bottom': '0px', 'width':'100%', 'position':'absolute',}}>
    <form onSubmit={props.onSubmit}>
    <TextArea
      placeholder={placeholder}
      value={props.value}
      onChange={props.onChange}
      style={{'resize':'none', 'padding':'14px', 'width':'100%'}}
      onKeyPress={onKeyPress}
    />
    <Button type='button' disabled>Like</Button>
    <Button type='submit' style={{'float':'right'}}>Envoyer</Button>
    </form>
  </div>
}


class LiveChatPanel extends Component {

  constructor (props) {
    super(props);

    this.state = {
      'messages' : [],
      'username': null,
      'text': '',
    };
    this.socket = io(SERVER.chat_url);
    this.socket.on('change username', function (username) {
      console.log('im blue dabubidabuda')
      this.setState({
        username: username
      });
    }.bind(this));
    this.socket.on('chat message', function (name, text) {
      this.setState({
        messages: this.state.messages.concat([{user:name, content:text}])
      })
    }.bind(this))
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.username !== this.state.username) {
      /*
      ** NOTE: Might need to trigger a disconnect or something similar on node
      ** side when new username is empty
      */
      if (nextProps.user.username !== null)
        this.socket.emit('change username', nextProps.user.username);
      else
        this.socket.emit('logout');
      this.setState({
        username: nextProps.user.username
      });
    }
  }

  handleChange (event) {
      this.setState({text: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.state.text === '')
      return ;
    if (this.state.username) {
      this.socket.emit('chat message', this.state.text);
      this.setState({
        text: ''
      });
    }
    else {
      this.socket.emit('change username', this.state.text);
      this.setState({
        text: '',
        username: this.state.text,
      });
    }
  }

  render () {
    return <div style={{'height':'100%', 'position': 'relative'}}>
      <ChatMessages messages={this.state.messages}></ChatMessages>
      <ChatInput
        logged_in={this.props.user.logged_in}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        value={this.state.text}
      />
    </div>
  }
}

export default LiveChatPanel;
