import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

export interface EmissionProps {
  title: string,
  pitch: string,
  picture_link: string,
}
export const Emission = (props: EmissionProps) => (
  <div>
    <img src={props.picture_link}/>
    <h1>{props.title}</h1>
    <p>{props.pitch}</p>
  </div>
)
