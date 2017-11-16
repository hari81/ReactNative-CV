import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import { AUTHENTICATE_URL } from '../../../ServiceURLS/index';
import bugsnag from '../../../components/common/BugSnag';
import { CLEAR_APPLICATION_STATE } from '../types';

export const changePassword = (oldP, newP) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${AUTHENTICATE_URL}identities/${getState().auth.email}/credentials/changePassword`;
        const body = {
            oldPassword: oldP,
            newPassword: newP,
            domain: 'okta'
        };
        return doPostFetch(url, body, getState().auth.crmSToken)
            .then(response => {
                console.log(response);
                // Session Token expired condition
              /* if (response.status === 403) {
                response.json().then(userFail => {
                    console.log('user', userFail);
                    if (userFail.message === 'User has not been authenticated') {
                    Alert.alert(userFail.message);
                    Actions.auth();
                    dispatch({ type: CLEAR_APPLICATION_STATE });
                    }
                    return;
                    });
                }*/
                return response.json();
            }, rej => Promise.reject(rej))
            .then(res => {
                console.log(res);
                if (res === undefined) {
                    return;
                }
                if (res.status === 'FORBIDDEN') {
                    dispatch({ type: 'PASSWORD_UPDATE_FAILED', payload: res.details[0] });
                } else if (res === 'OK') {
                    dispatch({ type: 'PASSWORD_UPDATE_SUCCESS', payload: 'Password is Changed Successfully' });
                } else {
                    //if (res.message === 'User has not been authenticated') {
                        Alert.alert(res.message);
                        Actions.auth();
                        dispatch({ type: CLEAR_APPLICATION_STATE });
                   // }
                }

            })
            .catch(/*(status, error) => {
                console.log(`error ${error}`);
            }*/bugsnag.notify);
    };
};
