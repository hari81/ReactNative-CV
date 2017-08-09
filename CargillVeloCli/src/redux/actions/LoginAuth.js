/*jshint esversion: 6 */
"use strict";

import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import base64 from "base-64";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SERVER_NORESPONSE
} from "./types";

export const loginUser = ({ saveUser }) => {
  //console.log(email,password)
  return (dispatch, getState) => {
    dispatch({ type: LOGIN_USER });
    const url =
      "https://1yvo5i7uk3.execute-api.us-east-1.amazonaws.com/qa/identities/authenticate";

    const headers = new Headers();

    headers.append("x-api-key", "rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb");
    headers.append("Accept-Encoding", "gzip,deflate");
    headers.append("Content-Type", "application/json");
    headers.append("User-Agent", "Crew 0.1.0");
    return fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        domain: "commodityhedging.com",
        password: getState().auth.password,
        username: getState().auth.email
      })
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json().then(responseJson => {
            if (responseJson.authenticated) {
              let userInfo;
              if (saveUser) {
                userInfo = JSON.stringify({
                  email: base64.encode(getState().auth.email),
                  password: base64.encode(getState().auth.password)
                });
                AsyncStorage.setItem("userData", userInfo);
              } else {
                AsyncStorage.removeItem("userData");
              }
              dispatch({ type: LOGIN_SUCCESS });
              Actions.main();
            } else {
              dispatch({ type: LOGIN_FAIL });
            }
          });
        }
      })
      .catch((status, error) => {
        console.log("error" + error);
        dispatch({ type: SERVER_NORESPONSE });
      });
  };
};
