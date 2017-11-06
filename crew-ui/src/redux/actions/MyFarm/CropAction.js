import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MY_FARM_CROP_VALUES, MY_FARM_CROP_VALUES_SUMMARY, MY_FARM_ACTION, CLEAR_APPLICATION_STATE } from '../types';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';
import { doGetFetch, doPutFetch, doPostFetch } from '../../../Utils/FetchApiCalls';
import bugsnag from '../../../components/common/BugSnag';
import * as common from '../../../Utils/common';

export const myFarmCropValues = (commodityCode, cropYear) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const accountNo = getState().account.accountDetails.defaultAccountId;
       const url = `${VELO_SERVICES_URL}cropData/${accountNo}/${commodityCode}/${cropYear}`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 403 && getState().myFar.farmFlag) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                    return;
                }
                return response.json();
            }, rej => Promise.reject(rej))
            .then(cropValues => {
                if (cropValues === undefined) {
                    return;
                }
                dispatch({ type: MY_FARM_CROP_VALUES, payload: cropValues });
            })
            .catch(bugsnag.notify);
    };
};

export const myFarmTradeSalesOutSideApp = (commodityCode, cropYear) => {
    return (dispatch, getState) => {
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
            const user = getState().account.accountDetails;
            bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
            const accountNo = getState().account.accountDetails.defaultAccountId;
            const url = `${VELO_SERVICES_URL}externalTrades/${accountNo}/${commodityCode}/${cropYear}/summary`;
            return doGetFetch(url, getState().auth.crmSToken)
                .then(response => {
                    if (response.status === 404) {
                        return {};
                    }
                    return response.json();
                }, rej => Promise.reject(rej))
                .then(cropValuesSummary => {
                    dispatch({type: MY_FARM_CROP_VALUES_SUMMARY, payload: cropValuesSummary});
                })
                .catch(bugsnag.notify);
    };
};

export const cropDataSave = (cropValues) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const cropButData = getState().cropsButtons.cropButtons.filter(item => item.id === getState().cropsButtons.selectedId);
        const uCost = cropValues.cost.slice(-4) === 'acre' ?
            cropValues.cost.slice(1, (cropValues.cost.length - 9)) : cropValues.cost;
        const uProfitGoal = cropValues.profit.slice(-4) === 'acre' ?
            cropValues.profit.slice(1, (cropValues.profit.length - 9)) : cropValues.profit;
        const eYield = cropValues.yield.slice(-7) === 'bushels' ?
            cropValues.yield.slice(0, (cropValues.yield.length - 8)) : cropValues.yield;
        const aPlanted = cropValues.acres.slice(-5) === 'acres' ?
            cropValues.acres.slice(0, (cropValues.acres.length - 6)) : cropValues.acres;
        const url = `${VELO_SERVICES_URL}cropData/${accountNo}/${cropButData[0].code}/${cropButData[0].cropYear}`;
        const setCropData = {
            areaPlanted: aPlanted.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            unitCost: uCost.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            unitProfitGoal: uProfitGoal.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            expectedYield: eYield.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            basis: cropValues.estimate.toFixed(2),
            includeBasis: cropValues.incbasis 
        };
        if (!common.isValueExists(getState().myFar.myFarmCropData.cropYear)) {
             setCropData.active = true;
             setCropData.areaUnit = 'acre';
             const values = { cropYear: setCropData };
            return doPostFetch(url, values, getState().auth.crmSToken)
                .then(response => {
                        if (response.status === 403) {
                            response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                            return;
                        }
                    if (response.status === 201) {
                        Alert.alert('Data Saved Successfully');
                        return response.json();
                    }
                }, rej => Promise.reject(rej))
                .then(postResponse => {
                    dispatch({ type: MY_FARM_CROP_VALUES, payload: postResponse });
                })
                .catch(bugsnag.notify);
        }
        setCropData.id = getState().myFar.myFarmCropData.cropYear.id;
        setCropData.active = getState().myFar.myFarmCropData.cropYear.active;
        setCropData.areaUnit = getState().myFar.myFarmCropData.cropYear.areaUnit;
        const putValues = { cropYear: setCropData };
        return doPutFetch(url, putValues, getState().auth.crmSToken)
            .then(response => {
                if (response.ok) {
                    Alert.alert('Data Saved Successfully');
                    return response.json();
                }
            }, rej => Promise.reject(rej))
            .then(putResponse => {
                dispatch({ type: MY_FARM_CROP_VALUES, payload: putResponse });
            })
            .catch(bugsnag.notify);
    };
};

export const farmActionFlag = (flag) => {
    return {
        type: MY_FARM_ACTION, payload: flag
    };
};
