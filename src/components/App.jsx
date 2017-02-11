import React from 'react';
import Config from './ConfigContainer';
import Ruler from './RulerContainer';
import Textarea from './TextareaContainer';

const App = () => (
	<div className="app">
		<Config />
		<Ruler />
		<section id="section-splitter">
			<Textarea />
			<div className="drag-handle"></div>
			<section className="pane pane-right"></section>
		</section>
	</div>
);

export default App;
