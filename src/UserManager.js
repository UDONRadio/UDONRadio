import React, { Component } from 'react';
import { Grid, Modal, Header, Image, Divider} from 'semantic-ui-react';
import Tmp from './MainWindow';

class UserManager extends Component {

  constructor (props) {
    super(props);
    this.showLoginRegisterModal = this.showLoginRegisterModal.bind(this);
    this.hideLoginRegisterModal = this.hideLoginRegisterModal.bind(this);
    this.state = {
      showLoginRegisterModal: this.showLoginRegisterModal,
      logged_in: false,
      __showModal: false,
    };
  }

  showLoginRegisterModal () {
    this.setState({__showModal: true});
  }

  hideLoginRegisterModal () {
    this.setState({__showModal: false});
  }

  render () {
      return <div>
        <Tmp user={this.state}/>
        <Modal open={this.state.__showModal} onClose={this.hideLoginRegisterModal} size='mini'>
          <Modal.Content>
              <Header>Default Profile Image</Header>
              <p>We ve found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
              <Divider vertical />
              <Header>Default Profile Image</Header>
              <p>We ve found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
          </Modal.Content>
        </Modal>
      </div>
  }
}

export default UserManager;
