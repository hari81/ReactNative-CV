import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ACCOUNT_INFORMATION, ALL_BUTTONS, SELECT_ID, BUTTONS_SPINNER, DEFAULT_ACCOUNT_DETAILS, INVALID_ACCOUNT, CLEAR_APPLICATION_STATE } from '../types';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';

export const accountDetails = () => {
    return (dispatch, getState) => {
        const url = `${VELO_SERVICES_URL}accounts`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 404) {
                    Alert.alert('No Account found');
                    dispatch({ type: INVALID_ACCOUNT, payload: false });
                    return;
                }
                if (response.status === 403) {
                    response.json().then(userFail => { 
                        Alert.alert(userFail.message); 
                        Actions.auth(); 
                        dispatch({ type: CLEAR_APPLICATION_STATE }); 
                    });
                    return;
                }
                if (response.ok) {
                    return response.json();
                } else {
                    Alert.alert('Unable to retrieve your account information, please contact CRM @ 1-952-742-7414.');
                    return 'noresponse';
                }
            })
            .then(AccountData => {
                if (AccountData === undefined || AccountData === 'noresponse') { dispatch({ type: CLEAR_APPLICATION_STATE }); Actions.auth(); return; }
                dispatch({ type: ACCOUNT_INFORMATION, payload: AccountData });
                const accountNo = AccountData.defaultAccountId;
                const accountUrl = `${VELO_SERVICES_URL}accounts/${accountNo}/crops`;
                return doGetFetch(accountUrl, getState().auth.crmSToken)
                    .then(response => {
                        return response.json();
                    })
                    .then(Data => {
                        dispatch({ type: DEFAULT_ACCOUNT_DETAILS, payload: Data });
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
                        Actions.main();
                        dispatch({ type: 'SELECTED_CROP_NAME', payload: ButtonsData[0].name });
                        dispatch({ type: 'DASHBOARD_SPINNER' });
                        const year = Data.commodities[0].crops[0].cropYear;
                        const code = Data.commodities[0].commodity;
                        const defaultUrl = `${VELO_SERVICES_URL}dashboard/${accountNo}/${code}/${year}`;
                        return doGetFetch(defaultUrl, getState().auth.crmSToken)
                            .then(response => response.json(), rej => Promise.reject(rej))
                            .then(dashBoardData => { 
                                console.log(dashBoardData);
                                dispatch({ type: 'DASHBOARD_DATA', payload: dashBoardData });
                            })
                            .catch(bugsnag.notify);
                    })
                    .catch(error => {
                        common.handleError(error);
                    });
            })
            .catch(error => {
                common.handleError(error);
                dispatch({ type: 'DASHBOARD_DATA', payload: null });
            });
    };
};
