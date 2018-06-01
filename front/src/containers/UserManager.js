import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

import 'whatwg-fetch';
import { Layout, withLiveChat } from './';
import { Logo, UserView } from '../components';
import { request, SERVER } from '../networkGenerics';

const LayoutWithLiveChat = withLiveChat(Layout);


class UserManager extends Component {

  constructor (props) {
    super(props);
    const auth_token = localStorage.getItem('auth_token')
    this.state = {
      showLoginRegisterModal: this.showLoginRegisterModal,
      logged_in: (auth_token !== null) ? true : false,
      is_staff: false,
      is_adherent: false,
      auth_token: auth_token,
      username: null,
      __showModal: false,
    };
  }

  componentDidMount () {
    if (this.state.auth_token !== null)
      this.getUserInfo()
  }

  login_url = SERVER.api_url + '/auth/token/create/'
  register_url = SERVER.api_url + '/auth/users/create/'

  showLoginRegisterModal = () => {
    this.setState({__showModal: true});
  }

  hideLoginRegisterModal = () => {
    this.setState({__showModal: false});
  }

  /* Make authenticated requests */
  request = (url, data) => {
    if (this.state.logged_in)
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
    request(this.login_url, {
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
					'logged_in': true,
          '__showModal': false,
        }, this.getUserInfo);
      })
      .catch(onError);
  }

  register = ({ username, password, email }, onError) => {
    request(this.register_url, {
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
    const user = {
			'logout': this.logout,
			'request': this.request,
			'login': this.login,
			'login_url': this.login_url,
			'register': this.register,
			'register_url': this.register_url,
			...this.state,
    }
    return <div style={{'width': '100%', 'height':'100%'}}>

      <LayoutWithLiveChat user={user}/>

      <Modal open={this.state.__showModal} onClose={this.hideLoginRegisterModal} size='mini'>
        <Modal.Content>
          <Logo/>
					<UserView user={user}/>
        </Modal.Content>
      </Modal>

    </div>
  }
}

export default UserManager;
