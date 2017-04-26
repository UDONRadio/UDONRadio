import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const PlayerButtonDiv = styled.div`
  height: 75px;
  display: inline-block;
  vertical-align: middle;
`;

export const PlayerButton = (props : {onClick: () => void, playing: boolean}) => (
  <PlayerButtonDiv>
    <button onClick={props.onClick}>{props.playing ? "pause" : "play"}</button>
  </PlayerButtonDiv>
)
