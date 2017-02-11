import { connect } from 'react-redux';
import Config from './Config';

import {
	getCols,
	getTabWidth,
	getFontSize,
} from '../reducers';

import {
	setCols,
	setTabWidth,
	setFontSize,
} from '../reducers/actions';

const mapStateToProps = (state) => ({
	cols: getCols(state),
	tabWidth: getTabWidth(state),
	fontSize: getFontSize(state),
});

const mapDispatchToProps = {
	setCols,
	setTabWidth,
	setFontSize,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Config);
