import base64 from 'base-64';
import { REST_API_URL } from '../../../../ServiceURLS/index';
import { doGetFetch, doPostFetch } from '../../../../Utils/FetchApiCalls';

export const quoteSwapUnderlying = (year, code) => {
    return (dispatch, getState) => {
        dispatch({ type: 'SPIN_ACTIVE' });
        const url = `${REST_API_URL}api/underlyings?commodity=${code}&cropYear=${year}&sort=contractMonth.month,contractMonth.year`;
       return doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(quoteSwapUnderlyingItems => {
                //console.log(quoteSwapUnderlyingItems)
                const symbols = (quoteSwapUnderlyingItems.map(obj => obj.symbol));
                const swapUrl = `${REST_API_URL}api/quotes`;
                const quoteUnderlying = {
                    quoteType: 'mkt',
                    underlyings: symbols
                };
               return doPostFetch(swapUrl, quoteUnderlying, getState().auth.email, getState().auth.password)
                    .then(response => response.json(), rej => Promise.reject(rej))
                    .then(underlyingQuotes => {
                        const contractData = quoteSwapUnderlyingItems.map((o, i) => {
                            return {
                                id: i,
                                month: o.contractMonth.month.name,
                                year: o.contractMonth.year.value,
                                askPrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].askPrice : 0,
                                bidPrice: underlyingQuotes.quotes[i] ? underlyingQuotes.quotes[i].bidPrice : 0,
                                cropCode: code,
                                cropYear: year
                            };
                        }, rej => Promise.reject(rej));
                        dispatch(contractMonthData(contractData));
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