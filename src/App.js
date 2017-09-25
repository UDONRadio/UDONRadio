import React, { Component } from 'react';
import PlayerPanel from './PlayerPanel';
import UserManager from './UserManager';

class App extends Component {
  render() {
    return (
      <div style={{'height': '100%'}}>
          <PlayerPanel/>
          <UserManager/>
      </div>
    );
  }
}

export default App;

/*
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Recaptcha from 'react-recaptcha';
const BasicModal = (props) => (
   <Modal show={props.showModal} onHide={props.close}>
    <Modal.Header closeButton>
      <Modal.Title>Upload</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Recaptcha sitekey="6LcJczEUAAAAACJ6Tw96lFEJIIrKZS2Nk0CPrBSO"/>
    </Modal.Body>
  </Modal>
)

class RuleModal extends Component {

  constructor(props) {
    super(props);
    this.state = {showModal: false};
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render () {
    return (
      <div>
        <Button onClick={this.open}>Upload</Button>
        <BasicModal close={this.close} showModal={this.state.showModal}/>
      </div>
    )
  }
}
*/
