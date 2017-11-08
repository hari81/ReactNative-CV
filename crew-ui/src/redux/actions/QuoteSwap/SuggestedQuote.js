import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { SUGGESTED_OPTIMAL_QUOTE, OPTIMAL_QUOTE_SPIN_ACTIVE } from '../types';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';

export const optimalSuggestedQuote = (optimalValue, cropYear) => {
   // console.log('optimal Value', optimalValue);
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: true });
        const quoteUrl = `${ORDER_SERVICES_URL}quotes/optimalQuote`;
       // console.log('quoteURL', quoteUrl);
        const quoteBody = {
            riskProductId: 110,
            orderType: 'limit',
            quoteType: 'new',
            quantity: Number(common.cleanNumericString(optimalValue.quantity)),
            buySell: 'S',
            underlying: optimalValue.underlying,
            strike: Number(optimalValue.strike),
            targetPrice: 0.0,
            expirationDate: optimalValue.expirationDate,
            //notes: "Stephen Test ATWAQ"
        };
      //  console.log('Body of quote', quoteBody);
        return doPostFetch(quoteUrl, quoteBody, getState().auth.crmSToken)
            .then(response => { /*console.log('response', response);*/
                if(response.ok) {
                    return response.json();
                } else {
                    Alert.alert('No Suggested Quote', 'Please contact Cargill Desk');
                }
            })
            .then(suggestedValue => {
                if (suggestedValue === undefined) {
                    dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: false });
                    return;
                }
               // console.log('suggested Quote', suggestedValue);
                dispatch({ type: SUGGESTED_OPTIMAL_QUOTE, payload: suggestedValue });
                Actions.suggestedQuote({ suggestQuote: suggestedValue, previousState: optimalValue, cropYear });
                dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: false });
            })
            .catch(bugsnag.notify);
    };
};
