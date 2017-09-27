import React, { Component } from 'react';
import { Menu, Label, Image } from 'semantic-ui-react';


const Nav = (props) => {

  function makeOnClickHandler (name) {
    return () => {
      if (name !== props.current_view)
        props.onClick(name);
    }
  }

  function makeMenuItem (name) {
    return <Menu.Item
      name={name}
      active={name === props.CurrentView}
      onClick={makeOnClickHandler(name)}
    />
  }
  return <div>
  <Image src="/logo.png">
  </Image>
  <Menu secondary vertical>
    {
      ['On Air', 'Replay', 'About', 'Upload', 'Adm'].map(makeMenuItem)
    }
  </Menu>
  <label><i>Bienvenue, {props.user.name}</i></label>
  </div>
};

export default Nav;
