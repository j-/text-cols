const measureTextCanvas = document.createElement('canvas');
const measureTextContext = measureTextCanvas.getContext('2d');

export function getTextWidth (textToMeasure, fontStyle) {
	measureTextContext.font = fontStyle;
	return measureTextContext.measureText(textToMeasure).width;
}
