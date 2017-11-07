import React from 'react';
import { Segment, Icon, List, Header } from 'semantic-ui-react';

const Pending = (props) => (
  <Segment>
    <Icon name='circle notched' loading/>
    {props.id}
  </Segment>
)

const UploadSongForm = (props) => (
  <a>Upload song...</a>
)

const Upload = (props) => (
  <Segment onClick={props.onClick}>
    <Header size="tiny">
      <Icon name={props.up_from ? 'youtube' : 'file audio outline'} />
      <Header.Content>
        {props.base_name}
      </Header.Content>
      <Header.Subheader>
      {
        (props.processed) ? "Ready to tag!" : "Waiting for server processing"
      }
      </Header.Subheader>
    </Header>
    {
      props.active && <UploadSongForm {...props}/>
    }
  </Segment>
)

const UploadStatus = (props) => {

  const should_display = Boolean(props.uploads.length + props.pending.length)

  return should_display && <Segment.Group id="upload-list">

    {
      props.pending.map((id) => (
        <Pending key={id} id={id}/>
      ))
    }

    {
      props.uploads.map((upload) => {
        const active = (props.current === upload.id);
        return <Upload
          key={upload.id}
          onClick={() => { if (upload.processed) props.onClick((active) ? null : upload.id) }}
          active={active}
          { ...upload }
        />
      })
    }

  </Segment.Group>
}

export default UploadStatus;
