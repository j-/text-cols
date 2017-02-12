import React, { PropTypes } from 'react';

const Config = ({
	cols,
	tabSize,
	fontSize,
	setCols,
	setTabSize,
	setFontSize,
}) => (
	<form className="config">
		<div className="form-group">
			<label htmlFor="config-cols">Cols</label>
			<input
				id="config-cols"
				type="number"
				min="1"
				value={ cols }
				onChange={ (e) => setCols(e.target.value) }
			/>
		</div>
		<div className="form-group">
			<label htmlFor="config-tabwidth">Tab width</label>
			<input
				id="config-tabwidth"
				type="number"
				min="1"
				value={ tabSize }
				onChange={ (e) => setTabSize(e.target.value) }
			/>
		</div>
		<div className="form-group">
			<label htmlFor="config-fontsize">Font size (px)</label>
			<input
				id="config-fontsize"
				type="number"
				min="1"
				value={ fontSize }
				onChange={ (e) => setFontSize(e.target.value) }
			/>
		</div>
	</form>
);

Config.propTypes = {
	cols: PropTypes.number.isRequired,
	tabSize: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
	setCols: PropTypes.func.isRequired,
	setTabSize: PropTypes.func.isRequired,
	setFontSize: PropTypes.func.isRequired,
};

export default Config;
