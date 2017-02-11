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

function setCols (cols, updateInput) {
	currentCols = cols;
	if (updateInput) {
		inputCols.value = cols;
	}
	inputText.style.width = (CHAR_WIDTH * cols) + 'px';
}

function getCols () {
	return Number(inputCols.value);
}

function resizeCols () {
	const cols = getCols();
	setCols(cols, false);
}

const INPUT_FONT = getFontStyleFromState(store.getState());
const TEST_CHAR = String.fromCharCode(0x20); // Space
const CHAR_WIDTH = getTextWidth(TEST_CHAR, INPUT_FONT);
const CHAR_HEIGHT = getFontSizeFromState(store.getState());

const inputCols = document.getElementById('config-cols');
const inputTabwidth = document.getElementById('config-tabwidth');
const inputText = document.getElementById('text-input');
const dragHandle = document.querySelector('#section-splitter > .drag-handle');
const rulerHorizontal = document.getElementById('ruler-horizontal');

inputText.style.font = INPUT_FONT;
inputText.value = getTextContentFromState(store.getState());

inputCols.addEventListener('input', resizeCols);

setCols(currentCols, true);

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

/* GRID LINES */

function drawVerticalGridLineSection (ctx, tickWidth, numTicks) {
	var x;
	for (var i = 0; i < numTicks; i++) {
		x = (i + 1) * tickWidth;
		ctx.fillRect(x, 0, 1, 1);
	}
}

function drawHorizontalGridLineSection (ctx, tickHeight, numTicks) {
	var y;
	for (var i = 0; i < numTicks; i++) {
		y = (i + 1) * tickHeight;
		ctx.fillRect(0, y, 1, 1);
	}
}

const GRID_LINES_TO_RENDER = 100 * 5;
const GRID_LINE_COLOR = getGridStyleFromState(store.getState());

const gridLineSectionCanvas = document.createElement('canvas');
const gridLineSectionContext = gridLineSectionCanvas.getContext('2d');

gridLineSectionCanvas.width = CHAR_WIDTH * GRID_LINES_TO_RENDER;
gridLineSectionCanvas.height = 1;

gridLineSectionContext.fillStyle = GRID_LINE_COLOR;
gridLineSectionContext.translate(0.5, 0);

drawVerticalGridLineSection(gridLineSectionContext, CHAR_WIDTH, GRID_LINES_TO_RENDER);

const vertialLinesDataURL = gridLineSectionCanvas.toDataURL();

gridLineSectionCanvas.width = 1;
gridLineSectionCanvas.height = CHAR_HEIGHT * GRID_LINES_TO_RENDER;

gridLineSectionContext.fillStyle = GRID_LINE_COLOR;
gridLineSectionContext.translate(0, 1.5);

drawHorizontalGridLineSection(gridLineSectionContext, CHAR_HEIGHT, GRID_LINES_TO_RENDER);

const horizontalLinesDataURL = gridLineSectionCanvas.toDataURL();

inputText.style.backgroundImage = 'url("' + vertialLinesDataURL + '"), url("' + horizontalLinesDataURL + '")';

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

inputTabwidth.addEventListener('input', updateTabWidth);

setTabWidth(currentTabWidth);
