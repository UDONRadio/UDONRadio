import React, { Component } from 'react';
import { Divider, Dimmer, Icon, Message, Input } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

class FileUploader extends Component {

  constructor () {
    super()
    this.state = {
      last_rejected : [],
      url_value : '',
      bad_link : false,
    }
  }

  onChange = (e) => {
    this.setState({
      url_value: e.target.value,
      bad_link: !this.isValidLink(e.target.value) && e.target.value !== ''
    });
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({last_rejected: rejectedFiles})
    acceptedFiles.map(this.props.uploadFile)
  }

  isValidLink = (url) => {
    return /((http|https):\/\/)?(www\.)?(youtube\.com)(\/)?([a-zA-Z0-9-.]+)\/?/.test(url)
  }

  onLinkUpload = () => {
    if (this.isValidLink(this.state.url_value))
      this.props.uploadLink(this.state.url_value)
  }

  render () {
    return <div>
      <Dropzone onDrop={this.onDrop} accept="audio/*">
        <Icon name='upload' size='massive'/>
      </Dropzone>
      <br/>
      <Input
        action={{ labelPosition:'right', icon:'upload', content:'Youtube', color:'red', onClick:this.onLinkUpload}}
        value={this.state.url_value}
        fluid
        placeholder='https://www.youtube.com/watch?v=zgSZAHP89FU'
        onSubmit={this.onLinkUpload}
        onChange={this.onChange}
        error={this.state.bad_link}
      />
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

  uploadFile = (file) => {
    console.log('accepted: ' + file.name)
  }

  uploadLink = (url) => {
    console.log('accepted: ' + url)
  }

  render () {
    return <div>
      <Divider horizontal> Nouvel Upload </Divider>
      <FileUploader uploadFile={this.uploadFile} uploadLink={this.uploadLink}/>
      <Divider horizontal> Uploads en cours </Divider>
      <UploadStatus/>
      <Divider horizontal> Categoriser </Divider>
      <SongMaker/>
    </div>
  };

}

export default UploadView;
