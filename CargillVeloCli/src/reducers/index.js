import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import cancelorder from './cancelOrder';

export default combineReducers({
    auth: AuthReducer,
    cancelItem: cancelorder

});
