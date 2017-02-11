import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getTextWidth } from './measureText';

import reducer, {
	getCols as getColsFromState,
	getTabWidth as getTabWidthFromState,
	getTextContent as getTextContentFromState,
	getFontSize as getFontSizeFromState,
	getFontStyle as getFontStyleFromState,
	getTickStyle as getTickStyleFromState,
	getGridStyle as getGridStyleFromState,
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

var currentCols = getColsFromState(store.getState());

function setCols (cols) {
	currentCols = cols;
	store.dispatch(
		setColsToState(cols)
	);
}

function getCols () {
	return getColsFromState(store.getState());
}

const INPUT_FONT = getFontStyleFromState(store.getState());
const TEST_CHAR = String.fromCharCode(0x20); // Space
const CHAR_WIDTH = getTextWidth(TEST_CHAR, INPUT_FONT);
const CHAR_HEIGHT = getFontSizeFromState(store.getState());

const inputText = document.getElementById('text-input');
const dragHandle = document.querySelector('#section-splitter > .drag-handle');
const rulerHorizontal = document.getElementById('ruler-horizontal');

inputText.style.font = INPUT_FONT;
inputText.value = getTextContentFromState(store.getState());

/* DRAG HANDLE */

var initialWidth = null;
var initialX = null;
var initialY = null;
var initialOffsetX = null;
var initialOffsetY = null;
var currentX = null;
var currentY = null;
var initialCols = null;

function handleDragging () {
	var newWidth = Math.max(currentX, 0);
	newWidth = Math.round(newWidth / CHAR_WIDTH);
	setCols(newWidth, true);
}

function handleStartDragging () {
	initialCols = currentCols;
	document.body.classList.add('cursor-col-resize');
}

function handleCancelDragging () {
	setCols(initialCols, true);
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
		return;
	}
	e.preventDefault();
	initializePosition(e);
	setupDragListeners();
});

/* TAB WIDTH */

var currentTabWidth = getTabWidthFromState(store.getState());

function setTabWidth (width) {
	inputText.style.tabSize = width;
	inputTabwidth.value = width;
}

function getTabWidth () {
	return Number(inputTabwidth.value);
}

function updateTabWidth () {
	const width = getTabWidth();
	setTabWidth(width);
}
