import * as React from "react";
import * as ReactDOM from "react-dom";

export const PlayerButton = (props : {onClick: () => void, playing: boolean}) => (
  <button onClick={props.onClick}>{props.playing ? "pause" : "play"}</button>
)
