import { connect } from 'react-redux';
import Textarea from './Textarea';

import {
	getTextContent,
} from '../reducers';

import {
	setTextContent,
} from '../reducers/actions';

const connectStateToProps = (state) => ({
	textContent: getTextContent(state),
});

const connectDispatchToProps = {
	setTextContent,
};

export default connect(
	connectStateToProps,
	connectDispatchToProps
)(Textarea);
