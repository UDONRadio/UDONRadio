import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const PlayerDIV = styled.div`
  border-top-style: groove;
  border-top-width: 5px;
  border-top-color: #e5e5e5;
  background-color: inherit;
  height: 75px;
  width: 100%;
`

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
    return <PlayerDIV>
      <div>
        <span></span>
      </div>
      Player
      <div>
      </div>
    </PlayerDIV>
  }
}
