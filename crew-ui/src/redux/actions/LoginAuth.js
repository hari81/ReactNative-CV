import { AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import base64 from 'base-64';
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SERVER_NORESPONSE,
  CLEAR_APPLICATION_STATE
} from './types';
import { AUTHENTICATE_URL } from '../../ServiceURLS/index';
import { doPostFetch, doLoginPostFetch } from '../../Utils/FetchApiCalls';
import bugsnag from '../../components/common/BugSnag';

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
          if (response.status === 403) {
              response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE }); });
              return;
          }
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
                bugsnag.setUser(`User Id: ${email}`, email, email);
              dispatch({ type: LOGIN_SUCCESS, crm: responseJson.crmSessionToken, basic: basicToken, email });
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
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE }); });
                    return;
                }
                if (response.ok) {
                    Alert.alert('Reset Password', `An email  will be sent to the below address so you can reset your password \n ${userName}`);
                } else {
                    Alert.alert('Reset Password', 'Wrong Email! Contact Cargill Desk.');
                }
            })
            .catch(/*error => {
                console.log(`login error ${error}`);
            }*/bugsnag.notify);
    };
};
