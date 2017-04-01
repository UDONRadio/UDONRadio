import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactAudioPlayer from 'react-audio-player';

interface PlayerProps {

}
interface PlayerState {
  online: boolean
}
export class Player extends React.Component<PlayerProps, PlayerState> {

  constructor () {
    super();
    this.state = {
      online: true
    };
  }

  offlineCallback () {
    this.setState({
      online: false
    })
  }

  render () {
    return <div>
      <ReactAudioPlayer src="http://musique.tombarnier.com:8000/stream" autoPlay onError={this.offlineCallback.bind(this)}/>
      <label>{this.state.online ? "Online" : "Offline"}</label>
    </div>
  }
}
