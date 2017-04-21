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
  playing: boolean
}
export class Player extends React.Component<PlayerProps, PlayerState> {
  private HTMLPlayer: ReactAudioPlayer;

  constructor () {
    super();
    this.state = {
      playing: false,
    };
    this.PlayPause = this.PlayPause.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
  }

  PlayPause () {
    if (this.state.playing)
      this.HTMLPlayer.audioEl.pause();
    else
      this.HTMLPlayer.audioEl.play();
  }

  onPause () {
    this.setState({
      playing: false
    });
  }

  onPlay () {
    this.setState({
      playing: true
    });
  }

  render () {
    return <PlayerDIV>
      <button onClick={this.PlayPause}>{this.state.playing ? "pause" : "play"}</button>
      <ReactAudioPlayer
        onPlay={this.onPlay}
        onPause={this.onPause}
        onError={(e) => alert("Error while fetching audio stream...")}
        controls={false}
        autoPlay={true}
        ref={(c) => this.HTMLPlayer = c}
        src="http://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3"
      />

    </PlayerDIV>
  }
}
