import { AlertIOS } from 'react-native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_FAIL,
  LOGIN_USER,
  LOG_OUT,
  USER_SWITCH_CHANGED,
  LOGIN_SUCCESS,
  SERVER_NORESPONSE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  msg: '',
  loading: false,
  saveUser: false,
  logout: false,
  loginSuccess: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return Object.assign({}, state, { email: action.payload });
    case PASSWORD_CHANGED:
      return Object.assign({}, state, { password: action.payload });
    case LOGIN_USER:
      return Object.assign({}, state, { loading: true, error: '' });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loading: false, error: '', loginSuccess: true });
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        error: 'Authentication Failed',
        message: AlertIOS.alert('Error', 'Invalid Username or Password'),
        loading: false
      });
    case SERVER_NORESPONSE:
      return Object.assign({}, state, {
        error: 'Network connection failed'
      });
    case USER_SWITCH_CHANGED:
      return Object.assign({}, state, { saveUser: action.payload });
    case LOG_OUT:
      return Object.assign(({}, state, { logout: action.payload }));
      case 'INVALIDATE_SESSION':
        return Object.assign({}, state, { loginSuccess: false, password: '' })
    default:
      return state;
  }
};
