import React from 'react';
import { Segment, Icon, List } from 'semantic-ui-react';

const Pending = (props) => (
  <Segment>
    <Icon name='circle notched' loading/>
    {props.id}
  </Segment>
)

const Upload = (props) => (
  <Segment key={props.id}>
    <List.Icon name={props.up_from ? 'youtube' : 'file audio outline'}/>
    <List.Content>
      <List.Header content={props.up_from || props.audio}/>
      <List.Description content='Waiting for server processing'/>
    </List.Content>
  </Segment>
)

const UploadStatus = (props) => {

  return (props.uploads || props.pending ) && <Segment.Group id="upload-list">
    {
      props.pending.map((id) => (
        <Pending key={id} id={id}/>
      ))
    }
    {
      props.uploads && props.uploads.map((upload) => (
        <Upload key={upload.id} { ...upload }>
        </Upload>
      ))
    }
  </Segment.Group>
}

export default UploadStatus;
