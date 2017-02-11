import React, { PropTypes } from 'react';

const Config = ({
	cols,
	tabWidth,
	fontSize,
	setCols,
	setTabWidth,
	setFontSize,
}) => (
	<section id="section-config">
		<form id="config">
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
					value={ tabWidth }
					onChange={ (e) => setTabWidth(e.target.value) }
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
	</section>
);

Config.propTypes = {
	cols: PropTypes.number.isRequired,
	tabWidth: PropTypes.number.isRequired,
	fontSize: PropTypes.number.isRequired,
	setCols: PropTypes.func.isRequired,
	setTabWidth: PropTypes.func.isRequired,
	setFontSize: PropTypes.func.isRequired,
};

export default Config;
