import React, { Component } from 'react';
import { Modal, Menu } from 'semantic-ui-react';

import 'whatwg-fetch';
import { LoginForm, RegisterForm, Layout} from './';
import { Logo, RecoverForm } from '../components';
import { request, SERVER } from '../networkGenerics';

class UserManager extends Component {

  constructor (props) {
    super(props);
    const auth_token = localStorage.getItem('auth_token')
    this.socket = {
      _socket: null,
      _mappings: {
      },
      connected: false,
      ready: this.socketReady,
      on: this.socketOn,
      emit: this.socketEmit,
      removeListener: this.socketRemoveListener,
    }
    this.state = {
      showLoginRegisterModal: this.showLoginRegisterModal,
      logged_in: false,
      is_staff: false,
      is_adherent: false,
      auth_token: auth_token,
      username: null,
      __showModal: false,
      __activeModalForm: 'log in'
    };
  }

  componentDidMount () {
    if (this.state.auth_token !== null)
      this.getUserInfo()
    this.initConnection();
  }

  componentWillUnmount () {
    this.closeConnection();
  }

  /* ************************** SOCKET SPECIFIC ***************************** */

  initConnection = () => {
    this.socket._socket = new WebSocket(SERVER.chat_url);
    this.socket._socket.onmessage = this.onMessage;
    this.socket._socket.onopen = () => {
      this.socket.connected = true;
      this.onMessage({'data':{'action': 'connect', 'args': {}}})
    }
    if (this.socket._socket.readyState === WebSocket.OPEN)
      this.socket._socket.onopen();
  }

  socketOn = (action, func) => {
    if (!this.socket._mappings[action])
      this.socket._mappings[action] = [func];
    else
      this.socket._mappings[action].push(func);
  }

  /*TODO: Better system to avoid leaking functions into mappings*/
  socketReady = (func) => {
    if (this.socket.connected)
      func();
    this.socketOn('connect', func);
  }

  socketEmit = (action, data) => {
    this.socket._socket.send(JSON.stringify({action: action, args: data}));
  }

  socketRemoveListener = (action, func) => {
    if (this.socket._mappings[action])
      this.socket._mappings[action] = this.socket._mappings[action].filter(
        (item) => item !== func
      )
  }

  closeConnection = () => {
    this.socket.connected = false;
    this.onMessage({'data':{'action':'disconnect', 'args': {}}})
    this.socket.close();
  }

  onMessage = (event) => {
    const data = (typeof(event.data) === "object") ? event.data : JSON.parse(event.data);
    (this.socket._mappings[data['action']] || []).forEach((fun) => fun(data.args))
  }

  /* ************************* /SOCKET SPECIFIC ***************************** */

  showLoginRegisterModal = () => {
    this.setState({__showModal: true});
  }

  hideLoginRegisterModal = () => {
    this.setState({__showModal: false});
  }

  changeModalForm = (form) => {
    this.setState({__activeModalForm: form});
  }

  /* Make authenticated requests */
  request = (url, data) => {
    data.headers.Authorization = 'Token ' + this.state.auth_token;
    return request(url, data);
  }

  getUserInfo = () => {
    this.request(SERVER.api_url + '/auth/me/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(({ username, is_staff, is_adherent }) => {
        this.setState({
          logged_in: true,
          username: username,
          is_staff: is_staff,
          is_adherent: is_adherent,
        })
        this.socket.ready(() => {
          this.socket.emit('auth', {'token': this.state.auth_token})
        });
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

  login = ({ username, password }, onError) => {
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

  register = ({ username, password, email }, onError) => {
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

  recover = () => {
    console.log('recover');
  }

  logout = () => {
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
          'username': null,
          'is_adherent': false,
          'is_staff': false,
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
    const user = {
          'logout': this.logout,
          'request': this.request,
          'socket': this.socket,
          ...this.state,
    }
    return <div style={{'width': '100%', 'height':'100%'}}>

      <Layout user={user}/>

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
