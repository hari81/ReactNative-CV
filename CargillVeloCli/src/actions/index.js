import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
         PASSWORD_CHANGED,
         LOGIN_FAIL,
         LOGIN_SUCCESS,
         LOGIN_USER,
         SWITCH_CHANGED,
         CANCEL_BUTTON_PRESSED,
         BACK_TO_ORDERS } from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
}
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
}
export const switchChanged = (text) => {
    return {
        type: SWITCH_CHANGED,
        payload: text
    };
}
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        if (email === 'Cargill' && password === '1234') {
            dispatch({ type: LOGIN_SUCCESS });
            Actions.main();
        } else {
            dispatch({ type: LOGIN_FAIL });
        }
    };
};
export const onCancelButtonPress = (e) => {
    return (dispatch) => {
        dispatch({
            type: CANCEL_BUTTON_PRESSED,
            payload: e
        });
        Actions.cancelorder();
    };
}
export const backToOrders = (e) => {
    return (dispatch) => {
        dispatch({
            type: BACK_TO_ORDERS,
            payload: e
        });
        Actions.orders();
    };
}