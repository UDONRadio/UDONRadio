import React from 'react';
import { Segment, Icon, List, Header } from 'semantic-ui-react';
import { GenericForm } from './';
import { SERVER } from '../networkGenerics';

const Pending = (props) => (
  <Segment>
    <Icon name='circle notched' loading/>
    {props.id}
  </Segment>
)

const UploadSongForm = (props) => (
    <GenericForm
      url={SERVER.api_url + '/radio/song/'}
      request={props.request}
      name="Tag"
      fields={[
        {name: "id", attrs: {
          show: false,
        }},
        {name: "length", attrs: {
          show: false,
        }},
        {name: "upload", attrs: {
          show: false,
          type: "integer",
          value: props.id
        }}
      ]}
      onSuccess={props.setUploadDone}
    />
  )

const Upload = (props) => {
  const done = (props.done) ? {inverted: true, color:'green', tertiary:true} : {}
  return <Segment { ...done }>
    <Header
      size="tiny"
      onClick={props.onClick}
      style={(props.processed) ? {'cursor': 'pointer'} : {}}
    >
      <Icon name={props.up_from ? 'youtube' : 'file audio outline'} />
      <Header.Content>
        {props.base_name}
      </Header.Content>
      <Header.Subheader>
      {
        (!props.processed) ? "Waiting for server processing" : (props.done) ?
          "Done !" : "Ready to tag !"
      }
      </Header.Subheader>
    </Header>
    {
      props.active && <UploadSongForm {...props}/>
    }
  </Segment>
}

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
        const active = (props.current === upload.id && !upload.done);
        return <Upload
          key={upload.id}
          onClick={() => { if (upload.processed) props.onClick(upload.id) }}
          active={active}
          { ...upload }
          request={props.request}
          setUploadDone={props.setUploadDone}
        />
      })
    }

  </Segment.Group>
}

export default UploadStatus;
