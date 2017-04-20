import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

const PlayerDIV = styled.div`
  height: 75px;
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px

  border-top-style: groove;
  border-top-width: 5px;
  border-top-color: #e5e5e5;
  background-color: inherit;
  z-index: 2;
`

interface PlayerProps {

}
interface PlayerState {
  online: boolean
}
export class Player extends React.Component<PlayerProps, PlayerState> {
  private HTMLPlayer: HTMLAudioElement;

  constructor () {
    super();
    this.state = {
      online: true
    };
    this.PlayPause = this.PlayPause.bind(this);
  }

  componentDidMount () {
    console.log(this.HTMLPlayer);
  }

  offlineCallback () {
    this.setState({
      online: false
    })
  }

  PlayPause () {
    if (this.state.online)
      this.HTMLPlayer.pause();
    else
      this.HTMLPlayer.play();
    this.setState({
      online: !this.state.online
    });
  }

  render () {
    return <PlayerDIV>
      <button onClick={this.PlayPause}>{this.state.online ? "pause" : "play"}</button>
      <ReactAudioPlayer
        controls={false}
        autoPlay={true}
        ref={c => this.HTMLPlayer = c.audioEl}
        src="http://tarlyfm.com:8000/_a"
      />

    </PlayerDIV>
  }
}
