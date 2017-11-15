import React, { Component } from 'react';
import { Icon, Message, Input, Container, Loader, Dimmer, Segment, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import { UploadStatus } from '../components';
import { SERVER } from '../networkGenerics';


class FileUploader extends Component {

  constructor (props) {
    super(props)
    this.state = {
      last_rejected : [],
      url_value : '',
      bad_link : false,
      current: null,
    }
  }

  onChange = (e) => {
    this.setState({
      url_value: e.target.value,
      bad_link: !this.isValidLink(e.target.value) && e.target.value !== ''
    });
  }

  isValidLink = (url) => {
    return /((http|https):\/\/)?(www\.)?(youtube\.com)(\/)?([a-zA-Z0-9-.]+)\/?/.test(url)
  }

  onLinkUpload = () => {
    if (this.isValidLink(this.state.url_value))
      this.props.upload(this.state.url_value, null)
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({last_rejected: rejectedFiles})
    acceptedFiles.map((file) => this.props.upload('', file))
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


class UploadView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      pending: [],
      uploads: [],
      loaded_uploads: false
    }
  }

  componentDidMount () {
    this.props.user.socket.ready(() => {
      this.props.user.socket.on('upload-processed', this.setUploadProcessed);
      this.props.user.socket.emit('upload-subscribe', {});
      this.getUploads(); // force uploads to be retrieved when socket is ready
    })
  }

  componentWillUnmount () {
    this.props.user.socket.emit('upload-unsubscribe', {});
    this.props.user.socket.removeListener('upload-processed', this.setUploadProcessed);
  }

  setUploadProcessed = ({id}) => {
    var upload = this.state.uploads
    const index = upload.findIndex((elem) => elem.id === id)
    if (index !== -1) {
      upload[index].processed = true
      this.setState({
        uploads: upload,
      })
    }
    else {
      /* In case upload is processed before we can even store its id in state */
      setTimeout(() => this.setUploadProcessed({id: id}), 4000)
    }
  }

  setUploadDone = ({id}) => {
    var upload = this.state.uploads
    const index = upload.findIndex((elem) => elem.id === id)
    if (index !== -1) {
      upload[index].done = true
      this.setState({
        uploads: upload,
      })
    }
  }

  getUploads = () => {
    this.props.user.request(SERVER.api_url + '/upload/files/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      this.setState({
        uploads: this.state.uploads.concat(data)
      })
    })
  }

  pendingToUpload = (pending, upload) => {
    var new_pending = []
    this.state.pending.forEach((elem) => {
      if (pending !== elem)
        new_pending.push(elem)
    });
    this.setState({
      uploads: this.state.uploads.concat(upload),
      pending: new_pending,
    })
  }

  addPending = (pending) => {
    this.setState({pending: this.state.pending.concat(pending)})
  }

  upload = (url, file) => {

    const pending = (url) ? url : file.name

    this.addPending(pending)
    var data = new FormData()
    if (url)
      data.append('up_from', url)
    else
      data.append('audio', file)
    this.props.user.request(SERVER.api_url + '/upload/files/', {
      method: 'POST',
      headers: {
      },
      body: data
    }).then((data) => {
      this.pendingToUpload(pending, data)
    }).catch((err) => alert(err))
  }

  render () {
    return <Container id="upload-view" className="max-height">
      <Header dividing> Nouvel Upload </Header>
      <div className="padded-x">
        <FileUploader upload={this.upload}/>
      </div>
      <Header dividing> Uploads en cours </Header>
      <div className="dynamic padded-x max-height no-min-height">
        <UploadStatus
          pending={this.state.pending}
          uploads={this.state.uploads}
          loaded_uploads={this.state.loaded_uploads}
          current={this.state.current}
          onClick={(current) => this.setState({current: current})}
          request={this.props.user.request}
          setUploadDone={this.setUploadDone}
        />
        <div className="dynamic"/>
      </div >
    </Container>
  };

}

export default UploadView;
