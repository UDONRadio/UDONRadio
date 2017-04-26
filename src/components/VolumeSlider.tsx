import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface VolumeSliderProps {
  value: number
  onChange: (value: number) => any
}

const adjustVolume = (value: number) => {
  if (value < 0)
    return (0);
  else if (value > 100)
    return (100);
  else
    return (value);
};

export const VolumeSlider = (props) => (
  <input
    type="range"
    min="0"
    max="100"
    value={adjustVolume(props.value)}
    onChange={(event) => props.onChange(event.target.value)}/>
)
