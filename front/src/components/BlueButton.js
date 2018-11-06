import React from 'react';

const BlueButton = ({children, onClick, style}) => (
	<button style={{'color':'#4183c4', ...style}} onClick={onClick}>
		{ children }
	</button>
)

export default BlueButton;
