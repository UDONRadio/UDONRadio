import React, { Component } from 'react';
import { Divider, Icon, Message, Input, List, Container, Loader, Dimmer, Segment, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

import { SERVER } from '../networkGenerics';

const UploadPadding = (props) => (
  <div style={{'paddingRight': '20px', 'paddingLeft': '20px'}}>
    {props.children}
  </div>
)

class FileUploader extends Component {

  constructor (props) {
    super(props)
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
    return <Segment>
      <Dimmer>
        <Loader/>
      </Dimmer>
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
    </Segment>
  }
}


const UploadStatus = (props) => (
  <List celled relaxed>
  {
    props.pending.map((pending) => (
      <List.Item
        key={pending.id}
        header={pending.up_from || pending.audio}
        icon='loading'
        description='Waiting for server processing'
      />
    ))
  }
  </List>
)


class UploadView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pending: [],
    }
    this.getPending()
  }

  uploadFile = (file) => {
    console.log('accepted: ' + file.name)
  }

  uploadLink = (url) => {
    console.log('accepted: ' + url)
  }

  getPending = () => {
    this.props.user.request(SERVER.api_url + '/upload/files/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      this.setState({pending: data})
    })
  }

  addPending = (pending) => {
    this.setState({pending: this.state.pending.concat(pending)})
  }

  render () {
    return <Container style={{'marginTop': '2em'}}>
      <Header dividing> Nouvel Upload </Header>
      <UploadPadding>
        <FileUploader uploadFile={this.uploadFile} uploadLink={this.uploadLink}/>
      </UploadPadding>
      <Divider horizontal> Uploads en cours </Divider>
      <UploadPadding>
        <UploadStatus pending={this.state.pending}/>
      </UploadPadding>
    </Container>
  };

}

export default UploadView;
