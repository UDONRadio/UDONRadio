import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

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
