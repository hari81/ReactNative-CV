/* jshint esversion: 6*/
'use strict';

import base64 from 'base-64';
import { MY_FARM_CROP_VALUES, CROP_TYPE_AND_YEAR, MY_FARM_CROP_VALUES_SUMMARY, SAVE_CROP_DATA_LOCALLY } from '../types';
import { DEV_REST_API_URL, X_API_KEY, QA_ACCOUNT_EXTERNALTRADES_FARMDATA,  } from '../../../ServiceURLS/index';
import { Alert } from 'react-native';

export const myFarmCropValues = (commodityCode, cropYear) => {

    return (dispatch, getState) => {
       // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const accountNo = getState().account.accountDetails.defaultAccountId;
       // console.log(accountNo);
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}cropData/${accountNo}/${commodityCode}/${cropYear}`;
     //   console.log(url);
        return fetch(url, {
                method: 'GET',

                headers: {
                    Authorization:
                    'Basic ' +
                    base64.encode(getState().auth.email + ':' + getState().auth.password),
                    'x-api-key': X_API_KEY,

                }
            })

            .then(response => response.json())

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
       // console.log('outsideapp',url);
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': X_API_KEY }
        })

            .then(response => {
             //   console.log(response);
                if(response.status === 404)
                {

                    return {};
                }else {

                    return response.json();
                }
            })

            .then(cropValuesSummary => {
             //   console.log('cropValuesSummary:', cropValuesSummary);

                dispatch({ type: MY_FARM_CROP_VALUES_SUMMARY, payload: cropValuesSummary });
            })
            .catch(error => { console.log('error ', error); });

    };
};

export const cropDataSave = (cropValues) => {

    return (dispatch, getState) => {
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const cropButData = getState().cropsButtons.cropButtons.filter(item => item.id === getState().cropsButtons.selectedId);
      //  console.log(cropValues);
        // console.log('id', getState().myFar.myFarmCropData.cropYear.id);
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
        //console.log('url', url);
       // console.log('Post Values', aPlanted, uCost, uProfitGoal, eYield);
        if (getState().myFar.myFarmCropData.cropYear === null) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    Authorization:
                    'Basic ' +
                    base64.encode(getState().auth.email + ':' + getState().auth.password),
                    'x-api-key': X_API_KEY,
                    'Accept-Encoding': 'gzip,deflate',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Crew 0.1.0'
                },
                body: JSON.stringify({
                    "cropYear": {
                        "areaPlanted": aPlanted.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "unitCost": uCost.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "unitProfitGoal": uProfitGoal.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "expectedYield": eYield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "basis": cropValues.estimate.toFixed(2),
                        "includeBasis": cropValues.incbasis,
                        "active": true,
                        "areaUnit": 'acre'
                    }
                })
            })
                .then(response => {

                    if (response.status === 201) {
                       // console.log('Data Saved');
                        Alert.alert("Data Saved Successfully");
                        return response.json();
                    }
                })
                .then(postResponse => {
                    //const cropValuesCodeName = Object.assign({}, postResponse);
                    dispatch({ type: MY_FARM_CROP_VALUES, payload: postResponse });
                })
                .catch((status, error) => {
                    console.log('error' + error);

                });

        } else {
           /* console.log('saved values', JSON.stringify({
                "cropYear": {
                    "id": getState().myFar.myFarmCropData.cropYear.id,
                    "unitCost": uCost.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                    "unitProfitGoal": uProfitGoal.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                    "expectedYield": eYield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                    "basis": cropValues.estimate.toFixed(2),
                    "includeBasis": cropValues.incbasis,
                    "areaPlanted": aPlanted.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                    "active": getState().myFar.myFarmCropData.cropYear.active,
                    "areaUnit": getState().myFar.myFarmCropData.cropYear.areaUnit
                }
            }));*/
            return fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization:
                    'Basic ' +
                    base64.encode(getState().auth.email + ':' + getState().auth.password),
                    'x-api-key': X_API_KEY,
                    'Accept-Encoding': 'gzip,deflate',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Crew 0.1.0'
                },
                body: JSON.stringify({
                    "cropYear": {
                        "id": getState().myFar.myFarmCropData.cropYear.id,
                        "unitCost": uCost.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "unitProfitGoal": uProfitGoal.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "expectedYield": eYield.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "basis": cropValues.estimate.toFixed(2),
                        "includeBasis": cropValues.incbasis,
                        "areaPlanted": aPlanted.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"),
                        "active": getState().myFar.myFarmCropData.cropYear.active,
                        "areaUnit": getState().myFar.myFarmCropData.cropYear.areaUnit
                    }
                })
            })
                .then(response => { console.log(response);

                    if (response.ok) {
                     //   console.log('Data Saved');
                        Alert.alert("Data Saved Successfully");
                        return response.json();
                    }
                })
                .then(putResponse => {
                   // const cropValuesCodeName = Object.assign({}, putResponse);
                    dispatch({ type: MY_FARM_CROP_VALUES, payload: putResponse });
                })
                .catch((status, error) => {
                    console.log('error' + error);

                });
        };
    }
};


