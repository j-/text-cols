import { connect } from 'react-redux';
import Textarea from './Textarea';

import {
	getTextContent,
	getCols,
	getFontStyle,
	getFontWidth,
	getFontSize,
	getGridStyle,
	getTabSize,
} from '../reducers';

import {
	setTextContent,
} from '../reducers/actions';

const mapStateToProps = (state) => ({
	cols: getCols(state),
	textContent: getTextContent(state),
	fontStyle: getFontStyle(state),
	fontWidth: getFontWidth(state),
	fontSize: getFontSize(state),
	gridStyle: getGridStyle(state),
	tabSize: getTabSize(state),
});

const mapDispatchToProps = {
	setTextContent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Textarea);
