/* jshint esversion: 6*/
'use strict';

import base64 from 'base-64';
import { FETCHING_ORDERS_ACTIVITY, MY_FARM_CROP_VALUES, CROP_TYPE_AND_YEAR } from '../types';
import { VELO_REST_API_URL, X_API_KEY } from '../../../ServiceURLS/index';


export const myFarmCropValues = (commodityCode, cropYear, cropName) => {

    return (dispatch, getState) => {
       // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${VELO_REST_API_URL}cropData/519/${commodityCode}/${cropYear}`;
        console.log(url);
        return fetch(url, {
                method: 'GET',
                headers: { 'x-api-key': X_API_KEY }
            })

            .then(response => response.json())

            .then(cropValues => {
                console.log('cropValues:', cropValues);
                const cropValuesCodeName = Object.assign({}, cropValues, { name: cropName, code: commodityCode });
                dispatch({ type: MY_FARM_CROP_VALUES, payload: cropValuesCodeName });
            })
            .catch(error => console.log('error ', error));
    };
};

export const cropButtonPress = text => {
    return {
        type: CROP_TYPE_AND_YEAR,
        payload: text
    };
}

/*export const cropDataSave = (cropValues, code) => {
    console.log(cropValues);
    return (dispatch, getState) => {

         const url = `${VELO_REST_API_URL}cropData/519/${code}/${cropValues.selectedButton.slice(-4)}`;

        return fetch(url, {
            method: 'PUT',
            headers: {
                'x-api-key': X_API_KEY,
                'Accept-Encoding': 'gzip,deflate',
                'Content-Type': 'application/json',
                'User-Agent': 'Crew 0.1.0'
            },
            body: JSON.stringify({
               "cropYear": {
                id: getState().myFar.myFarmCropData.cropYear.id,
                unitCost: cropValues.cost.slice(1,(cropValues.cost.length-10),
                unitProfitGoal: cropValues.profit.slice(1,(cropValues.profit.length-10),
                expectedYield: cropValues.yield.slice(0,(cropValues.yield.length-8),
                basis: cropValues.estimate,
                includeBasis: cropValues.incbasis,
                areaPlanted: cropValues.profit.slice(1,(cropValues.profit.length-10)
                }
            })
        })
            .then(response => {

                if (response.ok) {
                           console.log('Data Saved');
                        }
            })
            .catch((status, error) => {
                 console.log('error' + error);

            });
    };
};*/


/*export const myFarmCorn2017 = cropNameYear => {
    return {
        type: MY_FARM_CORN_2017,
        payload:  require('../../../restAPI/FarmCorn2017'),
        cropNameYear
    };
};
export const myFarmCorn2016 = cropNameYear => {
    return {
        type: 'MY_FARM_CORN_2016',
        payload: require('../../../restAPI/FarmCorn2016'),
        cropNameYear
    };
};
export const myFarmCorn2018 = cropNameYear => {
    return {
        type: 'MY_FARM_CORN_2018',
        payload: require('../../../restAPI/FarmCorn2018'),
        cropNameYear
    };
};
export const myFarmSoy2016 = cropNameYear => {
    return {
        type: 'MY_FARM_SOY_2016',
        payload: require('../../../restAPI/FarmSoybean2016'),
        cropNameYear
    };
};
export const myFarmSoy2017 = cropNameYear => {
    return {
        type: 'MY_FARM_SOY_2017',
        payload: require('../../../restAPI/FarmSoybean2017'),
        cropNameYear
    }
};
export const myFarmSoy2018 = cropNameYear => {
    return {
        type: 'MY_FARM_SOY_2018',
        payload: require('../../../restAPI/FarmSoybean2018'),
        cropNameYear
    };
}; */


