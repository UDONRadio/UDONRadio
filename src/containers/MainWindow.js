import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { LiveChatPanel, UploadView } from './';
import { OnAirView, AboutView, AdmView, ReplayView, Nav } from '../components';


const grid_style = {'position': 'absolute', 'top': '60px', 'height': 'calc(100% - 60px)', 'paddingTop':'0px'}

class MainWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current_view: 'On Air',
    }
    this.changeCurrentView = this.changeCurrentView.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.user.logged_in && (this.state.current_view === 'Upload' || this.state.current_view === 'Adm'))
      this.setState({
        current_view: 'On Air',
      });
  }

  changeCurrentView (new_view) {
    this.setState({'current_view': new_view});
  }

  render () {
    const base_tabs = {
        'On Air': OnAirView,
        'About': AboutView,
        'Replay': ReplayView,
    };
    const adherent_tabs = {
        'Upload': UploadView
    };
    const staff_tabs = {
        'Adm': AdmView,
    };

    const tabs = {
      ...base_tabs,
      ...((this.props.user.is_adherent) ? adherent_tabs : {}),
      ...((this.props.user.is_staff) ? staff_tabs : {}),
    }
    const CurrentView = tabs[this.state.current_view];
    return <Grid divided padded style={grid_style}>
      <Grid.Column floated='left' width={4} >
        <Nav
          current={this.state.current_view}
          onClick={this.changeCurrentView}
          user={this.props.user}
          tabs={tabs}
        />
      </Grid.Column>
      <Grid.Column width={8} >
        <CurrentView/>
      </Grid.Column>
      <Grid.Column floated='right' width={4} style={{'height':'100%'}}>
        <LiveChatPanel user={this.props.user}/>
      </Grid.Column>
    </Grid>
  }
}

export default MainWindow;
