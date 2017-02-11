import React, { PropTypes } from 'react';

const Textarea = ({ textContent, setTextContent, width }) => (
	<textarea
		id="text-input"
		className="pane pane-left"
		placeholder="Type here..."
		value={ textContent }
		onChange={ (e) => setTextContent(e.target.value) }
		style={{ width }}
	/>
);

Textarea.propTypes = {
	textContent: PropTypes.string.isRequired,
	setTextContent: PropTypes.func.isRequired,
	width: PropTypes.number.isRequired,
};

export default Textarea;
