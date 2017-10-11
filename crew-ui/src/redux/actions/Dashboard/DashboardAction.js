import { doGetFetch } from '../../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';

export const dashBoardDataFetch = (year, code) => {
    return (dispatch, getState) => {
        dispatch({ type: 'DASHBOARD_SPINNER' });
        const url = `${VELO_SERVICES_URL}dashboard/${getState().account.accountDetails.defaultAccountId}/${code}/${year}`;
        return doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(dashBoardData =>
                dispatch(dashboardData(dashBoardData))
            )
            .catch((status, error) => {
                console.log(`error ${error}`);
            });
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
        const codeYear = getState().cropsButtons.selectedId;
        const year = codeYear.slice(-4);
            const code = codeYear.slice(0, codeYear.length - year.length);
        dispatch({ type: 'DASHBOARD_SPINNER' });
        const url = `${VELO_SERVICES_URL}dashboard/${getState().account.accountDetails.defaultAccountId}/${code}/${year}`;
        return doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(dashBoardData =>
                dispatch(dashboardData(dashBoardData))
            )
            .catch((status, error) => {
                console.log(`error ${error}`);
            });
    };
};
