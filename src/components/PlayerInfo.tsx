import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from 'styled-components';
import {H1, P} from './Styles';

const PlayerInfoDiv = styled.div`
  display: inline-block;
`

const Title = styled(H1)`
  display: inline-block;
  vertical-align: middle;
`

const Description = styled(P)`
  display: inline-block;
  vertical-align: middle;
`

export const PlayerInfo = (props: {title: string, description: string}) => (
  <PlayerInfoDiv>
    <Title>{props.title}</Title>
    <Description>{props.description}</Description>
  </PlayerInfoDiv>
)
