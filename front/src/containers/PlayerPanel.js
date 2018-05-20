import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import ReactAudioPlayer from 'react-audio-player';
import { IconButton } from '../components';

import { SERVER } from '../networkGenerics';

const getVolumeIconName = (volume, muted) => {
  if (volume <= 0 || muted)
    return ("volume off");
  else if (volume > 75)
    return ("volume up");
  else
    return ("volume down");
}


const PlayPauseButton = (props) => (
  <div className="fixed">
    <IconButton
      name={props.playing ? 'pause': 'play'}
      size='big'
      onClick={props.onClick}
    />
  </div>
)


const VolumeControl = (props) => (
  <div className="fixed center-y">
    <IconButton
      onClick={props.onMuteToggle}
      size='big'
      name={getVolumeIconName(props.volume, props.muted)}
    />
    <Input type='range' min='0' max='100'
      value={props.muted ? 0 : props.volume}
      onChange={(event) => props.onChange(event.target.value)}
    />
  </div>
)


const DisplayMetadata = (props) => {
	const placeholder = {
		album: null,
		title: "Meilleure radio des internets :)",
		artist: "UDONradio"
	}
	const {title, album, artist} = {...placeholder, ...props.lastSong};

  return <inline className="dynamic">
		<b>{artist} - </b>{title}{album && <i> - {album}</i>}
  </inline>
}


class PlayerPanel extends Component {

  constructor (props) {
    super(props);
    this.state = {
      playing: false,
      volume: -1,
      muted: false,
      cachebust: new Date().getTime(),
			last_song: null,
    };
    this.PlayPause = this.PlayPause.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.fadeInVolume = this.fadeInVolume.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.onMuteToggle = this.onMuteToggle.bind(this);
    this.updateVolume = this.updateVolume.bind(this);
  }

	/*
	 * The same data is fetched twice: here and in OnAirView.
	 * TODO: Merge both states
	*/

	componentDidMount() {
		this.getLastTrack(); 
		this.interval = setInterval(this.getLastTrack, 10 * 1000);
	}

	componentWillUnmount () {
		clearInterval(this.interval);
		this.interval = undefined;
	}

  getLastTrack = () => {
    this.props.user.request(SERVER.api_url + '/radio/song/played/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      this.setState({last_song: data[0]});
    }).catch(() => {
      this.setState({'songs': null});
    })
  }

  updateVolume () {
    if (this.HTMLPlayer) {
      if (this.state.muted)
        this.HTMLPlayer.audioEl.volume = 0;
      else if (this.state.volume >= 0)
        this.HTMLPlayer.audioEl.volume = this.state.volume / 100;
    }
  }

  fadeInVolume () {
    if (this.state.volume < 100) {
      if (this.state.volume === -1)
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

  PlayPause () {
    if (this.state.playing)
      this.HTMLPlayer.audioEl.pause();
    else
		{
			this.setState({'cachebust': new Date().getTime()}, () => (
				this.HTMLPlayer.audioEl.play()
			));
		}
  }

  onPlay () {
    this.setState({
      playing: true,
    });
    if (this.state.volume === -1)
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

  render () {
    this.updateVolume();
    return <div id="player-panel" className="fixed">
      <ReactAudioPlayer
        onPlay={this.onPlay}
        onPause={this.onPause}
        onError={(e) => alert("Error while fetching audio stream...")}
        controls={false}
        autoPlay={true}
        ref={(c) => this.HTMLPlayer = c}
        src={ SERVER.stream_url + "?cache-buster=" + this.state.cachebust}
      />
      <PlayPauseButton
        playing={this.state.playing}
        onClick={this.PlayPause}
      />
      <DisplayMetadata lastSong={this.state.last_song}/>
      <VolumeControl
        onChange={this.onVolumeChange}
        onMuteToggle={this.onMuteToggle}
        volume={this.state.volume}
        muted={this.state.muted}
      />
    </div>
  }
}

export default PlayerPanel;
