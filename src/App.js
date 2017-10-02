import React, { Component } from 'react';
import { PlayerPanel, UserManager } from './containers';

class App extends Component {

  render() {
    return (
      <div style={{'height': '100%'}}>
        <PlayerPanel/>
        <UserManager/>
      </div>
    );
  }
}

export default App;
