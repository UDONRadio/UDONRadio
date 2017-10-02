import React, { Component } from 'react';
import { Button, TextArea, List } from 'semantic-ui-react';
import * as io from 'socket.io-client';


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
      'socket': io('http://localhost:3001/'),
      'username': '',
      'text': '',
    };
    this.state.socket.on('change username', function (username) {
      this.setState({
        username: username
      });
    }.bind(this));
    this.state.socket.on('chat message', function (name, text) {
      this.setState({
        messages: this.state.messages.concat([{user:name, content:text}])
      })
    }.bind(this))
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
      this.setState({text: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    if (this.state.text === '')
      return ;
    if (this.state.username) {
      this.state.socket.emit('chat message', this.state.text);
      this.setState({
        text: ''
      });
    }
    else {
      this.state.socket.emit('change username', this.state.text);
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
        logged_in={this.state.username !== ''}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        value={this.state.text}
      />
    </div>
  }
}

export default LiveChatPanel;
