import { AsyncStorage, AlertIOS } from 'react-native';
import base64 from 'base-64';
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SERVER_NORESPONSE
} from './types';
import { AUTHENTICATE_URL } from '../../ServiceURLS/index';
import { doPostFetch, doLoginPostFetch } from '../../Utils/FetchApiCalls';

export const loginUser = (saveUser, email, pword) => {
    const url = `${AUTHENTICATE_URL}identities/authenticate`;
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
      const authBody = {
          domain: 'commodityhedging.com',
          password: pword,
          username: email
      };
      //console.log(url, authBody, getState().auth.email, getState().auth.password);
      const basicToken = `Basic ${base64.encode(`${email}:${pword}`)}`;
  return doPostFetch(url, authBody, basicToken)
      .then(response => {
        if (response.ok) {
          return response.json().then(responseJson => {
            if (responseJson.authenticated) {
              let userInfo;
              if (saveUser) {
                userInfo = JSON.stringify({
                  email: base64.encode(email),
                  password: base64.encode(pword)
                });
                AsyncStorage.setItem('userData', userInfo);
              } else {
                AsyncStorage.removeItem('userData');
              }
              dispatch({ type: LOGIN_SUCCESS, crm: responseJson.crmSessionToken, basic: basicToken });
            } else {
              dispatch({ type: LOGIN_FAIL });
            }
          });
        }
        AsyncStorage.removeItem('userData');
        dispatch({ type: LOGIN_FAIL });
      })
      .catch((status, error) => {
        console.log(`login error ${error}`);
        dispatch({ type: SERVER_NORESPONSE });
      });
  };
};

export const forGetPassword = (userName) => {
    const url = `${AUTHENTICATE_URL}identities/${userName}/credentials/resetPassword`;
    return (dispatch) => {
        return doLoginPostFetch(url, { domain: 'okta', sendEmail: true })
            .then(response => {
                if (response.ok) {
                    AlertIOS.alert('Reset Password', `Email will be sent to your ${userName}`);
                } else {
                    AlertIOS.alert('Reset Password', 'Wrong Email! Contact Cargill Desk.');
                }
            })
            .catch(error => {
                console.log(`login error ${error}`);
            });
    };
};
