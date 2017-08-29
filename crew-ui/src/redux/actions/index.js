/*jshint esversion: 6 */
'use strict';


import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  USER_SWITCH_CHANGED,
  LOG_OUT
} from './types';


export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};
export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const saveUserSwitchChanged = ({ value }) => {
  return {
    type: USER_SWITCH_CHANGED,
    payload: value
  };
};

export const logOut = (val) => {
  return {
    type: LOG_OUT,
    payload: val
  };
};
