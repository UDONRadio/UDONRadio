import React, { Component } from 'react';
import { Modal, Menu } from 'semantic-ui-react';

import 'whatwg-fetch';
import { LoginForm, RegisterForm, MainWindow } from './';
import { Logo, RecoverForm } from '../components';
import { request, SERVER } from '../networkGenerics';

class UserManager extends Component {

  constructor (props) {
    super(props);
    this.showLoginRegisterModal = this.showLoginRegisterModal.bind(this);
    this.hideLoginRegisterModal = this.hideLoginRegisterModal.bind(this);
    this.changeModalForm = this.changeModalForm.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.request = this.request.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.recover = this.recover.bind(this);
    this.logout = this.logout.bind(this);
    const auth_token = localStorage.getItem('auth_token')
    this.state = {
      showLoginRegisterModal: this.showLoginRegisterModal,
      logged_in: false,
      auth_token: auth_token,
      username: null,
      __showModal: false,
      __activeModalForm: 'log in'
    };
    if (auth_token !== null)
      this.getUserInfo()
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
  request(url, data) {
    data.headers.Authorization = 'Token ' + this.state.auth_token;
    return request(url, data);
  }

  getUserInfo() {
    this.request(SERVER.api_url + '/auth/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(({ username }) => {
        this.setState({
          logged_in: true,
          username: username
        })
      })
      .catch((err) => {
        if (err.status === 401) {
          this.setState({
            auth_token: null
          });
          localStorage.removeItem('auth_token')
        }
        else {
          alert(err);
        }
      });
  }

  login ({ username, password }, onError) {
    request(SERVER.api_url + '/auth/token/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username': username, 'password': password})
    })
      .then((response) => {
        localStorage.setItem('auth_token', response.auth_token)
        this.setState({
          'auth_token': response.auth_token,
          '__showModal': false
        }, this.getUserInfo);
      })
      .catch(onError);
  }

  register ({ username, password, email }, onError) {
    request(SERVER.api_url + '/auth/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'username': username, 'password': password, 'email': email})
    })
      .then((response) => {
        this.login({username: username, password: password}, () => (void(0)));
      })
      .catch(onError);
  }

  recover () {
    console.log('recover');
  }

  logout () {
    localStorage.removeItem('auth_token')
    fetch(SERVER.api_url + '/auth/token/destroy/', {
      method: 'POST',
      headers: {
        'Authorization': 'Token ' + this.state.auth_token,
      }
    }).then(response => {
      if (response.ok) {
        this.setState({
          'logged_in' : false,
          'username': null
        })
      }
    }) // XXX: Need error handling
  }

  render () {
    const forms = {
      'log in': LoginForm,
      'register': RegisterForm,
      'recover': RecoverForm,
    };
    const CurrentForm = forms[this.state.__activeModalForm];
    return <div>
      <MainWindow user={{'logout': this.logout, ...this.state}}/>
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
