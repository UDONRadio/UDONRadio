import React, { Component } from 'react';
import { Container, Form, Button, TextArea, Divider, List} from 'semantic-ui-react';

const ChatMessages = (props) => {

  const makeMessage = (msg) => (
    <List.Item >
      <List.Content>
        <List.Header>{msg.user}</List.Header>
        <List.Description>{msg.content}</List.Description>
      </List.Content>
    </List.Item>
  );

  return <List style={{'maxHeight': 'calc(100% - 150px)', 'overflowY': 'scroll'}}>
    {props.messages.map(makeMessage)}
  </List>
}

const ChatInput = (props) => {

  const sendMessage = (value) => {
    console.log(value);
  };

  const getPlaceholder = (logged_in) => {
    if (logged_in)
      return "Allez, viens tchatcher !";
    else
      return "Register to start chatting !";
  };

  //TODO: Hitting enter while focusing TextArea sends the form
  return <div style={{'bottom': '0px', 'width':'100%', 'position':'absolute'}}>
    <Form>
    <Form.Field>
      <TextArea placeholder={getPlaceholder(props.logged_in)} style={{'resize':'none', 'paddingRight':'14px'}} />
    </Form.Field>
    <Button>Like</Button>
    <Button type='submit' style={{'float':'right'}}>Envoyer</Button>
    </Form>
  </div>
}

const LiveChatPanel = (props) => (
  <div style={{'height':'100%', 'position': 'relative'}}>
    <ChatMessages messages={props.messages}></ChatMessages>
    <ChatInput logged_in/>
  </div>
)

export default LiveChatPanel;
