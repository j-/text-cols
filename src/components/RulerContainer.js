import { connect } from 'react-redux';
import Ruler from './Ruler';

import {
	getFontWidth,
	getTickStyle,
} from '../reducers';

const connectStateToProps = (state) => ({
	charWidth: getFontWidth(state),
	tickStyle: getTickStyle(state),
});

export default connect(
	connectStateToProps
)(Ruler);
