<<<<<<< HEAD
import { Alert } from 'react-native';
=======
>>>>>>> 6f341cd30efbcc92d134b0f538d40a830ba1a58e
import {
  LOGIN_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  SERVER_NORESPONSE
} from '../actions/types';

const INITIAL_STATE = {
  crmSToken: '',
  basicToken: '',
  loading: false,
<<<<<<< HEAD
  saveUser: false,
  logout: false,
    loginSuccess: false,
    passwordUpdateMessage: '',
    DidUpdateFail: ''
=======
  loginSuccess: false,
  error: false,
  msg: ''
>>>>>>> 6f341cd30efbcc92d134b0f538d40a830ba1a58e
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loading: true, error: false });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loading: false, error: false, loginSuccess: true, crmSToken: action.crm, basicToken: action.basic });
    case LOGIN_FAIL:
      return Object.assign({}, state, {
<<<<<<< HEAD
        error: 'Authentication Failed',
        message: Alert.alert('Error', 'Invalid Username or Password'),
=======
        error: true,
        msg: 'Invalid Username or Password',
>>>>>>> 6f341cd30efbcc92d134b0f538d40a830ba1a58e
        loading: false
      });
    case SERVER_NORESPONSE:
      return Object.assign({}, state, {
        error: true,
        msg: 'Network connection failed',
        loading: false,
      });
<<<<<<< HEAD
    case USER_SWITCH_CHANGED:
      return Object.assign({}, state, { saveUser: action.payload });
    case LOG_OUT:
      return Object.assign(({}, state, { logout: action.payload }));
      case 'INVALIDATE_SESSION':
        return Object.assign({}, state, { loginSuccess: false, password: '' });
      case 'PASSWORD_UPDATE_SUCCESS':
          return Object.assign({}, state, { passwordUpdateMessage: Alert.alert('Alert', action.payload) });
      case 'PASSWORD_UPDATE_FAILED':
          return Object.assign({}, state, { passwordUpdateMessage: Alert.alert('Alert', action.payload) });
=======
>>>>>>> 6f341cd30efbcc92d134b0f538d40a830ba1a58e
    default:
      return state;
  }
};
