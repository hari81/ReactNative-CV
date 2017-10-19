import { Alert } from 'react-native';
import { MY_FARM_CROP_VALUES, MY_FARM_CROP_VALUES_SUMMARY, MY_FARM_ACTION } from '../types';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';
import { doGetFetch, doPutFetch, doPostFetch } from '../../../Utils/FetchApiCalls';
import bugsnag from '../../../components/common/BugSnag';

export const myFarmCropValues = (commodityCode, cropYear) => {
    return (dispatch, getState) => {
       // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const accountNo = getState().account.accountDetails.defaultAccountId;
       const url = `${VELO_SERVICES_URL}cropData/${accountNo}/${commodityCode}/${cropYear}`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(cropValues => {
                dispatch({ type: MY_FARM_CROP_VALUES, payload: cropValues });
            })
            .catch(/*error => console.log('error ', error)*/bugsnag.notify);
    };
};

export const myFarmTradeSalesOutSideApp = (commodityCode, cropYear) => {
    return (dispatch, getState) => {
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const url = `${VELO_SERVICES_URL}externalTrades/${accountNo}/${commodityCode}/${cropYear}/summary`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => {
             if (response.status === 404) {
                    return {};
                } else {
                    return response.json();
                }
            }, rej => Promise.reject(rej))
            .then(cropValuesSummary => {
                dispatch({ type: MY_FARM_CROP_VALUES_SUMMARY, payload: cropValuesSummary });
            })
            .catch(/*error => { console.log(`error ${error}`); }*/bugsnag.notify);
    };
};

export const cropDataSave = (cropValues) => {
    return (dispatch, getState) => {
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const cropButData = getState().cropsButtons.cropButtons.filter(item => item.id === getState().cropsButtons.selectedId);
        const uCost = cropValues.cost.slice(-4) === 'acre' ?
            cropValues.cost.slice(1, (cropValues.cost.length - 10)) : cropValues.cost;
        const uProfitGoal = cropValues.profit.slice(-4) === 'acre' ?
            cropValues.profit.slice(1, (cropValues.profit.length - 10)) : cropValues.profit;
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
            includeBasis: cropValues.incbasis };
         if (getState().myFar.myFarmCropData.cropYear === null) {
             setCropData.active = true;
             setCropData.areaUnit = 'acre';
             const values = { cropYear: setCropData };
            return doPostFetch(url, values, getState().auth.crmSToken)
                .then(response => {
                    if (response.status === 201) {
                       // console.log('Data Saved');
                        Alert.alert('Data Saved Successfully');
                        return response.json();
                    }
                }, rej => Promise.reject(rej))
                .then(postResponse => {
                    //const cropValuesCodeName = Object.assign({}, postResponse);
                    dispatch({ type: MY_FARM_CROP_VALUES, payload: postResponse });
                })
                .catch(/*(status, error) => {
                    console.log(`error ${error}`);
                }*/bugsnag.notify);
        } else {
             setCropData.id = getState().myFar.myFarmCropData.cropYear.id;
             setCropData.active = getState().myFar.myFarmCropData.cropYear.active;
             setCropData.areaUnit = getState().myFar.myFarmCropData.cropYear.areaUnit;
             const putValues = { cropYear: setCropData };
         return doPutFetch(url, putValues, getState().auth.crmSToken)
                .then(response => { //console.log(response);
                    if (response.ok) {
                        Alert.alert('Data Saved Successfully');
                        return response.json();
                    }
                }, rej => Promise.reject(rej))
                .then(putResponse => {
                    dispatch({ type: MY_FARM_CROP_VALUES, payload: putResponse });
                })
                .catch(/*(status, error) => {
                    console.log(`error ${error}`);
                }*/bugsnag.notify);
        }
    };
};

export const farmActionFlag = (flag) => {
    return {
        type: MY_FARM_ACTION, payload: flag
    };
};

