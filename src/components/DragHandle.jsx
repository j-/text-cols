import React, { Component, PropTypes } from 'react';

const MOUSE_LEFT = 0;

export default class DragHandle extends Component {
	constructor (props) {
		super(props);
		this.initialWidth = null;
		this.initialX = null;
		this.initialY = null;
		this.initialOffsetX = null;
		this.initialOffsetY = null;
		this.currentX = null;
		this.currentY = null;
		this.initialCols = null;
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	handleDragging () {
		const newWidth = Math.max(this.currentX, 0);
		const charWidth = this.props.fontWidth;
		const cols = Math.round(newWidth / charWidth);
		this.props.setCols(cols);
	}

	handleStartDragging () {
		this.initialCols = this.props.cols;
		document.body.classList.add('cursor-col-resize');
	}

	handleCancelDragging () {
		this.props.setCols(this.initialCols);
	}

	handleStopDragging () {
		document.body.classList.remove('cursor-col-resize');
	}

	cancelDrag () {
		this.resetPosition();
		this.handleCancelDragging();
	}

	handleKeyDown (e) {
		if (e.which === 0x1b) {
			// Escape key pressed
			this.cancelDrag();
		}
	}

	initializePosition (e) {
		// TODO: Reimplement offsetX, offsetY.
		// These represented the position of the cursor
		// relative to the drag handle itself.
		this.initialOffsetX = 0;
		this.initialOffsetY = 0;
		this.initialX = e.clientX - this.initialOffsetX;
		this.initialY = e.clientY - this.initialOffsetY;
		this.handleStartDragging();
	}

	updatePosition (e) {
		this.currentX = e.clientX - this.initialOffsetX;
		this.currentY = e.clientY - this.initialOffsetY;
		this.handleDragging();
	}

	finalizePosition () {
		this.endDragging();
	}

	resetPosition () {
		this.endDragging();
	}

	endDragging () {
		this.handleStopDragging();
		this.destroyDragListeners();
	}

	handleMouseMove (e) {
		this.updatePosition(e);
	}

	handleMouseUp (e) {
		this.finalizePosition(e);
	}

	handleMouseDown (e) {
		if (e.button !== MOUSE_LEFT) {
			// Left click to drag only
			// Exit early
			return;
		}
		e.preventDefault();
		this.initializePosition(e);
		this.setupDragListeners();
	}

	setupDragListeners () {
		window.addEventListener('keydown', this.handleKeyDown);
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	destroyDragListeners () {
		window.removeEventListener('keydown', this.handleKeyDown);
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
	}

	render () {
		return (
			<div
				className="drag-handle"
				onMouseDown={ this.handleMouseDown }
			/>
		);
	}
}

DragHandle.propTypes = {
	fontWidth: PropTypes.number.isRequired,
	cols: PropTypes.number.isRequired,
	setCols: PropTypes.func.isRequired,
};
