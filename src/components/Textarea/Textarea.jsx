import React, { Component, PropTypes } from 'react';

import {
	drawVerticalLines,
	drawHorizontalLines,
} from './utils';

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

		const horizontalLinesDataURL = drawHorizontalLines({ fontSize, gridStyle });
		const verticalLinesDataURL = drawVerticalLines({ fontWidth, gridStyle });

		return 'url("' + verticalLinesDataURL + '"), url("' + horizontalLinesDataURL + '")';
	}

	render () {
		const {
			textContent,
			setTextContent,
			cols,
			fontStyle,
			fontWidth,
			tabSize
		} = this.props;
		const { backgroundImage } = this.state;
		const width = cols * fontWidth;
		const font = fontStyle;
		return (
			<textarea
				className="pane pane-left text-input"
				placeholder="Type here..."
				value={ textContent }
				spellCheck={ false }
				onChange={ (e) => setTextContent(e.target.value) }
				style={{
					width,
					backgroundImage,
					font,
					tabSize
				}}
			/>
		);
	}
}

Textarea.propTypes = {
	cols: PropTypes.number.isRequired,
	textContent: PropTypes.string.isRequired,
	setTextContent: PropTypes.func.isRequired,
	gridStyle: PropTypes.string.isRequired,
	fontStyle: PropTypes.string.isRequired,
	fontWidth: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
	tabSize: PropTypes.number.isRequired,
};
