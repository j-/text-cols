import { connect } from 'react-redux';
import Config from './Config';

import {
	getCols,
	getTabWidth,
} from '../reducers';

import {
	setCols,
	setTabWidth,
} from '../reducers/actions';

const mapStateToProps = (state) => ({
	cols: getCols(state),
	tabWidth: getTabWidth(state),
});

const mapDispatchToProps = {
	setCols,
	setTabWidth,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Config);
