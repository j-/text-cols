import React, { Component, PropTypes } from 'react';

export default class Ruler extends Component {
	constructor (props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = {
			title: null,
			rulerDataURL: this.drawRuler(),
		};
	}

	componentWillReceiveProps (props) {
		this.setState({
			rulerDataURL: this.drawRuler(),
		});
	}

	drawRuler () {
		const CHAR_WIDTH = this.props.charWidth;

		const RULERS_TO_RENDER = 100;
		const RULER_WIDTH = CHAR_WIDTH * 5 * RULERS_TO_RENDER;
		const RULER_HEIGHT = 10;
		const RULER_TICKS = arrTimes([5, 5, 5, 5, 10], RULERS_TO_RENDER);
		const RULER_TICK_COLOR = this.props.tickStyle;

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

		return horizontalRulerCanvas.toDataURL();
	}

	handleMouseMove (e) {
		const x = e.screenX;
		const i = Math.round(x / this.props.charWidth);
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
	charWidth: PropTypes.number.isRequired,
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
