import React from 'react';
import Config from './ConfigContainer';
import Ruler from './RulerContainer';
import Textarea from './TextareaContainer';
import DragHandle from './DragHandleContainer';

const App = () => (
	<div className="app">
		<Config />
		<Ruler />
		<section className="section-splitter">
			<Textarea />
			<DragHandle />
		</section>
	</div>
);

export default App;
