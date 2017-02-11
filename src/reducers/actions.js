import {
	SET_COLS,
	SET_TAB_SIZE,
	SET_TEXT_CONTENT,
	SET_FONT_SIZE,
} from './types';

export const setCols = (cols) => ({
	type: SET_COLS,
	cols: Number(cols),
});

export const setTabSize = (tabSize) => ({
	type: SET_TAB_SIZE,
	tabSize: Number(tabSize),
});

export const setFontSize = (size) => ({
	type: SET_FONT_SIZE,
	size: Number(size),
});

export const setTextContent = (textContent) => ({
	type: SET_TEXT_CONTENT,
	textContent: String(textContent),
});
