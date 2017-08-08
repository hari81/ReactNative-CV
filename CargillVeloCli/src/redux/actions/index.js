/*jshint esversion: 6 */
'use strict';

import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import base64 from 'base-64';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_SWITCH_CHANGED,
    CANCEL_BUTTON_PRESSED,
    BACK_TO_ORDERS,
    LOGIN_USER,
    SERVER_NORESPONSE,
    ORDER_RECEIPT
} from './types';
import { AUTHENTICATE_URL, RESTAPIURL } from '../../ServiceURLS';


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
export const saveUserSwitchChanged = ({value}) => {
    return {
        type: USER_SWITCH_CHANGED,
        payload: value
    };

};

/*export const loginUser = ({ email,password,saveUser }) => {
    return (dispatch) => {
        dispatch({type: LOGIN_USER});
        const url = AUTHENTICATE_URL +'identities/authenticate';


        const headers = new Headers();

        headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb');
        headers.append('Accept-Encoding', 'gzip,deflate');
        headers.append('Content-Type', 'application/json');
        headers.append('User-Agent', 'Crew 0.1.0');
        return fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                domain: 'commodityhedging.com',
                password: password,
                username: email
            })
        })

            .then(response => {
                //console.log(getState().auth.password, getState().auth.email);
                if (response.ok) {
                    return response.json()
                        .then(responseJson => {
                            if (responseJson.authenticated) {
                                let userInfo;
                                if (saveUser) {
                                    userInfo = JSON.stringify({
                                        email: base64.encode(email),
                                        password: base64.encode(password)
                                    });
                                    AsyncStorage.setItem('userData', userInfo);

                                } else {
                                    AsyncStorage.removeItem('userData');

                                }
                                dispatch({type: LOGIN_SUCCESS});
                                Actions.main(); //{A:1, B:2} as arguments
                            } else {
                                dispatch({type: LOGIN_FAIL});
                            }
                        })
                } else {
                    dispatch({type: SERVER_NORESPONSE});
                    console.log("Response failed");
                }
            })
            .catch((status, error) => console.log(error));

    }

}

export const onCancelButtonPress = (item) => {
   return (dispatch) => {
       dispatch({
           type: CANCEL_BUTTON_PRESSED,
           payload: item

       });
       Actions.cancelorder();
   }
};

export const backToOrders = (e) => {
    return (dispatch) => {
        dispatch({
            type: BACK_TO_ORDERS,
            payload: e
        });
        Actions.orders();
    };
};*/

export const orderReceipt = (orderid) => {
    return (dispatch, getState) => {

        const url = RESTAPIURL + 'api/orders/' + orderid;
        console.log(getState().auth);
        console.log(url);
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb',
                'Authorization': 'Basic ' + base64.encode(getState().auth.email + ":" + getState().auth.password)
            }
        })
            .then(response => {
                debugger;
                if (response.ok) {
                    console.log(response);

                    Actions.cancelorderreceipt({orderid: orderid});
                    return response.json()
                        /*.then(responseJson => {
                         console.log(responseJson);
                            switch (responseJson.status) {
                                case 200:
                                Actions.cancelorderreceipt({orderid: orderid});
                                return;
                                case 410:
                                console.log("Order cannot be canceled as it is already completed");
                                return;
                                //Actions.cancelorderreceipt({orderid: orderid});
                                //dispatch({type: ORDER_NOTDELETED});
                                case 500:
                                    console.log("Bad request");
                                    return;
                                default:
                                    console.log("None of the case");

                            }
                        })*/
                } else {
                    dispatch({type: SERVER_NORESPONSE});
                    console.log("Response failed");
                }
            })
            .catch((status, error) => console.log(error));
    }

};

