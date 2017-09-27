import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import LiveChatPanel from './LiveChatPanel';
import OnAirView from './OnAirView';
import AboutView from './AboutView';
import AdmView from './AdmView';
import ReplayView from './ReplayView';
import UploadView from './UploadView'
import Nav from './Nav';

const grid_style = {'position': 'absolute', 'top': '60px', 'height': 'calc(100% - 60px)', 'paddingTop':'0px'}

var fake_user = {'name': 'theof', 'role': 'admin'}

class UserManager extends Component {

  constructor (props) {
    super(props);
    this.state = {
      current_view: 'On Air',
    }
    this.changeCurrentView = this.changeCurrentView.bind(this);
  }

  changeCurrentView (new_view) {
      console.log(this.setState);
      this.setState({'current_view': new_view});
  }

  render () {
    const tabs = {
      'On Air': OnAirView,
      'About': AboutView,
      'Adm': AdmView,
      'Replay': ReplayView,
      'Upload': UploadView
    };
    const CurrentView = tabs[this.state.current_view];
    return <Grid divided padded style={grid_style}>
      <Grid.Column floated='left' width={4} color='grey' >
        <Nav current={this.state.current_view} onClick={this.changeCurrentView} user={fake_user}/>
      </Grid.Column>
      <Grid.Column width={8} color='violet'>
        <CurrentView/>
      </Grid.Column>
      <Grid.Column floated='right' width={4} color='grey' style={{'height':'100%'}}>
        <LiveChatPanel />
      </Grid.Column>
    </Grid>
  }
}

export default UserManager;
