import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import LiveChatPanel from './LiveChatPanel';

const temp_messages = [
  {
    'user': 'dodokilleurz',
    'content': '<alert>Haha g hacker votre site 2 merd on va voir qui c le plu fort</alert>'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'theof',
    'content': 'salut'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
  {
    'user': 'remi',
    'content': 'TECHNO (toujours pareil)...'
  },
];

class UserManager extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return <Grid padded='vertically' divided style={{'paddingTop': '60px', 'height': '100%', 'marginBottom': '0px'}}>
      <Grid.Column floated='left' width={4} color='grey' >
      </Grid.Column>
      <Grid.Column width={8} color='violet' ></Grid.Column>
      <Grid.Column floated='right' width={4} color='grey' >
        <LiveChatPanel messages={temp_messages}/>
      </Grid.Column>
    </Grid>
  }
}

export default UserManager;
