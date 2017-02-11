import React, { Component, PropTypes } from 'react';

export default class Textarea extends Component {
	constructor (props) {
		super(props);
		this.state = {
			backgroundImage: this.getBackgroundImageStyle(props),
		};
	}

	componentWillReceiveProps (nextProps) {
		this.setState({
			backgroundImage: this.getBackgroundImageStyle(nextProps),
		});
	}

	getBackgroundImageStyle (props) {
		const { gridStyle, fontWidth, fontSize } = props;

		const GRID_LINES_TO_RENDER = 100 * 5;

		const gridLineSectionCanvas = document.createElement('canvas');
		const gridLineSectionContext = gridLineSectionCanvas.getContext('2d');

		gridLineSectionCanvas.width = fontWidth * GRID_LINES_TO_RENDER;
		gridLineSectionCanvas.height = 1;

		gridLineSectionContext.fillStyle = gridStyle;
		gridLineSectionContext.translate(0.5, 0);

		drawVerticalGridLineSection(gridLineSectionContext, fontWidth, GRID_LINES_TO_RENDER);

		const verticalLinesDataURL = gridLineSectionCanvas.toDataURL();

		gridLineSectionCanvas.width = 1;
		gridLineSectionCanvas.height = fontSize * GRID_LINES_TO_RENDER;

		gridLineSectionContext.fillStyle = gridStyle;
		gridLineSectionContext.translate(0, 1.5);

		drawHorizontalGridLineSection(gridLineSectionContext, fontSize, GRID_LINES_TO_RENDER);

		const horizontalLinesDataURL = gridLineSectionCanvas.toDataURL();

		return 'url("' + verticalLinesDataURL + '"), url("' + horizontalLinesDataURL + '")';
	}

	render () {
		const { textContent, setTextContent, cols, fontSize, fontWidth, tabWidth } = this.props;
		const { backgroundImage } = this.state;
		const tabSize = tabWidth;
		const width = cols * fontWidth;
		return (
			<textarea
				id="text-input"
				className="pane pane-left"
				placeholder="Type here..."
				value={ textContent }
				onChange={ (e) => setTextContent(e.target.value) }
				style={{ width, backgroundImage, fontSize, tabSize }}
			/>
		);
	}
}

Textarea.propTypes = {
	cols: PropTypes.number.isRequired,
	textContent: PropTypes.string.isRequired,
	setTextContent: PropTypes.func.isRequired,
	gridStyle: PropTypes.string.isRequired,
	fontWidth: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
	tabWidth: PropTypes.number.isRequired,
};

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
