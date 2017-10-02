import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';


/*
** TODO: handle form submission errors
*/

class LoginForm extends Component {

  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      'username':'',
      'password':'',
    }
  }

  handleChange (e, { name, value }) {
      this.setState({ [name]: value });
  }

  handleSubmit () {
    this.props.login(this.state, (data) => {
      alert(data);
    });
  }

  render () {
    const { username, password } = this.state;

    return <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input placeholder='Username' name='username' value={username} onChange={this.handleChange}/>
          <Form.Input type='password' placeholder='Password' name='password' value={password} onChange={this.handleChange}/>
          <Form.Button content='Sign In'/>
        </Form.Group>
      </Form>
      <a onClick={this.props.toggleRecover}>mot de passe oublie ?</a>
    </div>
  }
}

export default LoginForm;
