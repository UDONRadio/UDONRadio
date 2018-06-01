import React from 'react';
import { PlayerPanel, Navigation, LiveChatPanel } from './';

const Layout = (props) => (
	<div id="layout" className="max-width max-height">
		<PlayerPanel user={props.user}/>
		<div id="panel-container" className="dynamic">
			<Navigation chat={props.chat} user={props.user}/>
			<div id="right-panel" className="fixed">
				<LiveChatPanel chat={props.chat} user={props.user}/>
			</div>
		</div>
	</div>
);

export default Layout;
