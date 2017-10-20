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
            .then(response => response.json(), rej => Promise.reject(rej))
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

export const homeScreenDataFetch = () => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(user.userId.toString(), user.email, user.firstName);
        const codeYear = getState().cropsButtons.selectedId;
        const year = codeYear.slice(-4);
            const code = codeYear.slice(0, codeYear.length - year.length);
        dispatch({ type: 'DASHBOARD_SPINNER' });
        const url = `${VELO_SERVICES_URL}dashboard/${getState().account.accountDetails.defaultAccountId}/${code}/${year}`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(dashBoardData =>
                dispatch(dashboardData(dashBoardData))
            )
            .catch(/*(status, error) => {
                console.log(`error ${error}`);
            }*/bugsnag.notify);
    };
};
