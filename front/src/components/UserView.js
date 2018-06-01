import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { GenericForm } from '../components';

class UserView extends Component {

	constructor () {
		super()
		this.state = {
			current_form: 'log in'
		}
	}
	/* login login_url */
  RecoverForm = (props) => (
    <a>not implemented</a>
  )

  LoginForm = (props) => (
    <div>
      <GenericForm
        onSubmit={this.props.user.login}
        url={this.props.user.login_url}
        fields={[
          {name: "username", attrs: {
            required: true,
          }},
          {name: "password", attrs: {
            type: "password",
            required: true
          }}
        ]}
        name="Login"
      />
    <a
      onClick={() => {this.changeCurrentForm('recover')}}
      style={{'cursor': 'pointer'}}
    >mot de passe oublie ?
    </a>
    </div>
  )

  RegisterForm = (props) => (
    <GenericForm
      onSubmit={this.props.user.register}
      url={this.props.user.register_url}
      fields={[
        {name: "username", attrs: {
          required: true,
        }},
        {name: "password", attrs: {
          type: "password",
          required: true
        }},
        {name: "id", attrs: {
          "show": false,
        }}
      ]}
      name="Login"
    />
  )

  changeCurrentForm = (form) => {
    this.setState({current_form : form});
  }

	render () {
		return (
		<React.Fragment>
			<Menu pointing secondary>
				<Menu.Item
					name='log in'
					active={this.state.current_form === 'log in'}
					onClick={() => this.changeCurrentForm('log in')}
				/>
				<Menu.Item
					name='register'
					active={this.state.current_form === 'register'}
					onClick={() => this.changeCurrentForm('register')}
				/>
			</Menu>
			{this.state.current_form === 'log in' && <this.LoginForm/>}
			{this.state.current_form === 'register' && <this.RegisterForm/>}
		</React.Fragment>
		);
	};
}

export default UserView;
