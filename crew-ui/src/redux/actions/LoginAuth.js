import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import base64 from 'base-64';
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SERVER_NORESPONSE
} from './types';
import { AUTHENTICATE_URL } from '../../ServiceURLS/index';
import { doLoginPostFetch } from '../../Utils/FetchApiCalls';

export const loginUser = ({ saveUser }) => {
    const url = `${AUTHENTICATE_URL}identities/authenticate`;
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_USER });
      const authBody = {
          domain: 'commodityhedging.com',
          password: getState().auth.password,
          username: getState().auth.email
      };
      console.log(url, authBody, getState().auth.email, getState().auth.password);
  return doLoginPostFetch(url, authBody, getState().auth.email, getState().auth.password)
      .then(response => {
        if (response.ok) {
          return response.json().then(responseJson => {
            if (responseJson.authenticated) {
              let userInfo;
              if (saveUser) {
                userInfo = JSON.stringify({
                  email: base64.encode(getState().auth.email),
                  password: base64.encode(getState().auth.password)
                });
                AsyncStorage.setItem('userData', userInfo);
              } else {
                AsyncStorage.removeItem('userData');
              }
              dispatch({ type: LOGIN_SUCCESS });
            } else {
              dispatch({ type: LOGIN_FAIL });
            }
          });
        }
      })
      .catch((status, error) => {
       // console.log('error' + error);
        dispatch({ type: SERVER_NORESPONSE });
      });
  };
};
