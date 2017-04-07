import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';

const EmissionImg = styled.img`
  max-width: 400px;
`

const EmissionDiv = styled.div`
  flex: 1 1 auto;
  margin: 160px;
`

export interface EmissionProps {
  title: string,
  pitch: string,
  picture_link: string,
}
export const Emission = (props: EmissionProps) => (
  <div>
    <EmissionImg src={props.picture_link}/>
    <h1>{props.title}</h1>
    <p>{props.pitch}</p>
  </div>
)
