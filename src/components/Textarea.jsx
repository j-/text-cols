import React, { PropTypes } from 'react';

const Textarea = ({ textContent, setTextContent }) => (
	<textarea
		id="text-input"
		className="pane pane-left"
		placeholder="Type here..."
		value={ textContent }
		onChange={ (e) => setTextContent(e.target.value) }
	/>
);

Textarea.propTypes = {
	textContent: PropTypes.string.isRequired,
	setTextContent: PropTypes.func.isRequired,
};

export default Textarea;
