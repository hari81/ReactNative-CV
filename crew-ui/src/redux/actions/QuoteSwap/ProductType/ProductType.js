import { ORDER_SERVICES_URL } from '../../../../ServiceURLS/index';
import { doGetFetch } from '../../../../Utils/FetchApiCalls';
import bugsnag from '../../../../components/common/BugSnag';

export const productType = () => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${ORDER_SERVICES_URL}riskproducts`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => { console.log('res', response);
                if (response.ok) {
                    return response.json();
                } else {
                    return 'invalid';
                }
                }, rej => Promise.reject(rej))
            .then(riskProducts => {
                if (riskProducts === 'invalid') { return; }
                dispatch(riskProductData(riskProducts));
            })
            .catch(/*(status, error) => {
                console.log(`error ${error}`);
            }*/bugsnag.notify);
    };
};
export function riskProductData(riskproducts) {
    return {
        type: 'RISK_PRODUCTS_DATA',
        payload: riskproducts
    };
}

