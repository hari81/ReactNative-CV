import { ACCOUNT_INFORMATION, ALL_BUTTONS, SELECT_ID, BUTTONS_SPINNER } from '../types';
import { QA_ACCOUNT_EXTERNALTRADES_FARMDATA } from '../../../ServiceURLS/index';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
//import mockAccountData from '../../../restAPI/get_account.json';
//import BData from '../../../restAPI/get_crops.json';
export const accountDetails = () => {
    return (dispatch, getState) => {
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}accounts`;
        //console.log(url);
        //console.log(getState().auth.email, getState().auth.password);
        doGetFetch(url, getState().auth.email, getState().auth.password)
        /*return fetch(url, {
            method: 'GET',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                "x-api-key": X_API_KEY,

            }
        })*/
            .then(response => /*console.log(response);*/ response.json())
            .then(AccountData => {
                console.log('AccountData:', AccountData);
                dispatch({ type: ACCOUNT_INFORMATION, payload: AccountData });
                const accountNo = AccountData.defaultAccountId;
                const accountUrl = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}accounts/${accountNo}/crops`;
               // console.log(accountUrl);
                doGetFetch(accountUrl, getState().auth.email, getState().auth.password)
                /*return fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization:
                        'Basic ' +
                        base64.encode(getState().auth.email + ':' + getState().auth.password),
                        "x-api-key": X_API_KEY,

                    }
                })*/
                    .then(response => response.json())
                    .then(Data => {
                        //console.log('ButtonsData:', Data);
                        const ButtonsData = [];
                        const commodities = Data.commodities;
                        let index = 0;
                        commodities.map(item => {
                            //const crops = item.crops ;
                            item.crops.map(year => {
                                ButtonsData[index] = Object.assign({},
                                    { id: item.commodity + year.cropYear, cropYear: year.cropYear, code: item.commodity, name: item.name });
                                index++;
                            });
                        });
                        ButtonsData.sort((item1, item2) => item1.cropYear - item2.cropYear);
                        dispatch({ type: ALL_BUTTONS, payload: ButtonsData });
                        dispatch({ type: BUTTONS_SPINNER, payload: false });
                        dispatch({ type: SELECT_ID, payload: ButtonsData[0].id });
                    })
                    .catch(error => console.log(`error ${error}`));

            })
            .catch(error => console.log(`error ${error}`));
    };
};
