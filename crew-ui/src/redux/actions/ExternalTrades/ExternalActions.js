
import base64 from 'base-64';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import { FETCHING_ORDERS_ACTIVITY, EXTERNAL_GET_TRANS, EXTERNAL_FLAG } from '../types';
import { X_API_KEY, DEV_CROP_EXTERNAL_TRADE_URL } from '../../../ServiceURLS/index';

export const externalGetTrans = () => {

    return (dispatch, getState) => {
        const commodityCode = getState().myFar.myFarmCropData.code;
        const cropYear = getState().myFar.myFarmCropData.name.slice(-4);

        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${DEV_CROP_EXTERNAL_TRADE_URL}externalTrades/519/${commodityCode}/${cropYear}/trades`;
        console.log(url);
        return fetch(url, {
             method: 'GET',
             headers: {
                 Authorization:
                 'Basic ' +
                 base64.encode(getState().auth.email + ':' + getState().auth.password),
                 'x-api-key': X_API_KEY
             }
         })
             .then(response => { console.log('response', response);return response.json()})

             .then(tradeValues => {
                 console.log('tradeValues', tradeValues);
                 if (tradeValues.trades.length === 0)
                 {
                     tradeValues = Object.assign({}, tradeValues, { trades: [{}] });
                 }
                if (!Array.isArray(tradeValues.trades)) {
                     //return Promise.resolve([{}]);
                     tradeValues = [{}];
                 }


        dispatch({ type: EXTERNAL_GET_TRANS, payload: tradeValues });
                dispatch({ type: EXTERNAL_FLAG, payload: false });
                 Actions.externalsales();
         })
          .catch(error => console.log('error ' + error));
    };
};

export const externalGetTransDashboard = (commodityCode, cropYear) => {

    return (dispatch, getState) => {
        //const commodityCode = getState().myFar.myFarmCropData.code;
        //const cropYear = getState().myFar.myFarmCropData.name.slice(-4);

        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${DEV_CROP_EXTERNAL_TRADE_URL}externalTrades/519/${commodityCode}/${cropYear}/trades`;
        console.log(url);
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': X_API_KEY
            }
        })
            .then(response => { console.log('response', response);return response.json()})

            .then(tradeValues => {
                console.log('tradeValues', tradeValues);
                if (!Array.isArray(tradeValues.trades)) {
                    //return Promise.resolve([{}]);
                    tradeValues = [{}];
                }


                dispatch({ type: EXTERNAL_GET_TRANS, payload: tradeValues });
                dispatch({ type: EXTERNAL_FLAG, payload: true });
                Actions.externalsales();
            })
            .catch(error => console.log('error ' + error));
    };
};

export const saveExternalTrades = (trades) => {

    return (dispatch, getState) => {
        const commodityCode = getState().myFar.myFarmCropData.code;
        const cropYear = getState().myFar.myFarmCropData.name.slice(-4);
        const tradeValues = trades.map(item => {
            if (item.active === undefined) {
            return Object.assign({}, item,
            {
                quantity: parseFloat(item.quantity),
                futuresPrice: parseFloat(item.futuresPrice),
                basis: parseFloat(item.basis || 0),
                adjustments: parseFloat(item.adjustments || 0),
                active: true,
            netContractPrice: parseFloat(item.futuresPrice) + parseFloat(item.basis || 0) + parseFloat(item.adjustments || 0)
            });
            } else {
            return Object.assign({}, item,
                {
                    quantity: parseFloat(item.quantity),
                    futuresPrice: parseFloat(item.futuresPrice),
                    basis: parseFloat(item.basis || 0),
                    adjustments: parseFloat(item.adjustments || 0),
                    netContractPrice: parseFloat(item.futuresPrice) + parseFloat(item.basis || 0) + parseFloat(item.adjustments || 0)
                });

        }
            });
        console.log('newTrades',trades);

        console.log('tradeValues', tradeValues);
        console.log('tradeValues', JSON.stringify(trades));

        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${DEV_CROP_EXTERNAL_TRADE_URL}externalTrades/519/${commodityCode}/${cropYear}/trades`;
        console.log(url);
        return fetch(url, {
            method: 'PUT',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': X_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tradeValues)

        })
            .then(response => {console.log(response);return response.json()})

            .then(savedTradeValues => {
                console.log('savedTradeValues', savedTradeValues);
                const savedTrades = Object.assign({}, { trades: savedTradeValues });
                console.log(savedTrades);
                dispatch({ type: EXTERNAL_GET_TRANS, payload: savedTrades });
                Alert.alert('Save Data');
            })
            .catch(error => console.log('error ' + error));
    };
};

