import React from 'react';
import Config from '../Config';
import Ruler from '../Ruler';
import Textarea from '../Textarea';
import DragHandle from '../DragHandle';

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
