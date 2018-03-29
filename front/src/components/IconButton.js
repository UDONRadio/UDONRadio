import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const IconButton = (props) => (
  <Button
    onClick={props.onClick}
    style={{'backgroundColor':'transparent'}}
    icon={<Icon name={props.name} size={props.size}/>}
  />
)

export default IconButton;
