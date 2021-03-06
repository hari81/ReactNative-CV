import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ORDER_SERVICES_URL } from '../../../../ServiceURLS/index';
import { doGetFetch, doPostFetch } from '../../../../Utils/FetchApiCalls';
import * as common from '../../../../Utils/common';
import { bushelLimitShow } from '../ContractMonth/ContractMonthSelect';
import bugsnag from '../../../../components/common/BugSnag';
import { CLEAR_APPLICATION_STATE, SPIN_ACTIVE, CONTRACT_MONTH_DATA, BUSHEL_SPIN_INACTIVE, CONTRACT_ERROR, BUSHEL_SPIN_ACTIVE } from '../../types';

export const quoteSwapUnderlying = (year, code) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
       // console.log('* * * * * start quote swap underlying * * * * *', new Date());
        dispatch({ type: SPIN_ACTIVE });
        let isSuccess = true;
        const cObject = getState().account.defaultAccount.commodities.find(x => x.commodity === code);
        const oContracts = cObject.crops.find(x => x.cropYear === year).futuresContracts;
        const oSymbols = oContracts.map(o => {
            return o.symbol;
        });
        const swapUrl = `${ORDER_SERVICES_URL}quotes`;

        const quoteUnderlying = {
            quoteType: 'mkt',
            underlyings: oSymbols
        };
        //console.log('start quote swap underlying db lookup 1', new Date());
        return doPostFetch(swapUrl, quoteUnderlying, getState().auth.crmSToken)
            .then(response => {
                if (response.status !== 200) {
                    isSuccess = false;
                }
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE }); });
                    return;
                }
                return response.json();
            })
            .then(underlyingQuotes => {
                if (underlyingQuotes === undefined) {
                    return;
                }
                if (isSuccess) {
                   // console.log('end quote swap underlying db lookup 1', new Date());
                    const contractData = oContracts.map((o, i) => {
                        const oUnderlying = common.createUnderlyingObject(o.symbol);
                        return {
                            id: i,
                            month: oUnderlying.underlyingMonthDesc,
                            year: oUnderlying.underlyingYear,
                            underlying: oUnderlying.underlying,
                            lastTradeDate: common.formatDate(o.lastTradeDate, 6),
                            askPrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].askPrice : 0,
                            bidPrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].bidPrice : 0,
                            settlePrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].settlePrice : 0,
                            cropCode: code,
                            cropYear: year
                        };
                    }, rej => Promise.reject(rej));
                   // console.log('start quote swap underlying db lookup 2', new Date());
                    return doGetFetch(`${ORDER_SERVICES_URL}positions/groupLimits?underlying=${quoteUnderlying.underlyings[0]}`, getState().auth.crmSToken)
                    .then(response => {
                        if (response.status === 403) {
                            response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE }); });
                            return;
                        }
                        return response.json();
                    }, rej => Promise.reject(rej))
                    .then(limit => {
                        //console.log('end quote swap underlying db lookup 2', new Date());
                        dispatch(contractMonthData(contractData));
                        dispatch(bushelLimitShow(limit));
                       // console.log('* * * * * end quote swap underlying * * * * *', new Date());
                    })
                    .catch(error => {
                        common.handleError(error, 'There was an issue with retrieving data for this commodity.');
                        dispatch(contractMonthData(null));
                        dispatch({ type: CONTRACT_ERROR });
                    });
                }
                //issuccss = false
                common.handleError(underlyingQuotes, 'There was an issue with retrieving data for this commodity.');                    
                dispatch(contractMonthData(null));
                dispatch({ type: CONTRACT_ERROR });
            })
        .catch(error => {
            common.handleError(error, 'There was an issue with retrieving data for this commodity.');                    
            dispatch(contractMonthData(null));
            dispatch({ type: CONTRACT_ERROR });
        });
    };
};

export function contractMonthData(contractData) {
       return {
        type: CONTRACT_MONTH_DATA,
        payload: contractData
    };
}

export const bushelQuantityLimit = (underlying) => {
   // console.log('start quote swap underlying db lookup 2', new Date());
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: BUSHEL_SPIN_ACTIVE });
        return doGetFetch(`${ORDER_SERVICES_URL}positions/groupLimits?underlying=${underlying}`, getState().auth.crmSToken)
        .then(response => {
            if (response.status === 403) {
                response.json().then(userFail => { Alert.alert(userFail.message); });
                return;
            }
            return response.json();
        }, rej => Promise.reject(rej))
        .then(limit => {
            //console.log('end quote swap underlying db lookup 2', new Date());
            dispatch(bushelLimitShow(limit));
            dispatch({ type: BUSHEL_SPIN_INACTIVE });
        });
    };
};
