import { REST_API_URL } from '../../../../ServiceURLS/index';
import { doGetFetch } from '../../../../Utils/FetchApiCalls';

export const productType = () => {
    return (dispatch, getState) => {
        const url = `${REST_API_URL}api/riskproducts`;
       return doGetFetch(url, getState().auth.email, getState().auth.passwor)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(riskProducts =>
                dispatch(riskProductData(riskProducts))
            )
            .catch((status, error) => {
                console.log(`error ${error}`);
            });
    };
};
export function riskProductData(riskproducts) {
    return {
        type: 'RISK_PRODUCTS_DATA',
        payload: riskproducts
    };
}


