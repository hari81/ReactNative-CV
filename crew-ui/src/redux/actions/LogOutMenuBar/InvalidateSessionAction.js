import { Actions } from 'react-native-router-flux';
import { doDeleteFetch } from '../../../Utils/FetchApiCalls';
import { AUTHENTICATE_URL } from '../../../ServiceURLS/index';
import bugsnag from '../../../components/common/BugSnag';

export const invalidateSession = () => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${AUTHENTICATE_URL}sessions/${getState().auth.crmSToken}`;
        return doDeleteFetch(url, getState().auth.basicToken)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(res => {
                if (res === 'OK') {
                    dispatch({ type: 'INVALIDATE_SESSION' });
                }
            })
            .catch(/*(status, error) => {
                console.log(`error ${error}`);
            }*/bugsnag.notify);
    };
};
