import { Alert } from 'react-native';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';
import bugsnag from '../../../components/common/BugSnag';

export const dashBoardDataFetch = (year, code) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: 'DASHBOARD_SPINNER' });
        const url = `${VELO_SERVICES_URL}dashboard/${getState().account.accountDetails.defaultAccountId}/${code}/${year}`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); });
                    return;
                }
                return response.json();
            }, rej => Promise.reject(rej))
            .then(dashBoardData =>
                dispatch(dashboardData(dashBoardData))
            )
            .catch(/*(status, error) => {
                console.log(`error ${error}`);
            }*/bugsnag.notify);
    };
};
export function dashboardData(dashBoardData) {
    return {
        type: 'DASHBOARD_DATA',
        payload: dashBoardData
    };
}
