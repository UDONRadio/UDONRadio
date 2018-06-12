import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import ReactAudioPlayer from 'react-audio-player';
import { IconButton } from '../components';

import { SERVER } from '../networkGenerics';

const PlayPauseButton = (props) => (
  <div className="fixed">
    <IconButton
      name={props.playing ? 'pause': 'play'}
      size='big'
      onClick={props.onClick}
    />
  </div>
)


const VolumeControl = (props) => {

	var icon_name;
	if (props.volume <= 0)
		icon_name = "volume off";
	else if (props.volume > 75)
		icon_name = "volume up";
	else
		icon_name = "volume down";

  return <div className="fixed center-y">
    <IconButton
      onClick={props.onMuteToggle}
      size='big'
      name={icon_name}
    />
    <Input id="volume-slider" type='range' min='0' max='100'
      value={props.volume}
      onChange={(event) => props.onChange(event.target.value)}
    />
  </div>
}


const DisplayMetadata = (props) => {
	const placeholder = {
		album: null,
		title: "Meilleure radio des internets :)",
		artist: "UDONradio"
	}
	const {title, album, artist} = {...placeholder, ...props.lastSong};

  return <span className="dynamic">
		<b>{artist} - </b>{title}{album && <i> - {album}</i>}
  </span>
}


class PlayerPanel extends Component {

  constructor (props) {
    super(props);
    this.state = {
      playing: false,
      volume: 0,
			fade_in: true,
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
    this.getVolume = this.getVolume.bind(this);
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
		if (this.timeout)
			clearTimeout(this.timeout);
		this.timeout = undefined;
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

  getVolume () {
		if (this.state.muted)
			return(0);
		else if (this.state.volume >= 0)
			return(this.state.volume);
  }

  fadeInVolume () {
    if (this.state.volume < 100) {
			this.setState({
				volume: this.state.volume + 1
			});
      this.timeout = setTimeout(this.fadeInVolume, 20);
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
		const fade_in = this.state.fade_in;
    this.setState({
      playing: true,
			fade_in: false
		}, (fade_in) ? this.fadeInVolume : () => (null));
  }

  onPause () {
    this.setState({
      playing: false
    });
  }

  onVolumeChange (value: number) {
		if (this.timeout)
			clearTimeout(this.timeout);
    this.setState({
      volume: value,
      muted: false,
    });
  }

  onMuteToggle () {
		if (this.timeout)
			clearTimeout(this.timeout);
    this.setState({
      muted: !this.state.muted
    });
  }

  render () {
    return <div id="player-panel" className="fixed">
      <ReactAudioPlayer
        onPlay={this.onPlay}
        onPause={this.onPause}
        onError={(e) => alert("Error while fetching audio stream...")}
        controls={false}
        autoPlay={true}
				volume={this.getVolume() / 100.0}
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
        volume={this.getVolume()}
      />
    </div>
  }
}

export default PlayerPanel;
