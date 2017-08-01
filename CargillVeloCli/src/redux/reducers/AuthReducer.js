
import { AlertIOS } from 'react-native';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_FAIL,
    LOGIN_USER,
    BACK_TO_ORDERS, USER_SWITCH_CHANGED, LOGIN_SUCCESS
} from '../actions/types';


const INITIAL_STATE = { email: '',
                        password: '',
                        error: '',
                        msg: '',
                       loading: false,
                        saveUser: false
                         };
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case EMAIL_CHANGED:
            return Object.assign({}, state, { email: action.payload });
        case PASSWORD_CHANGED:
            return Object.assign({}, state, { password: action.payload });
        case LOGIN_USER:
            return Object.assign({}, state, {loading:true, error: ''});
        case LOGIN_SUCCESS:
            return Object.assign({},state, { loading: false, error: ''});
        case LOGIN_FAIL:
            return Object.assign({}, state, { error: 'Authentication Failed',
                password: '',
                email: '',
                message: AlertIOS.alert(
                    'Error',
                    'Invalid Username or Password'
                ),
                loading: false
            })
        case USER_SWITCH_CHANGED:
            return Object.assign({}, state, {saveUser: action.payload});
        case BACK_TO_ORDERS:
            return { ...state }

        default:
            return state;
    }
};
