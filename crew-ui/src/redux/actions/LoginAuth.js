import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import base64 from 'base-64';
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SERVER_NORESPONSE
} from './types';
import { AUTHENTICATE_URL, X_API_KEY } from '../../ServiceURLS/index';
import { doPostFetch } from '../../Utils/FetchApiCalls';

export const loginUser = ({ saveUser }) => {
    const url = `${AUTHENTICATE_URL}identities/authenticate`;

  return (dispatch, getState) => {
    dispatch({ type: LOGIN_USER });

   /*   const authBody = {
          domain: 'commodityhedging.com',
          password: getState().auth.password,
          username: getState().auth.email
      };
      console.log(url, authBody, getState().auth.email, getState().auth.password);
  doPostFetch(url, authBody, getState().auth.email, getState().auth.password)*/
    return fetch(url, {
      method: 'POST',
      headers: {
          'x-api-key': X_API_KEY,
          'Accept-Encoding': 'gzip,deflate',
          'Content-Type': 'application/json',
          'User-Agent': 'Crew 0.1.0'
        },
      body: JSON.stringify({
        domain: 'commodityhedging.com',
        password: getState().auth.password,
        username: getState().auth.email
      })
    })
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
              //dispatch({ type: '16CORN', payload: require('../../restAPI/16CORN.json') });


              Actions.main();
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


