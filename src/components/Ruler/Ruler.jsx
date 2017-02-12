import React, { Component, PropTypes } from 'react';
import { drawRuler } from './utils';

import {
	rulerHorizontal,
} from './styles';

export default class Ruler extends Component {
	constructor (props) {
		super(props);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.state = {
			title: null,
			rulerDataURL: drawRuler(this.props),
		};
	}

	componentWillReceiveProps (props) {
		this.setState({
			rulerDataURL: drawRuler(props),
		});
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
				className={ rulerHorizontal }
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
