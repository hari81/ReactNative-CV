import base64 from 'base-64';
import { REST_API_URL, X_API_KEY } from '../../../../ServiceURLS/index';

export const quoteSwapUnderlying = (year, code) => {
    return (dispatch, getState) => {
        dispatch({type:'SPIN_ACTIVE'})
        const url = `${REST_API_URL}api/underlyings?commodity=${code}&cropYear=${year}&sort=contractMonth.month,contractMonth.year`
        return fetch(url, {
            method: 'GET',
            headers: {
                'x-api-key': X_API_KEY,
                Authorization:
                "Basic " +
                base64.encode(
                    getState().auth.email + ":" + getState().auth.password
                ),
            }
        })
            .then(response => response.json())
            .then(quoteSwapUnderlyingItems => {
                //console.log(quoteSwapUnderlyingItems)
                const symbols = (quoteSwapUnderlyingItems.map(obj => obj.symbol))
                const url = `${REST_API_URL}api/quotes`
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'x-api-key': X_API_KEY,
                        "Content-Type": "application/json",
                        Authorization:
                        "Basic " +
                        base64.encode(
                            getState().auth.email + ':' + getState().auth.password
                        ),
                    },
                    body: JSON.stringify({
                        quoteType: 'mkt',
                        underlyings: symbols
                    })

                }).then(response => response.json())
                    .then(underlyingQuotes => {
                        //console.log(underlyingQuotes)
                        const contractData = quoteSwapUnderlyingItems.map((o, i) => {
                            return {
                                id:i,
                                month: o.contractMonth.month.name,
                                year: o.contractMonth.year.value,
                                askPrice: underlyingQuotes.quotes[i]?underlyingQuotes.quotes[i].askPrice:0,
                                bidPrice: underlyingQuotes.quotes[i]?underlyingQuotes.quotes[i].bidPrice:0,
                                cropCode:code,
                                cropYear:year
                            };
                        });
                        console.log(contractData);
                        dispatch(contractMonthData(contractData))
                    });
            })
            .catch(error => console.log(error));
    };
};
export function contractMonthData(contractData) {
    //console.log(contractData)
    return {
        type: "CONTRACT_MONTH_DATA",
        payload:contractData
    };
}