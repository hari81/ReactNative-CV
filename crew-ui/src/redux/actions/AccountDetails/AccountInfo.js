import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ACCOUNT_INFORMATION, ALL_BUTTONS, SELECT_ID, BUTTONS_SPINNER, DEFAULT_ACCOUNT_DETAILS } from '../types';
import { QA_ACCOUNT_EXTERNALTRADES_FARMDATA } from '../../../ServiceURLS/index';
import { doGetFetch } from '../../../Utils/FetchApiCalls';

export const accountDetails = () => {
    return (dispatch, getState) => {
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });

        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}accounts`;
       return doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => {/*console.log(response);*/
                if (response.status === 404) {
                    Alert.alert('No Account found');
                    return;
                } else {
                return response.json();
                }
            })
            .then(AccountData => {
                dispatch({ type: ACCOUNT_INFORMATION, payload: AccountData });
                const accountNo = AccountData.defaultAccountId;
                const accountUrl = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}accounts/${accountNo}/crops`;
                return doGetFetch(accountUrl, getState().auth.email, getState().auth.password)
                    .then(response => response.json())
                    .then(Data => {
                        dispatch({ type: 'DEFAULT_ACCOUNT_DETAILS', payload: Data })
                        const ButtonsData = [];
                        const commodities = Data.commodities;
                        let index = 0;
                        commodities.map(item => {
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
                        dispatch({ type: 'SELECTED_CROP_NAME', payload: ButtonsData[0].name })
                        dispatch({ type: 'DASHBOARD_SPINNER' })
                        const year = Data.commodities[0].crops[0].cropYear;
                        const code = Data.commodities[0].commodity;
                        const defaultUrl = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}dashboard/${accountNo}/${code}/${year}`;
                        return doGetFetch(defaultUrl, getState().auth.email, getState().auth.password)
                            .then(response => response.json(), rej => Promise.reject(rej))
                            .then(dashBoardData =>
                                dispatch({ type: 'DASHBOARD_DATA', payload: dashBoardData })
                            )
                            .catch((status, error) => {
                                console.log(`error ${error}`);
                            });
                    })
                    .catch(error => console.log(`error ${error}`));

            })
            .catch(error => console.log(`error ${error}`));
    };
};
