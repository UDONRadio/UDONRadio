import React, { Component } from 'react';
import { Modal, Menu } from 'semantic-ui-react';
import Logo from './Logo';
import Tmp from './MainWindow';

const LoginForm = (props) => (
  <a onClick={props.toggleRecover}>mot de passe oublie ?</a>
)

const RegisterForm = (props) => (
  <label>cocu</label>
)

const RecoverForm = (props) => (
  <label>coucou</label>
)

class UserManager extends Component {

  constructor (props) {
    super(props);
    this.showLoginRegisterModal = this.showLoginRegisterModal.bind(this);
    this.hideLoginRegisterModal = this.hideLoginRegisterModal.bind(this);
    this.changeModalForm = this.changeModalForm.bind(this);
    this.state = {
      showLoginRegisterModal: this.showLoginRegisterModal,
      logged_in: false,
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

  login () {
    console.log('login');
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
        <Tmp user={this.state}/>
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
