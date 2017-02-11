import {
	SET_COLS,
	SET_TAB_WIDTH,
	SET_TEXT_CONTENT,
	SET_FONT_SIZE,
} from './types';

export const setCols = (cols) => ({
	type: SET_COLS,
	cols,
});

export const setTabWidth = (tabWidth) => ({
	type: SET_TAB_WIDTH,
	tabWidth,
});

export const setTextContent = (textContent) => ({
	type: SET_TEXT_CONTENT,
	textContent,
});

export const setFontSize = (size) => ({
	type: SET_FONT_SIZE,
	size,
});
