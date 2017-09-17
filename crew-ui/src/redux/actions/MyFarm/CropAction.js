import { Alert } from 'react-native';
import { MY_FARM_CROP_VALUES, MY_FARM_CROP_VALUES_SUMMARY } from '../types';
import { QA_ACCOUNT_EXTERNALTRADES_FARMDATA } from '../../../ServiceURLS/index';
import { doGetFetch, doPutFetch, doPostFetch } from '../../../Utils/FetchApiCalls';

export const myFarmCropValues = (commodityCode, cropYear) => {
    return (dispatch, getState) => {
       // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const accountNo = getState().account.accountDetails.defaultAccountId;
       // console.log(accountNo);
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}cropData/${accountNo}/${commodityCode}/${cropYear}`;
       doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(cropValues => {
              //  console.log('cropValues:', cropValues);
               // const cropValuesCodeName = Object.assign({}, cropValues);
                dispatch({ type: MY_FARM_CROP_VALUES, payload: cropValues });
            })
            .catch(error => console.log('error ', error));
    };
};

export const myFarmTradeSalesOutSideApp = (commodityCode, cropYear) => {
    return (dispatch, getState) => {
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}externalTrades/${accountNo}/${commodityCode}/${cropYear}/summary`;
        doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => {
             //   console.log(response);
                if(response.status === 404) {
                    return {};
                } else {
                    return response.json();
                }
            }, rej => Promise.reject(rej))

            .then(cropValuesSummary => {
             //   console.log('cropValuesSummary:', cropValuesSummary);

                dispatch({ type: MY_FARM_CROP_VALUES_SUMMARY, payload: cropValuesSummary });
            })
            .catch(error => { console.log(`error ${error}`); });
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
        //const url = `${DEV_CROP_EXTERNAL_TRADE_URL}cropData/519/${code}/${cropValues.selectedButton.slice(-4)}`;
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}cropData/${accountNo}/${cropButData[0].code}/${cropButData[0].cropYear}`;
        const values = { "cropYear": {
            "areaPlanted": aPlanted.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            "unitCost": uCost.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            "unitProfitGoal": uProfitGoal.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            "expectedYield": eYield.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
            "basis": cropValues.estimate.toFixed(2),
            "includeBasis": cropValues.incbasis,
            "active": true,
            "areaUnit": 'acre'
            }
        };
         if (getState().myFar.myFarmCropData.cropYear === null) {
             doPostFetch(url, values, getState().auth.email, getState().auth.password)
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
                .catch((status, error) => {
                    console.log(`error ${error}`);
                });
        } else {
           const putValues = {
               "cropYear": {
                   "id": getState().myFar.myFarmCropData.cropYear.id,
                   "unitCost": uCost.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
                   "unitProfitGoal": uProfitGoal.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
                   "expectedYield": eYield.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
                   "basis": cropValues.estimate.toFixed(2),
                   "includeBasis": cropValues.incbasis,
                   "areaPlanted": aPlanted.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1'),
                   "active": getState().myFar.myFarmCropData.cropYear.active,
                   "areaUnit": getState().myFar.myFarmCropData.cropYear.areaUnit
               }
           };
           doPutFetch(url, putValues, getState().auth.email, getState().auth.password)
                .then(response => { //console.log(response);
                    if (response.ok) {
                     //   console.log('Data Saved');
                        Alert.alert('Data Saved Successfully');
                        return response.json();
                    }
                }, rej => Promise.reject(rej))
                .then(putResponse => {
                   // Alert.alert('Data Saved Successfully');
                   // const cropValuesCodeName = Object.assign({}, putResponse);
                    dispatch({ type: MY_FARM_CROP_VALUES, payload: putResponse });
                })
                .catch((status, error) => {
                    console.log(`error ${error}`);
                });
        }
    };
};

