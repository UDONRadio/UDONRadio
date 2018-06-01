import React from 'react';

const UserInfo = (props) => {
  if (props.user.logged_in)
    return <span className="nav-extra-padding">
      <label><i>Bienvenue, {props.user.username}</i></label>
      <a style={{'cursor':'pointer', 'float':'right'}} onClick={props.user.logout}>logout</a>
    </span>
  else
    return <a className="nav-extra-padding" style={{'cursor':'pointer'}} onClick={props.user.showLoginRegisterModal}>
      Rejoins-nous !
    </a>
}

export default UserInfo;
