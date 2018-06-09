import React, { Component } from 'react';
import { Icon, Message, Input, Container, Loader, Dimmer, Segment, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Responsive from 'react-responsive';
import { UploadStatus } from '../components';
import { SERVER } from '../networkGenerics';
import { AuthWebSocketWrapper } from './';


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
    return /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(url)
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
		const	input_props = {
			action: {
          labelPosition:'right',
          icon:'upload',
          color:'red',
          onClick:this.onLinkUpload
      },
			value: this.state.url_value,
			fluid: true,
      placeholder: 'https://www.youtube.com/watch?v=zgSZAHP89FU',
      onSubmit: this.onLinkUpload,
      onChange: this.onChange,
			error: this.state.bad_link
		}

    return <Segment>
      <Dimmer>
        <Loader/>
      </Dimmer>
      <Dropzone onDrop={this.onDrop} accept="audio/*,video/*" className='upload-dropzone'>
        <div className="dynamic"/>
          <Icon name='upload' size='massive' className='fixed'/>
        <div className="dynamic"/>
      </Dropzone>
      <br/>
			<Responsive minWidth={700}>
				<Input {...{
					...input_props,
					action: {...input_props.action, content: 'Youtube'}
				}}/>
			</Responsive>
			<Responsive maxWidth={700}>
	      <Input {...input_props}/>
			</Responsive>
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
			loaded_uploads: false,
			online: false
    }
  }

  componentDidMount () {
		this.getUploads();
  }

	handleMessage = (msg) => {
		console.log(msg);
		this.setUploadProcessed(msg.data.args);
	}

  setUploadProcessed = ({pk}) => {
    var upload = this.state.uploads
    const index = upload.findIndex((elem) => elem.id === pk)
    if (index !== -1) {
      upload[index].processed = true
      this.setState({
        uploads: upload,
      })
    }
    else {
      /* In case upload is processed before we can even store its id in state */
      setTimeout(() => this.setUploadProcessed({id: pk}), 4000)
    }
  }

  setUploadDone = ({audio}) => {
    var tmp_uploads = this.state.uploads;
    const index = tmp_uploads.findIndex((elem) => elem.id === audio)
    if (index !== -1) {
      tmp_uploads[index].done = true
      this.setState({
        uploads: tmp_uploads,
      })
    }
    else {
      console.warn('setUploadDone could not find id ' + audio);
    }
  }

  getUploads = () => {
    this.props.user.request(SERVER.api_url + '/audio/files/', {
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
    this.props.user.request(SERVER.api_url + '/audio/files/', {
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
			<AuthWebSocketWrapper
				url={SERVER.ws_url + "audio/"}
				onMessage={this.handleMessage}
				token={this.props.user.auth_token}
			/>
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
      </div>
    </Container>
  };

}

export default UploadView;
