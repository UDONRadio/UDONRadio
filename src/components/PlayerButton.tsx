import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const PlayerButtonDiv = styled.div`
  height: 75px;
  width: 160px;
  display: inline-block;
  vertical-align: middle;
`;

const PlayerButtonStyle = styled.button`
  cursor: pointer;
  border: none;
`;

export const PlayerButton = (props : {onClick: () => void, playing: boolean}) => (
  <PlayerButtonDiv>
    <PlayerButtonStyle onClick={props.onClick}>
      <img src={props.playing ? "assets/img/BTPause.png" : "assets/img/BTPlay.png"}/>
    </PlayerButtonStyle>
  </PlayerButtonDiv>
)
