import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getTextWidth } from './measureText';

import reducer, {
	getCols,
	getFontWidth,
} from './reducers';

import {
	setCols as setColsToState,
} from './reducers/actions';

import './styles';

const devtools = (
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(reducer, undefined, devtools);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('app')
);
