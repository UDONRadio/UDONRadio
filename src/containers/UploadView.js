import React, { Component } from 'react';
import { Divider, Dimmer, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

const FileUploader = (props) => (
  <div>
    <Dropzone>
      <Icon name='upload' size='massive'/>
    </Dropzone>
  </div>
)

const UploadStatus = (props) => (
  <a></a>
)

const SongMaker = (props) => (
  <a></a>
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
