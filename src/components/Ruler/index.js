import { connect } from 'react-redux';
import Ruler from './Ruler';

import {
	getFontWidth,
	getTickStyle,
} from '../../reducers';

const mapStateToProps = (state) => ({
	charWidth: getFontWidth(state),
	tickStyle: getTickStyle(state),
});

export default connect(
	mapStateToProps
)(Ruler);
