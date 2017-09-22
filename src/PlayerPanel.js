import React, { Component } from 'react';
import { Icon, Menu, Button, Container} from 'semantic-ui-react';

const PlayPauseButton = (props) => (
  <Button style={{"background": "transparent"}} onClick={props.onClick}>
    <Icon name={props.playing ? 'pause': 'play'} size='big'/>
  </Button>
)

class PlayerPanel extends Component {

  constructor (props) {
    super(props);
    this.state = {
      playing: false
    };
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  play () {
    this.setState({
      playing: true
    });
  }

  pause () {
    this.setState({
      playing: false
    });
  }

  render () {
    return <Menu fixed='top'>
    <Container>
      <PlayPauseButton
        playing={this.state.playing}
        onClick={this.state.playing ? this.pause : this.play}
      />
    </Container>
    </Menu>
  }
}

export default PlayerPanel;
