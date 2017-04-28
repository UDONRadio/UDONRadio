import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components';

const VolumeSliderDiv = styled.div`
  float: right;
  display: inline-block;
  vertical-align: middle;
`

const getBackgroundURL = (volume: number, muted: boolean) => {
  if (volume <= 0 || muted)
    return ("assets/img/SND_No_sml.png");
  else if (volume > 75)
    return ("assets/img/SND_Loud_sml.png");
  else
    return ("assets/img/SND_Mid_sml.png");
}

const VolumeButtonStyle = styled.div`
  cursor: pointer;
  border: none;
`

const adjustVolume = (value: number) => {
  if (value < 0)
    return (0);
  else if (value > 100)
    return (100);
  else
    return (value);
};

interface VolumeSliderProps {
  value: number
  muted: boolean
  onChange: (value: number) => void
  onClick: () => void
}
export const VolumeSlider = (props) => (
  <VolumeSliderDiv>
    <VolumeButtonStyle onClick={props.onClick}>
      <img src={getBackgroundURL(props.value, props.muted)}/>
    </VolumeButtonStyle>
    <input
      type="range"
      min="0"
      max="100"
      value={adjustVolume(props.muted ? 0 : props.value)}
      onChange={(event) => props.onChange(event.target.value)}
    />
  </VolumeSliderDiv>
)
