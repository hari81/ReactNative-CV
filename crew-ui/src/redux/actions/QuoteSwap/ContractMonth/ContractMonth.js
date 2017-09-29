import { REST_API_URL } from '../../../../ServiceURLS/index';
import { doGetFetch, doPostFetch } from '../../../../Utils/FetchApiCalls';
import * as common from '../../../../Utils/common';
import { bushelLimit } from '../ContractMonth/ContractMonthSelect';

export const quoteSwapUnderlying = (year, code) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SPIN_ACTIVE' });
        const cObject = getState().account.defaultAccount.commodities.find(x => x.commodity === code);
        const oSymbols = cObject.crops.find(x => x.cropYear === year).futuresContracts;
        const swapUrl = `${REST_API_URL}quotes`;
        //const lswapUrl = 'https://calculon-qa.crm.cargill.com/extracense/api/quotes';

        const quoteUnderlying = {
            quoteType: 'mkt',
            underlyings: oSymbols
        };
        console.log('start quote swap underlying db lookup 1', new Date());        
        return doPostFetch(swapUrl, quoteUnderlying, getState().auth.email, getState().auth.password)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(underlyingQuotes => {
                console.log('end quote swap underlying db lookup 1', new Date());        
                const contractData = quoteUnderlying.underlyings.map((o, i) => {
                    const oUnderlying = common.createUnderlyingObject(o);
                    return {
                        id: i,
                        month: oUnderlying.underlyingMonthDesc,
                        year: oUnderlying.underlyingYear.value,
                        underlying: oUnderlying.underlying,
                        lastTradeDate: '2017-11-01', // o.lastTradeDate,
                        askPrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].askPrice : 0,
                        bidPrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].bidPrice : 0,
                        settlePrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].settlePrice : 0,
                        cropCode: code,
                        cropYear: year
                    };
                }, rej => Promise.reject(rej));
                console.log('start quote swap underlying db lookup 2', new Date());        
                return doGetFetch(`${REST_API_URL}positions/groupLimits?underlying=${quoteUnderlying.underlyings[0]}`, getState().auth.email, getState().auth.password)
                .then(response => response.json(), rej => Promise.reject(rej))
                .then(limit => {
                    console.log('end quote swap underlying db lookup 2', new Date());        
                    dispatch(contractMonthData(contractData));
                    dispatch(bushelLimit(limit));
                    console.log('* * * * * end quote swap underlying * * * * *', new Date());                    
                })
                .catch((status, error) => {
                    console.log(`error ${error}`);
                });
            })
        .catch(error => console.log(error));
    };
};

export function contractMonthData(contractData) {
       return {
        type: 'CONTRACT_MONTH_DATA',
        payload: contractData
    };
}