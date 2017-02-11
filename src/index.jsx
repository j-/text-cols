import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer, {
	getCols as getColsFromState,
	getTabWidth as getTabWidthFromState,
	getTextContent as getTextContentFromState,
	getFontSize as getFontSizeFromState,
	getFontStyle as getFontStyleFromState,
} from './reducers';

import './styles';

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>,
	document.getElementById('app')
);

var currentCols = getColsFromState(store.getState());

function measureText (text, font) {
	measureTextContext.font = font;
	return measureTextContext.measureText(text).width;
}

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

const measureTextCanvas = document.createElement('canvas');
const measureTextContext = measureTextCanvas.getContext('2d');

const INPUT_FONT = getFontStyleFromState(store.getState());
const TEST_CHAR = String.fromCharCode(0x20); // Space
const CHAR_WIDTH = measureText(TEST_CHAR, INPUT_FONT);
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

/* RULER */

function drawHorizontalRuler (ctx, width, height, ticks) {
	const numTicks = ticks.length;
	const tickWidth = width / numTicks;
	var x, y;
	for (var i = 0; i < numTicks; i++) {
		x = (i + 1) * tickWidth;
		y = height - ticks[i];
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x, height);
		ctx.closePath();
		ctx.stroke();
	}
}

function arrTimes (arr, times) {
	const result = [];
	for (var i = 0; i < times; i++) {
		result.splice(result.length, 0, ...arr);
	}
	return result;
}

const RULERS_TO_RENDER = 100;
const RULER_WIDTH = CHAR_WIDTH * 5 * RULERS_TO_RENDER;
const RULER_HEIGHT = 10;
const RULER_TICKS = arrTimes([5, 5, 5, 5, 10], RULERS_TO_RENDER);
const RULER_TICK_COLOR = '#ccc';

const horizontalRulerCanvas = document.createElement('canvas');
const horizontalRulerContext = horizontalRulerCanvas.getContext('2d');

horizontalRulerCanvas.width = RULER_WIDTH;
horizontalRulerCanvas.height = RULER_HEIGHT;

horizontalRulerContext.strokeStyle = RULER_TICK_COLOR;
horizontalRulerContext.translate(0.5, 0);

drawHorizontalRuler(
	horizontalRulerContext,
	RULER_WIDTH,
	RULER_HEIGHT,
	RULER_TICKS
);

const rulerDataURL = horizontalRulerCanvas.toDataURL();
rulerHorizontal.style.backgroundImage = 'url(' + rulerDataURL + ')';

rulerHorizontal.addEventListener('mousemove', (e) => {
	const x = e.offsetX;
	const i = Math.round(x / CHAR_WIDTH);
	rulerHorizontal.title = i;
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
const GRID_LINE_COLOR = '#eee';

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
