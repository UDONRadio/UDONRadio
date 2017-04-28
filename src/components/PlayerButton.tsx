import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const PlayerButtonDiv = styled.div`
  display: inline-block;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const PlayerButtonStyle = styled.button`
  cursor: pointer;
  border: none;
  padding: 0px;
`;

export const PlayerButton = (props : {onClick: () => void, playing: boolean}) => (
  <PlayerButtonDiv>
    <PlayerButtonStyle onClick={props.onClick}>
      <img src={props.playing ? "assets/img/BTPause.png" : "assets/img/BTPlay.png"}/>
    </PlayerButtonStyle>
  </PlayerButtonDiv>
)
