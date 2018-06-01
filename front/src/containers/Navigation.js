import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import Responsive from 'react-responsive';
import { Logo, UserInfo } from '../components';
import tabs from './tabs'

const  ResponsiveMenu = (props) => {

	const asMenuItem = (tab, is_mobile) => {
		if (is_mobile)
		{
			return (
				<Menu.Item
					active={tab === props.current}
					onClick={() => {
						if (tab.name !== props.current.name)
							props.setCurrentTab(tab);
					}}
					key={tab.name}
				>
					{
						(tab.name === "Chat")
							? <Logo/>
							: <Icon name={tab.icon_name} size="large" />
					}
				</Menu.Item>
			);
		}
		else
			return (
				<Menu.Item
					name={tab.name}
					active={tab === props.current}
					onClick={() => {
							if (tab.name !== props.current.name)
								props.setCurrentTab(tab);
					}}
					key={tab.name}
					className="nav-extra-padding"
				/>
			);
	}

	return (
		<React.Fragment>
			<Responsive minWidth={700}>
				<Menu fluid vertical tabular className='max-height'>
					<Menu.Item>
						<Logo/>
					</Menu.Item>
					{ tabs.filter((tab) => tab.desktop)
							.filter((tab) => tab.canShow(props.user, "desktop"))
							.map((tab) => asMenuItem(tab, false)) }
					<Menu.Item>
						<UserInfo user={props.user}/>
					</Menu.Item>
				</Menu>
			</Responsive>
			<Responsive maxWidth={700}>
				<Menu fluid widths={tabs.filter((tab) => tab.canShow(props.user, "mobile")).length}>
					{ tabs.filter((tab) => tab.canShow(props.user, "mobile"))
							.map((tab) => asMenuItem(tab, true)) }
				</Menu>
			</Responsive>
		</React.Fragment>
	);
}

class Navigation extends Component {

	constructor (props) {
		super(props);
		this.state = {
			tab_name: this.getDefaultTab().name,
		}
	}

	setCurrentTab = (new_tab) => {
		this.setState({tab_name: new_tab.name});
	}

	getDefaultTab = () => (
		tabs.find((tab) => tab.default)
	)

  getCurrentTab = () => {
    const current_tab = tabs.find((tab) => tab.name === this.state.tab_name);

		if (current_tab.canShow(this.props.user))
      return (current_tab);
    else
      return (this.getDefaultTab());
  }

	render () {
		const currentTab = this.getCurrentTab();
		return (
			<React.Fragment>

				<div id="nav-panel" className="fixed">
					<ResponsiveMenu
						setCurrentTab={this.setCurrentTab}
						user={this.props.user}
						current={currentTab}
					/>
				</div>

				<div id="middle-panel" className="dynamic">
					<currentTab.class user={this.props.user} chat={this.props.chat}/>
				</div>

			</React.Fragment>
		);
	}
}

export default Navigation;
