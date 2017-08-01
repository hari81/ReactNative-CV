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
    BACK_TO_ORDERS, LOGIN_USER
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
export const saveUserSwitchChanged = ({value}) => {
    return {
        type: USER_SWITCH_CHANGED,
        payload: value
    };

};

/*            if (email === 'C' && password === '1') {
               /* let userInfo;
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
                Actions.main();
            } else {
                dispatch({type: LOGIN_FAIL});

            }

    };
};*/


export const loginUser = ({ email, password, saveUser }) => {
    return (dispatch) => {
        dispatch({type:LOGIN_USER});
        const url = 'https://1yvo5i7uk3.execute-api.us-east-1.amazonaws.com/qa/identities/authenticate';


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
                password,
                username: email
            })
        })
            .then(response =>  response.json()
               /* if (response.ok) {
                   // if (response.json().authenticated) {
                    console.log(response);
                    console.log(response.json());

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
                        Actions.main();
                    } else {
                        dispatch({type: LOGIN_FAIL});
                    }
               // }*/
            )
            .then((responseJson) => {
                console.log(responseJson)
               if (responseJson.authenticated)
                {
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
                    Actions.main();
                } else {
                    dispatch({type: LOGIN_FAIL});
                }
            })
            .catch((status, error) => console.log(error));

    };
};
export const onCancelButtonPress = (quantity, buySell, orderType, riskProductName) => {
    return (dispatch) => {
        dispatch({
            type: CANCEL_BUTTON_PRESSED,
            payload: { quantity, buySell, orderType, riskProductName }

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
