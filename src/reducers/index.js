import {
	getTextWidth,
} from '../measureText';

import {
	SET_COLS,
	SET_TAB_WIDTH,
	SET_TEXT_CONTENT,
	SET_FONT_SIZE,
} from './types';

const INITIAL_STATE = {
	cols: 80,
	tabWidth: 4,
	textContent: '',
	fontSize: 18,
	fontWidth: 10.8017578125,
	lineHeight: 1,
	tickStyle: '#ccc',
	gridStyle: '#eee',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_COLS:
			return {
				...state,
				cols: action.cols,
			};
		case SET_TAB_WIDTH:
			return {
				...state,
				tabWidth: action.tabWidth,
			};
		case SET_TEXT_CONTENT:
			return {
				...state,
				textContent: action.textContent,
			};
		case SET_FONT_SIZE:
			return {
				...state,
				fontSize: action.size,
				fontWidth: getTextWidth('\xa0', getFontStyle({
					...state,
					fontSize: action.size,
				})),
			};
		default:
			return state;
	}
};

export const getCols = (state) => state.cols;
export const getTabWidth = (state) => state.tabWidth;
export const getTextContent = (state) => state.textContent;
export const getFontSize = (state) => state.fontSize;
export const getFontWidth = (state) => state.fontWidth;
export const getLineHeight = (state) => state.lineHeight;
export const getFontStyle = (state) => {
	const fontSize = getFontSize(state);
	const lineHeight = getLineHeight(state);
	return `${fontSize}px/${lineHeight} monospace`;
};
export const getTickStyle = (state) => state.tickStyle;
export const getGridStyle = (state) => state.gridStyle;
