import { connect } from 'react-redux';
import Textarea from './Textarea';

import {
	getTextContent,
} from '../reducers';

import {
	setTextContent,
} from '../reducers/actions';

const mapStateToProps = (state) => ({
	textContent: getTextContent(state),
});

const mapDispatchToProps = {
	setTextContent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Textarea);
