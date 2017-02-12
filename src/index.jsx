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

const dragHandle = document.querySelector('#section-splitter > .drag-handle');

/* DRAG HANDLE */

let initialWidth = null;
let initialX = null;
let initialY = null;
let initialOffsetX = null;
let initialOffsetY = null;
let currentX = null;
let currentY = null;
let initialCols = null;

function handleDragging () {
	const newWidth = Math.max(currentX, 0);
	const charWidth = getFontWidth(store.getState());
	const cols = Math.round(newWidth / charWidth);
	store.dispatch(
		setColsToState(cols)
	);
}

function handleStartDragging () {
	initialCols = getCols(store.getState());
	document.body.classList.add('cursor-col-resize');
}

function handleCancelDragging () {
	store.dispatch(
		setColsToState(initialCols)
	);
}

function handleStopDragging () {
	document.body.classList.remove('cursor-col-resize');
}

/* DRAG INTERNALS */

function cancelDrag () {
	resetPosition();
	handleCancelDragging();
}

function handleKeydown (e) {
	if (e.which === 0x1b) {
		// Escape key pressed
		cancelDrag();
	}
}

function initializePosition (e) {
	initialOffsetX = e.offsetX;
	initialOffsetY = e.offsetY;
	initialX = e.clientX - initialOffsetX;
	initialY = e.clientY - initialOffsetY;
	handleStartDragging();
}

function updatePosition (e) {
	currentX = e.clientX - initialOffsetX;
	currentY = e.clientY - initialOffsetY;
	handleDragging();
}

function finalizePosition (e) {
	endDragging();
}

function resetPosition () {
	endDragging();
}

function endDragging () {
	handleStopDragging();
	destroyDragListeners();
}

function handleMousemove (e) {
	updatePosition(e);
}

function handleMouseup (e) {
	finalizePosition(e);
}

function destroyDragListeners () {
	window.removeEventListener('keydown', handleKeydown);
	window.removeEventListener('mousemove', handleMousemove);
	window.removeEventListener('mouseup', handleMouseup);
}

function setupDragListeners () {
	window.addEventListener('keydown', handleKeydown);
	window.addEventListener('mousemove', handleMousemove);
	window.addEventListener('mouseup', handleMouseup);
}

dragHandle.addEventListener('mousedown', function (e) {
	if (e.which !== 1) {
		// Left click to drag only
		// Exit early
		return;
	}
	e.preventDefault();
	initializePosition(e);
	setupDragListeners();
});
