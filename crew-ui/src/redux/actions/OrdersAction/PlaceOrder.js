import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CLEAR_APPLICATION_STATE } from '../types';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';

export const placeOrder = () => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${ORDER_SERVICES_URL}orders`;
        const sugData = getState().optimalQuote.suggestedQuote;
        const body = {
            quoteId: sugData.quoteId,
            riskProductId: sugData.metadata.riskProductId,
            quoteType: sugData.metadata.quoteType,
            quantity: common.cleanNumericString(sugData.metadata.quantity),
            buySell: sugData.metadata.buySell,
            underlying: sugData.metadata.underlying,
            orderType: sugData.metadata.orderType,
            expirationDate: common.formatDate(sugData.metadata.expirationDate, 6),
            targetPrice: sugData.price,
            goodTilDate: common.formatDate(sugData.metadata.expirationDate, 6)
        };
        console.log('placing Data', body);
        return doPostFetch(url, body, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                }
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                    return;
                }
                //redirect to failure screen
                Actions.tcerror();
            })
            .then((orderData) => {
                if (orderData === undefined) {
                    return;
                }
                switch (orderData.status) {
                    case '201':
                    case 201:
                        Actions.tcorderreceipt({ orderId: orderData.id, message: orderData.statusMessage }); break;
                    case '500':
                    case 500:
                        Actions.tcerror({ message: orderData.statusMessage }); break;
                    case '400':
                    case 400:
                        Actions.tcerror({ message: orderData.statusMessage }); break;
                    default:
                        Actions.tcerror({ message: orderData.statusMessage }); break;
                }
            })
            .catch((status, error) => {
                console.log('error', error);
                bugsnag.notify(error);
                //redirect to order failure screen
                Actions.tcerror();
            });
    };
};