import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import cancelorder from './CancelOrder';

export default combineReducers({
    auth: AuthReducer,
    cancelItem: cancelorder
});
