import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import cancelorder from './CancelOrder';
import vieworders from './ViewOrdersReducer';

export default combineReducers({
    auth: AuthReducer,
    cancelItem: cancelorder,
    vieworder: vieworders

});
