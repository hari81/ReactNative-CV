import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { doGetFetch, doPutFetch } from '../../../Utils/FetchApiCalls';
import { EXTERNAL_GET_TRANS, EXTERNAL_FLAG } from '../types';
import { QA_ACCOUNT_EXTERNALTRADES_FARMDATA } from '../../../ServiceURLS/index';

export const externalGetTrans = () => {
    return (dispatch, getState) => {
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const cropButData = getState().cropsButtons.cropButtons.filter(item => item.id === getState().cropsButtons.selectedId);
        const commodityCode = cropButData[0].code;
        const cropYear = cropButData[0].cropYear;
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}externalTrades/${accountNo}/${commodityCode}/${cropYear}/trades`;
        //  console.log(url);
        doGetFetch(url, getState().auth.email, getState().auth.password)
       /* return fetch(url, {
            method: 'GET',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': X_API_KEY
            }
        })*/
            .then(response => response.json())
            .then(tradeValues => {
                //  console.log('tradeValues', tradeValues);
                if (tradeValues.trades.length === 0) {
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
            .catch(error => console.log(`error ${error}`));
    };
};

export const externalGetTransDashboard = (commodityCode, cropYear) => {

    return (dispatch, getState) => {
        //const commodityCode = getState().myFar.myFarmCropData.code;
        //const cropYear = getState().myFar.myFarmCropData.name.slice(-4);

        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}externalTrades/${accountNo}/${commodityCode}/${cropYear}/trades`;
        //  console.log(url);
        doGetFetch(url, getState().auth.email, getState().auth.password)
       /* return fetch(url, {
            method: 'GET',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': X_API_KEY
            }
        })*/
            .then(response => response.json())
            .then(tradeValues => {
                // console.log('tradeValues', tradeValues);
                if (tradeValues.trades.length === 0) {
                    tradeValues = Object.assign({}, tradeValues, { trades: [{}] });
                }
                if (!Array.isArray(tradeValues.trades)) {
                    //return Promise.resolve([{}]);
                    tradeValues = [{}];
                }
                dispatch({ type: EXTERNAL_GET_TRANS, payload: tradeValues });
                dispatch({ type: EXTERNAL_FLAG, payload: true });
                Actions.externalsales();
            })
            .catch(error => console.log(`error ${error}`));
    };
};

export const saveExternalTrades = (newTrades, removedTrades) => {
    return (dispatch, getState) => {
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const cropButData = getState().cropsButtons.cropButtons.filter(item => item.id === getState().cropsButtons.selectedId);
        const commodityCode = cropButData[0].code;
        const cropYear = cropButData[0].cropYear;
        let allTrades;
        if (removedTrades.length > 0) {
            allTrades = newTrades.concat(removedTrades);
        } else {
            allTrades = newTrades;
        }
        const tradeValues = allTrades.map(item => {
            switch (item.active) {
                case undefined:
                    return Object.assign({}, item, tradeSetData(item), { active: true });
                case true:
                    return Object.assign({}, item, tradeSetData(item));
                case false:
                    const oldTradeData = getState().external.tradeData.trades.filter(trade => trade.id === item.id);
                    return Object.assign({}, item, tradeSetRemoveData(oldTradeData[0]));
            }
        });
        //console.log('Trade Data', tradeValues);
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}externalTrades/${accountNo}/${commodityCode}/${cropYear}/trades`;
        // console.log(url);
        doPutFetch(url, tradeValues, getState().auth.email, getState().auth.password)
       /* return fetch(url, {
            method: 'PUT',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': X_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tradeValues)

        })*/
            .then(response => response.json())
            .then(savedTradeValues => {
                //console.log('savedTradeValues', savedTradeValues);
                const savedTrades = Object.assign({}, { trades: savedTradeValues });
                //console.log(savedTrades);
                dispatch({ type: EXTERNAL_GET_TRANS, payload: savedTrades });
                Alert.alert('Trade Data Saved Successfully');
            })
            .catch(error => console.log(`error ${error}`));
    };
};

function tradeSetData(item) {
    return Object.assign({}, {
        quantity: parseFloat(item.quantity),
        futuresPrice: parseFloat(item.futuresPrice),
        basis: parseFloat(item.basis || 0),
        adjustments: parseFloat(item.adjustments || 0),
        netContractPrice: parseFloat(item.futuresPrice) + parseFloat(item.basis || 0) + parseFloat(item.adjustments || 0)
    });
}

function tradeSetRemoveData(removeTransData) {
    return Object.assign({}, {
        tradeDate: removeTransData.tradeDate,
        quantity: removeTransData.quantity,
        futuresPrice: removeTransData.futuresPrice,
        basis: removeTransData.basis,
        adjustments: removeTransData.adjustments
    });
}

