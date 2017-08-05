import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import base64 from 'base-64';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_USER } from './types';

export const loginUser = ({ email, password, saveUser }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        return fetch('https://1yvo5i7uk3.execute-api.us-east-1.amazonaws.com/qa/identities/authenticate', {
            method: 'POST',
            headers: {
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb',
                'Accept-Encoding': 'gzip,deflate',
                'Content-Type': 'application/json',
                'User-Agent': 'Crew 0.1.0'
            },
            body: JSON.stringify({
                domain: 'commodityhedging.com',
                password,
                username: email
            })
        })
            .then(response => {
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
                                dispatch({ type: LOGIN_SUCCESS });
                                Actions.main();
                            } else {
                                dispatch({ type: LOGIN_FAIL });
                            }
                        });
                }
            })
            .catch((status, error) => console.log(error));

    }

}




