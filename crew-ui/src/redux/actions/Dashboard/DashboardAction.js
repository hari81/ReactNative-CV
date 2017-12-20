import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';
import { CLEAR_APPLICATION_STATE, DASHBOARD_SPINNER, DASHBOARD_DATA } from '../types';

export const dashBoardDataFetch = (year, code, myfarm) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: DASHBOARD_SPINNER });
        const url = `${VELO_SERVICES_URL}dashboard/${getState().account.accountDetails.defaultAccountId}/${code}/${year}`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => {
                if (myfarm === 'MyFarm') { return; }
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                    return;
                }
                return response.json();
            }, rej => Promise.reject(rej))
            .then(dashBoardData => {
                if (dashBoardData === undefined) {
                    return;
                }
                dispatch(dashboardData(dashBoardData));
            })
            .catch(error => {
                common.handleError(error);
                dispatch(dashboardData(null));
            });
    };
};

export function dashboardData(dashBoardData) {
    return {
        type: DASHBOARD_DATA,
        payload: dashBoardData
    };
}
