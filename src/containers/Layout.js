import React, { Component } from 'react';
import { Grid, Container, Menu } from 'semantic-ui-react';
import { PlayerPanel, UserManager } from './';
import { LiveChatPanel, UploadView } from './';
import { OnAirView, AboutView, AdmView, ReplayView, Logo, UserInfo } from '../components';


class Layout extends Component {
  /* This class manages global layout and navigation views */

  tabs = [
    {
      name: 'On Air',
      class: OnAirView,
      required: [],
      default: true,
    },
    {
      name: 'About',
      class: AboutView,
      required: [],
      default: false,
    },
    {
      name: 'Replays',
      class: ReplayView,
      required: [],
      default: false,
    },
    {
      name: 'Uploads',
      class: UploadView,
      required: ['is_adherent'],
      default: false,
    },
    {
      name: 'Adm',
      class: AdmView,
      required: ['is_staff'],
      default: false
    }
  ]

  constructor (props) {
    super(props);
    this.state = {
      current_tab_name: this.getDefaultTab().name,
    }
  }

  changeCurrentView = (new_tab) => {
    this.setState({current_tab_name: new_tab.name});
  }

  getDefaultTab = () => (
    this.tabs.find((tab) => tab.default)
  )

  tabCanShow = (tab) => {
    for (var i = 0; i < tab.required.length; i++) {
      if (tab.required[i] === 'is_staff' && !this.props.user.is_staff)
        return (false);
      if (tab.required[i] === 'is_adherent' && !this.props.user.is_adherent)
        return (false);
    }
    return (true);
  }

  getCurrentTab = () => {
    const current_tab = this.tabs.find((tab) => tab.name === this.state.current_tab_name);

    if (this.tabCanShow(current_tab))
      return (current_tab);
    else
      return (this.getDefaultTab());
  }

  render() {
    const CurrentTab = this.getCurrentTab();
    const makeMenuItem = (tab) => (
      <Menu.Item
        name={tab.name}
        active={tab === this.getCurrentTab()}
        onClick={() => {
            if (tab.name !== this.state.current_tab_name)
              this.changeCurrentView(tab);
        }}
        key={tab.name}
      />
    )
    return (
      <div id="layout" className="max-width max-height">
        <PlayerPanel/>
        <div id="panel-container" className="dynamic">
          <div id="left-panel" className="fixed">
            <Menu fluid vertical tabular className='max-height'>
              <Menu.Item>
                <Logo/>
              </Menu.Item>
              <div className="nav-extra-padding">
                {
                  this.tabs.filter(this.tabCanShow).map(makeMenuItem)
                }
                <Menu.Item>
                  <UserInfo user={this.props.user}/>
                </Menu.Item>
              </div>
            </Menu>
          </div>
          <div id="middle-panel" className="dynamic">
            <CurrentTab.class user={this.props.user}/>
          </div>
          <div id="right-panel" className="fixed">
            <LiveChatPanel user={this.props.user}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
