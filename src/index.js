import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';


require('./stylesheets/main.scss');

ReactDOM.render(<App/>, document.querySelector('#app_container'));