import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { doDeleteFetch } from '../../../Utils/FetchApiCalls';
import { AUTHENTICATE_URL } from '../../../ServiceURLS/index';
import bugsnag from '../../../components/common/BugSnag';
import { CLEAR_APPLICATION_STATE } from '../types';

export const invalidateSession = () => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${AUTHENTICATE_URL}sessions/${getState().auth.crmSToken}`;
        return doDeleteFetch(url, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE }); });
                    return;
                }
                return response.json();
            }, rej => Promise.reject(rej))
            .then(res => {
                if (res === undefined) {
                    return;
                }
                if (res === 'OK') {
                    dispatch({ type: CLEAR_APPLICATION_STATE });
                }
            })
            .catch(/*(status, error) => {
                console.log(`error ${error}`);
            }*/bugsnag.notify);
    };
};
