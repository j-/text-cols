import { connect } from 'react-redux';
import DragHandle from './DragHandle';

import {
	getCols,
	getFontWidth,
} from '../../reducers';

import {
	setCols,
} from '../../reducers/actions';

const mapStateToProps = (state) => ({
	cols: getCols(state),
	fontWidth: getFontWidth(state),
});

const mapDispatchToProps = {
	setCols,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DragHandle);
