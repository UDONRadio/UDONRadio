import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Recaptcha from 'react-recaptcha';
import Dropzone from 'react-dropzone';
/*
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

class FullScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      accept: 'audio/mpeg',
      files: [],
      dropzoneActive: false
    }
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    console.log(files);
    this.setState({
      files,
      dropzoneActive: false
    });
  }

  render() {
    const { accept, files, dropzoneActive } = this.state;
    const overlayStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: '2.5em 0',
      background: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      color: '#fff'
    };
    return (
      <Dropzone
        disableClick
        style={{}}
        //accept="audio/mpeg, audio/ogg"
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
      >
        { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
        <div>
          <h2>Dropped files</h2>
          <ul>
            {
              files.map(f => <li>{f.name} - {f.size} bytes</li>)
            }
          </ul>

        </div>
      </Dropzone>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
      <FullScreen/>
      </div>
    );
  }
}

export default App;
