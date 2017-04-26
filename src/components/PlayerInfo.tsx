import * as React from "react";
import * as ReactDOM from "react-dom";
import {H1, P} from './';

export const PlayerInfo = (props: {title: string, description: string}) => (
  <div>
    <H1>{props.title}</H1>
    <P>{props.description}</P>
  </div>
)
