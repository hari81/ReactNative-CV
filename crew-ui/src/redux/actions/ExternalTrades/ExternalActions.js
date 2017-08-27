/* jshint esversion: 6*/
'use strict';

import base64 from 'base-64';
import { FETCHING_ORDERS_ACTIVITY, EXTERNAL_GET_TRANS } from '../types';
import { X_API_KEY, DEV_REST_API_URL } from '../../../ServiceURLS/index';


//import ExternalData from '../../../restAPI/ExternalTradesCorn2017.json';

export const externalGetTrans = () => {

    return (dispatch, getState) => {
        const commodityCode = getState().myFar.myFarmCropData.code;
        const cropYear = getState().myFar.myFarmCropData.name.slice(-4);

        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${DEV_REST_API_URL}externalTrades/519/${commodityCode}/${cropYear}/trades`;
        console.log(url);
        console.log(X_API_KEY);
        return fetch(url, {
             method: 'GET',
             headers: {
                 'x-api-key': X_API_KEY
             }
         })
             .then(response => response.json())

             .then(tradeValues => {
                 console.log('tradeValues', tradeValues);
                if (!Array.isArray(tradeValues.trades)) {
                     return Promise.resolve([{}]);
                 }


        dispatch({ type: EXTERNAL_GET_TRANS, payload: tradeValues });
         })
          .catch(error => console.log('error ' + error));
    };
};
