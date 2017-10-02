import React, { Component } from 'react';
import { Modal, Menu } from 'semantic-ui-react';
import 'whatwg-fetch';

import { LoginForm, MainWindow } from './';
import { Logo, RegisterForm, RecoverForm } from '../components';
import { checkStatus, parseJSON, SERVER } from '../networkGenerics';

/*
** TODO: wrap api calls with error handling on authenticated requests in case
** token expired for instance.
** TODO: logout
** TODO: register
*/

class UserManager extends Component {

  constructor (props) {
    super(props);
    this.showLoginRegisterModal = this.showLoginRegisterModal.bind(this);
    this.hideLoginRegisterModal = this.hideLoginRegisterModal.bind(this);
    this.changeModalForm = this.changeModalForm.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      showLoginRegisterModal: this.showLoginRegisterModal,
      logged_in: false,
      username: null,
      __showModal: true,
      __activeModalForm: 'log in'
    };
  }

  showLoginRegisterModal () {
    this.setState({__showModal: true});
  }

  hideLoginRegisterModal () {
    this.setState({__showModal: false});
  }

  changeModalForm (form) {
    this.setState({__activeModalForm: form});
  }

  /* Make authenticated requests */
  fetch(url, data) {
    data.headers.Authorization = 'Token ' + this.state.auth_token;
    return fetch(url, data);
  }

  getUserInfo() {
    this.fetch(SERVER.api_url + '/auth/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(({ username }) => {
        this.setState({
          logged_in: true,
          username: username
        })
      })
      .catch((err) => alert(err));
  }

  login ({ username, password }, onError) {
    fetch(SERVER.api_url + '/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username': username, 'password': password})
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        this.setState({
          'auth_token': response.auth_token,
          '__showModal': false
        }, this.getUserInfo);
      })
      .catch(onError);
  }

  register () {
    console.log('register');
  }

  recover () {
    console.log('recover');
  }

  render () {
    const forms = {
      'log in': LoginForm,
      'register': RegisterForm,
      'recover': RecoverForm,
    };
    const CurrentForm = forms[this.state.__activeModalForm];
    return <div>
      <MainWindow user={this.state}/>
      <Modal open={this.state.__showModal} onClose={this.hideLoginRegisterModal} size='mini'>
        <Modal.Content>
          <Logo/>
          <Menu pointing secondary>
            <Menu.Item
              name='log in'
              active={this.state.__activeModalForm === 'log in'}
              onClick={() => {this.changeModalForm('log in')}}
            />
            <Menu.Item
              name='register'
              active={this.state.__activeModalForm === 'register'}
              onClick={() => {this.changeModalForm('register')}}
            />
          </Menu>
          <CurrentForm
            login={this.login}
            register={this.register}
            recover={this.recover}
            toggleRecover={() => {this.changeModalForm('recover');}}
          />
        </Modal.Content>
      </Modal>
    </div>
  }
}

export default UserManager;
