import React, { Component } from 'react';
import { Button, TextArea, List} from 'semantic-ui-react';
import * as io from 'socket.io-client';

const temp_messages = [
  {
    'user': 'dodokilleurz',
    'content': '<alert>Haha g hacker votre site 2 merd on va voir qui c le plu fort</alert>'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
];

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

  if (props.logged_in)
    var placeholder = "Allez, viens tchatcher !";
  else
    var placeholder = "Register to start chatting !";

  return <div style={{'bottom': '0px', 'width':'100%', 'position':'absolute',}}>
    <form onSubmit={props.onSubmit}>
    <TextArea
      placeholder={placeholder}
      value={props.value}
      onChange={props.onChange}
      style={{'resize':'none', 'padding':'14px', 'width':'100%'}}
    />
    <Button>Like</Button>
    <Button type='submit' style={{'float':'right'}}>Envoyer</Button>
    </form>
  </div>
}

class LiveChatPanel extends Component {

  constructor (props) {
    super(props);

    this.state = {
      'messages' : temp_messages,
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

  //TODO: Hitting enter while focusing TextArea sends the form
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
