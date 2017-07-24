import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_USER,
    SWITCH_CHANGED,
    CANCEL_BUTTON_PRESSED,
    BACK_TO_ORDERS
} from '../actions/types';

const INITIAL_STATE = { email: '', password: '', error: '', message: '', loading: false, msg: '' }
export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_SUCCESS:
            return { ...state, message: 'Login Success', error: '', loading: false }
        case SWITCH_CHANGED:
            return { ...state, msg: 'Credentials Saved' }
        case LOGIN_FAIL:
            return { ...state,
                error: 'Authentication Failed',
                password: '',
                email: '',
                message: '',
                loading: false
            }
        case CANCEL_BUTTON_PRESSED:
            return { ...state, message: 'Are you Sure? ' }
        case BACK_TO_ORDERS:
            return { ...state }
        default:
            return state;
    }
};
