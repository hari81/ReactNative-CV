
import { AlertIOS, AsyncStorage } from 'react-native';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_USER,
    BACK_TO_ORDERS, SWITCH_CHANGED
} from '../actions/types';


const INITIAL_STATE = { email: '',
                        password: '',
                        error: '',
                        loading: false,
                        msg: '',
                        userData: ''
                         }
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case EMAIL_CHANGED:
            return Object.assign({}, state, { email: action.payload });
        case PASSWORD_CHANGED:
            return Object.assign({}, state, { password: action.payload });
        case LOGIN_USER:
            return Object.assign({}, state, { loading: true, error: '' });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, { loading: false, error: '' });
        case LOGIN_FAIL:
            return Object.assign({}, state, { error: 'Authentication Failed',
                password: '',
                email: '',
                message: AlertIOS.alert(
                    'Invalid',
                    'Eigher Username or Password is incorrect'
                ),
                loading: false
            })
        case BACK_TO_ORDERS:
            return { ...state }

        default:
            return state;
    }
};
