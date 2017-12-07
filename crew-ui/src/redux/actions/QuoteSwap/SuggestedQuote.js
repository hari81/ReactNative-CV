import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { SUGGESTED_OPTIMAL_QUOTE, OPTIMAL_QUOTE_SPIN_ACTIVE } from '../types';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';

export const optimalSuggestedQuote = (id, optimalValue, cropYear) => {
   // console.log('optimal Value', optimalValue);
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: true });
        const quoteUrl = `${ORDER_SERVICES_URL}quotes/optimalQuote`;
        let quoteBody = null;
        if (id === 1) {
            quoteBody = {
                riskProductId: 110,
                orderType: 'limit',
                quoteType: 'new',
                buySell: 'B',
                targetPrice: 0.0,
                quantity: Number(common.cleanNumericString(optimalValue.quantity)),
                underlying: optimalValue.underlying,
                strike: Number(optimalValue.strike),
                expirationDate: optimalValue.expirationDate,

            };
        } else if (id === 2) {
            quoteBody = {
                riskProductId: 110,
                orderType: 'limit',
                quoteType: 'new',
                buySell: 'B',
                targetPrice: 0.0,
                quantity: getState().optimalQuote.suggestedQuote.metadata.quantity,
                underlying: getState().optimalQuote.suggestedQuote.metadata.underlying,
                expirationDate: getState().optimalQuote.suggestedQuote.metadata.expirationDate,
                strike: optimalValue.floorPrice,
                bonusPrice: optimalValue.bonusPrice,
                solveFor: 'premium'
            };
        }
        return doPostFetch(quoteUrl, quoteBody, getState().auth.crmSToken)
            .then(response => { /*console.log('response', response);*/
                if (response.ok) {
                    return response.json();
                } else {
                    Alert.alert('No Suggested Quote', 'Please contact Cargill Desk');
                    return;
                }
            })
            .then(suggestedValue => {
                if (suggestedValue === undefined) {
                    dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: false });
                    return;
                }
                dispatch({ type: SUGGESTED_OPTIMAL_QUOTE, payload: suggestedValue });
                if (id === 1) {
                    Actions.suggestedQuote({ suggestQuote: suggestedValue, previousState: optimalValue, cropYear });
                }
                dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: false });
            })
            .catch(bugsnag.notify);
    };
};
