import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';

unregister();
/*
does not seem really necessary
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();
*/

ReactDOM.render(<App />, document.getElementById('root'));
