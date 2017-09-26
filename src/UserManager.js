import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import LiveChatPanel from './LiveChatPanel';


const grid_style = {'position': 'absolute', 'top': '60px', 'height': 'calc(100% - 60px)', 'paddingTop':'0px'}

class UserManager extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return <Grid divided padded style={grid_style}>
      <Grid.Column floated='left' width={4} color='grey' >
      Left
      </Grid.Column>
      <Grid.Column width={8} color='violet' >Middle</Grid.Column>
      <Grid.Column floated='right' width={4} color='grey' style={{'height':'100%'}}>
        <LiveChatPanel />
      </Grid.Column>
    </Grid>
  }
}

export default UserManager;
