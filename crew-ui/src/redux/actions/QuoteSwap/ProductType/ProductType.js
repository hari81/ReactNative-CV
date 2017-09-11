import base64 from "base-64";
import { REST_API_URL, X_API_KEY } from '../../../../ServiceURLS/index';
export const productType = () => {
    return (dispatch, getState) => {
        const url=`${REST_API_URL}api/riskproducts`
        return fetch(url, {
            method: 'GET',
            headers:{
                'x-api-key': X_API_KEY,
                Authorization:
                "Basic " +
                base64.encode(
                    getState().auth.email + ":" + getState().auth.password
                ),
            }
        })
            .then(response =>response.json())
            .then(riskProducts=>
                dispatch(riskProductData(riskProducts))
            )
            .catch((status, error) => {
                console.log('error' + error);
            });
    };
};
export function riskProductData(riskproducts){
    return{
        type: "RISK_PRODUCTS_DATA",
        payload:riskproducts
    }

}