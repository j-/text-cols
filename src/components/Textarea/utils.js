const GRID_LINES_TO_RENDER = 250;
const MAX_CANVAS_DIMENSION = 10000;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function drawVerticalGridLineSection (ctx, tickWidth, numTicks) {
	let x;
	for (let i = 0; i < numTicks; i++) {
		x = (i + 1) * tickWidth;
		ctx.fillRect(x, 0, 1, 1);
	}
}

function drawHorizontalGridLineSection (ctx, tickHeight, numTicks) {
	let y;
	for (let i = 0; i < numTicks; i++) {
		y = (i + 1) * tickHeight;
		ctx.fillRect(0, y, 1, 1);
	}
}

export function drawVerticalLines ({ fontWidth, gridStyle }) {
	canvas.width = Math.min(
		fontWidth * GRID_LINES_TO_RENDER,
		MAX_CANVAS_DIMENSION
	);
	canvas.height = 1;

	ctx.fillStyle = gridStyle;
	ctx.translate(0.5, 0);

	drawVerticalGridLineSection(ctx, fontWidth, GRID_LINES_TO_RENDER);

	return canvas.toDataURL();
}

export function drawHorizontalLines ({ fontSize, gridStyle }) {
	canvas.width = 1;
	canvas.height = Math.min(
		fontSize * GRID_LINES_TO_RENDER,
		MAX_CANVAS_DIMENSION
	);

	ctx.fillStyle = gridStyle;
	ctx.translate(0, 1.5);

	drawHorizontalGridLineSection(ctx, fontSize, GRID_LINES_TO_RENDER);

	return canvas.toDataURL();
}
