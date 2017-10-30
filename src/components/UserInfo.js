import React from 'react';

const UserInfo = (props) => {
  if (props.user.logged_in)
    return <span>
      <label><i>Bienvenue, {props.user.username}</i></label>
      <a style={{'cursor':'pointer', 'float':'right'}} onClick={props.user.logout}>logout</a>
    </span>
  else
    return <a style={{'cursor':'pointer'}} onClick={props.user.showLoginRegisterModal}>
      Sign in / register
    </a>
}

export default UserInfo;
