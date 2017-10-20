import React, { Component } from 'react';
import { Divider, Dimmer, Icon, Message } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

class FileUploader extends Component {

  constructor () {
    super()
    this.state = {
      last_rejected : [],
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles)
    console.log('accepted: ' + acceptedFiles)
    console.log('rejected: ' + rejectedFiles)
    this.setState({last_rejected: rejectedFiles})
  }

  render () {
    return <div>
      <Dropzone onDrop={this.onDrop} accept="audio/*">
        <Icon name='upload' size='massive'/>
      </Dropzone>
      {this.state.last_rejected.length !== 0 && <Message warning list={
          this.state.last_rejected.map((file) => (file.name + ': is not an audio file'))
        } header='Some files were ommited'/>
      }
    </div>
  }
}


const UploadStatus = (props) => (
  <a>salam</a>
)

const SongMaker = (props) => (
  <a>wesh</a>
)

class UploadView extends Component {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    return <div>
      <Divider horizontal> Nouvel Upload </Divider>
      <FileUploader/>
      <Divider horizontal> Uploads en cours </Divider>
      <UploadStatus/>
      <Divider horizontal> Categoriser </Divider>
      <SongMaker/>
    </div>
  };

}

export default UploadView;
