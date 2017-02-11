import React, { Component, PropTypes } from 'react';

export default class Ruler extends Component {
	constructor (props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);

		const CHAR_HEIGHT = props.fontSize;
		const CHAR_WIDTH = 10.8017578125; // TODO: Calculate this

		const RULERS_TO_RENDER = 100;
		const RULER_WIDTH = CHAR_WIDTH * 5 * RULERS_TO_RENDER;
		const RULER_HEIGHT = 10;
		const RULER_TICKS = arrTimes([5, 5, 5, 5, 10], RULERS_TO_RENDER);
		const RULER_TICK_COLOR = props.tickStyle;

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

		this.state = {
			title: null,
			charWidth: CHAR_WIDTH,
			rulerDataURL: horizontalRulerCanvas.toDataURL(),
		};
	}

	handleMouseMove (e) {
		const x = e.screenX;
		const i = Math.round(x / this.state.charWidth);
		this.setState({
			title: i,
		});
	}

	render () {
		const { title, rulerDataURL } = this.state;
		return (
			<div
				className="ruler ruler-horizontal"
				onMouseMove={ this.handleMouseMove }
				title={ title }
				style={{
					backgroundImage: `url(${rulerDataURL}`,
				}}
			/>
		);
	}
}

Ruler.propTypes = {
	charHeight: PropTypes.number.isRequired,
	tickStyle: PropTypes.string.isRequired,
};

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
