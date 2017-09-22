import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Icon, Menu, Button, Container} from 'semantic-ui-react';

const PlayPauseButton = (props) => (
  <Button style={{"background": "transparent"}} onClick={props.onClick}>
    <Icon name={props.playing ? 'pause': 'play'} size='big'/>
  </Button>
)

const VolumeControl = (props) => (
  <div>Not Implemented.</div>
)

/*
  render () {
    return <PlayerFooter>
      <PlayerButton onClick={this.PlayPause} playing={this.state.playing}/>
      <PlayerInfo title="En direct" description="Titre d'emission vraiment beaucoup trop archi-super long"/>
      <VolumeSlider
        value={this.state.volume}
        muted={this.state.muted}
        onChange={this.onVolumeChange}
        onClick={this.onMuteToggle}
      />
    </PlayerFooter>
  }
*/
class PlayerPanel extends Component {

  constructor () {
    super();
    this.state = {
      playing: false,
      volume: -1,
      muted: false,
      cachebust: new Date().getTime(),
    };
    this.PlayPause = this.PlayPause.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.fadeInVolume = this.fadeInVolume.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.onMuteToggle = this.onMuteToggle.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }


  PlayPause () {
    if (this.state.playing)
      this.HTMLPlayer.audioEl.pause();
    else
      this.HTMLPlayer.audioEl.play();
  }

  onPlay () {
    this.setState({
      playing: true,
    });
    if (this.state.volume == -1)
      this.fadeInVolume();
  }

  onPause () {
    this.setState({
      playing: false
    });
  }


  onVolumeChange (value: number) {
    this.setState({
      volume: value,
      muted: false,
    });
  }

  onMuteToggle () {
    this.setState({
      muted: !this.state.muted
    });
  }

  fadeInVolume () {
    if (this.state.volume < 100) {
      if (this.state.volume == -1)
        this.setState({
          volume: 0
        });
      else
        this.setState({
          volume: this.state.volume + 5
        });
      setTimeout(this.fadeInVolume, 100);
    }
  }

  updateVolume () {
    if (this.HTMLPlayer) {
      if (this.state.muted)
        this.HTMLPlayer.audioEl.volume = 0;
      else if (this.state.volume >= 0)
        this.HTMLPlayer.audioEl.volume = this.state.volume / 100;
    }
  }


  render () {
    this.updateVolume();
    return <Menu fixed='top'>
    <Container>
      <ReactAudioPlayer
        onPlay={this.onPlay}
        onPause={this.onPause}
        onError={(e) => alert("Error while fetching audio stream...")}
        controls={false}
        autoPlay={true}
        ref={(c) => this.HTMLPlayer = c}
        src={"http://radiomeuh.ice.infomaniak.ch/radiomeuh-128.mp3?cache-buster=" + this.state.cachebust}
      />
      <PlayPauseButton
        playing={this.state.playing}
        onClick={this.PlayPause}
      />
    </Container>
    </Menu>
  }
}

export default PlayerPanel;
