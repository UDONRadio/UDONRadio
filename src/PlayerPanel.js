import React, { Component } from 'react';

class PlayerPanel extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const headerStyle = {
      width: '100%',
      height: '60px',
      position: 'absolute',
      left: 0,
      top: 0,
      'background-color': 'rgb(0, 0, 0)',
      'z-index': 1000,
    };
    return <header style={headerStyle}>NotImplemented</header>
  }
}

export default PlayerPanel;
