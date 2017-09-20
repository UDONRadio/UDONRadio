import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

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
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>TrackUpload</Modal.Title>
          </Modal.Header>
        </Modal>
        <Button onClick={this.open}>Upload</Button>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <RuleModal/>
    );
  }
}

export default App;
