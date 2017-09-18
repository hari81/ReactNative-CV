import base64 from 'base-64';
import { FETCHING_ORDERS_ACTIVITY, ALL_BUTTONS, SELECT_ID } from '../types';
import { QA_ACCOUNT_EXTERNALTRADES_FARMDATA } from '../../../ServiceURLS/index';
import { doGetFetch } from '../../../Utils/FetchApiCalls';

import Data from '../../../restAPI/get_crops.json';
export const cropsButtons = () => {

    return (dispatch, getState) => {
        const accountNo = getState().account.accountDetails.defaultAccountId;
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}accounts/519/crops`;
        console.log('buttons url', url);
         doGetFetch(url, 'GET', getState().auth.email, getState().auth.password)
             .then(res => { console.log('fetchApi', res); });
    };
};

export const selectId = (id) => {
    return {
        type: SELECT_ID,
        payload: id
    };
};