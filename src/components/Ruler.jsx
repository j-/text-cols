import React, { Component, PropTypes } from 'react';

export default class Ruler extends Component {
	constructor (props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = {
			title: null,
			rulerDataURL: this.drawRuler(this.props),
		};
	}

	componentWillReceiveProps (props) {
		this.setState({
			rulerDataURL: this.drawRuler(props),
		});
	}

	drawRuler (props) {
		const { charWidth, tickStyle, rulersToRender, height } = props;
		const rulerWidth = charWidth * 5 * rulersToRender;
		const rulerHeight = height;
		const rulerTicks = arrTimes([5, 5, 5, 5, 10], rulersToRender);

		const horizontalRulerCanvas = document.createElement('canvas');
		const horizontalRulerContext = horizontalRulerCanvas.getContext('2d');

		horizontalRulerCanvas.width = Math.min(rulerWidth, 10000);
		horizontalRulerCanvas.height = rulerHeight;

		horizontalRulerContext.strokeStyle = tickStyle;
		horizontalRulerContext.translate(0.5, 0);

		drawHorizontalRuler(
			horizontalRulerContext,
			rulerWidth,
			rulerHeight,
			rulerTicks
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
	rulersToRender: PropTypes.number,
	height: PropTypes.number,
};

Ruler.defaultProps = {
	rulersToRender: 50,
	height: 10,
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
