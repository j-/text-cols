import { connect } from 'react-redux';
import Config from './Config';

import {
	getCols,
	getTabSize,
	getFontSize,
} from '../../reducers';

import {
	setCols,
	setTabSize,
	setFontSize,
} from '../../reducers/actions';

const mapStateToProps = (state) => ({
	cols: getCols(state),
	tabSize: getTabSize(state),
	fontSize: getFontSize(state),
});

const mapDispatchToProps = {
	setCols,
	setTabSize,
	setFontSize,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Config);
