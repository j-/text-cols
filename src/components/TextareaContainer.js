import { connect } from 'react-redux';
import Textarea from './Textarea';

import {
	getTextContent,
	getCols,
	getFontWidth,
} from '../reducers';

import {
	setTextContent,
} from '../reducers/actions';

const mapStateToProps = (state) => ({
	textContent: getTextContent(state),
	width: getCols(state) * getFontWidth(state),
});

const mapDispatchToProps = {
	setTextContent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Textarea);
