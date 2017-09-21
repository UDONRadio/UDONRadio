import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
