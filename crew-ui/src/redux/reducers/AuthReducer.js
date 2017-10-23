import { Alert } from 'react-native';
import {
  LOGIN_FAIL,
  LOGIN_USER,
  LOGIN_SUCCESS,
  SERVER_NORESPONSE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  crmSToken: '',
  basicToken: '',
  loading: false,
  loginSuccess: false,
  error: false,
  msg: '',
  passwordUpdateMessage: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, { loading: true, error: false, msg: '' });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loading: false, error: false, loginSuccess: true, crmSToken: action.crm, basicToken: action.basic, email: action.email });
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        error: true,
        msg: 'Invalid Username or Password',
        loading: false
      });
    case SERVER_NORESPONSE:
      return Object.assign({}, state, {
        error: true,
        msg: 'Network connection failed! Check your wireless connection.',
        loading: false,
      });
      case 'PASSWORD_UPDATE_SUCCESS':
          return Object.assign({}, state, { passwordUpdateMessage: Alert.alert('Alert', action.payload) });
      case 'PASSWORD_UPDATE_FAILED':
          return Object.assign({}, state, { passwordUpdateMessage: Alert.alert('Alert', action.payload) });
    default:
      return state;
  }
};
