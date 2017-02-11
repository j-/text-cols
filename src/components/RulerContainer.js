import { connect } from 'react-redux';
import Ruler from './Ruler';

import {
	getFontSize,
	getTickStyle,
} from '../reducers';

const connectStateToProps = (state) => ({
	charHeight: getFontSize(state),
	tickStyle: getTickStyle(state),
});

export default connect(
	connectStateToProps
)(Ruler);
