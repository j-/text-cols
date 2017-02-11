import { connect } from 'react-redux';
import Textarea from './Textarea';

import {
	getTextContent,
	getCols,
	getFontWidth,
	getFontSize,
	getGridStyle,
} from '../reducers';

import {
	setTextContent,
} from '../reducers/actions';

const mapStateToProps = (state) => ({
	cols: getCols(state),
	textContent: getTextContent(state),
	fontWidth: getFontWidth(state),
	fontSize: getFontSize(state),
	gridStyle: getGridStyle(state),
});

const mapDispatchToProps = {
	setTextContent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Textarea);
