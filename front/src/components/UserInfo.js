import React from 'react';
import { BlueButton } from '../components';

const UserInfo = (props) => {
  if (props.user.logged_in)
    return <span className="nav-extra-padding">
      <label><i>Bienvenue, {props.user.username}</i></label>
      <BlueButton style={{'float':'right'}} onClick={props.user.logout}>logout</BlueButton>
    </span>
  else
    return <BlueButton className="nav-extra-padding" onClick={props.user.showLoginRegisterModal}>
      Rejoins-nous !
    </BlueButton>
}

export default UserInfo;
