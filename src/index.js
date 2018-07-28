import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoute from './container';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<AppRoute />, document.getElementById('root'));
registerServiceWorker();
