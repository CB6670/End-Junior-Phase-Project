import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './components/App';
import {HashRouter} from 'react-router-dom';

const root = document.getElementById('root');

render(<Provider store = {store}><HashRouter><App /></HashRouter></Provider>, root);