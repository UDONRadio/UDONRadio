import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {
  render() {
    return (
      <Button onClick={alert}>Click here !</Button>
    );
  }
}

export default App;
