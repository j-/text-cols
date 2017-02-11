const measureTextCanvas = document.createElement('canvas');
const measureTextContext = measureTextCanvas.getContext('2d');

export function getTextWidth (text, font) {
	measureTextContext.font = font;
	return measureTextContext.measureText(text).width;
}
