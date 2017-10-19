import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { doGetFetch, doPutFetch } from '../../../Utils/FetchApiCalls';
import { EXTERNAL_GET_TRANS, EXTERNAL_FLAG } from '../types';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';

export const externalGetTrans = () => {
    return (dispatch, getState) => {
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const cropButData = getState().cropsButtons.cropButtons.filter(item => item.id === getState().cropsButtons.selectedId);
        const commodityCode = cropButData[0].code;
        const cropYear = cropButData[0].cropYear;
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = `${VELO_SERVICES_URL}externalTrades/${accountNo}/${commodityCode}/${cropYear}/trades`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => response.json())
            .then(tradeValues => {
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
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const url = `${VELO_SERVICES_URL}externalTrades/${accountNo}/${commodityCode}/${cropYear}/trades`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => response.json())
            .then(tradeValues => {
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

export const saveExternalTrades = (newTrades) => {
    return (dispatch, getState) => {
        const accountNo = getState().account.accountDetails.defaultAccountId;
        const cropButData = getState().cropsButtons.cropButtons.filter(item => item.id === getState().cropsButtons.selectedId);
        const commodityCode = cropButData[0].code;
        const cropYear = cropButData[0].cropYear;
      //  console.log('redux state', getState().external.tradeData.trades);
      //  console.log('local state', newTrades);
        const reduxState = getState().external.tradeData.trades;
        //console.log(reduxState);
        const reduxId = reduxState.map(item => item.id);
       const localId = newTrades.map(item => item.id);
       const removeId = reduxId.filter(id => localId.indexOf(id) === -1);
       const removeTrades = removeId.map(id => Object.assign(reduxState.filter(trade => trade.id === id)[0], { active: false }));
      // console.log('remove', removeTrades);
        const tradeValue = newTrades.map(item => {
            switch (item.active) {
                case undefined:
                    return Object.assign({}, item, tradeSetData(item), { active: true });
                case true:
                    return Object.assign({}, item, tradeSetData(item));
            }
        });
        const tradeValues = tradeValue.concat(removeTrades);
      //  console.log(tradeValues);
        const url = `${VELO_SERVICES_URL}externalTrades/${accountNo}/${commodityCode}/${cropYear}/trades`;
     //   console.log(url);
        return doPutFetch(url, tradeValues, getState().auth.crmSToken)
            .then(response => response.json())
            .then(savedTradeValues => {
                const savedTrades = Object.assign({}, { trades: savedTradeValues });
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

/*function tradeSetRemoveData(removeTransData) {
    return Object.assign({}, {
        tradeDate: removeTransData.tradeDate,
        quantity: removeTransData.quantity,
        futuresPrice: removeTransData.futuresPrice,
        basis: removeTransData.basis,
        adjustments: removeTransData.adjustments
    });
}*/



