import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    USER_SWITCH_CHANGED,
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};
export const passwordChanged = (text) => {
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
