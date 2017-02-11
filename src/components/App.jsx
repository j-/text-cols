import React from 'react';
import Ruler from './RulerContainer';
import Textarea from './Textarea';

const App = () => (
	<div className="app">
		<section id="section-config">
			<form id="config">
				<div className="form-group">
					<label htmlFor="config-cols">Cols</label>
					<input id="config-cols" type="number" min="1" />
				</div>
				<div className="form-group">
					<label htmlFor="config-tabwidth">Tab width</label>
					<input id="config-tabwidth" type="number" min="1" />
				</div>
			</form>
		</section>
		<Ruler />
		<section id="section-splitter">
			<Textarea />
			<div className="drag-handle"></div>
			<section className="pane pane-right"></section>
		</section>
	</div>
);

export default App;
