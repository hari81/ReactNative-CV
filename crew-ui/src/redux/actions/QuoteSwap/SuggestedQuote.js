import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { SUGGESTED_OPTIMAL_QUOTE, OPTIMAL_QUOTE_SPIN_ACTIVE, ESTIMATED_PROFIT_START, ESTIMATED_PROFIT_END, CLEAR_APPLICATION_STATE } from '../types';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import { ORDER_SERVICES_URL, VELO_SERVICES_URL } from '../../../ServiceURLS/index';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';

export const optimalSuggestedQuote = (optimalValue, cropYear) => {
   // console.log('optimal Value', optimalValue);
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: true });
        const quoteUrl = `${ORDER_SERVICES_URL}quotes/optimalQuote`;
        console.log('quoteURL', quoteUrl);
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
        console.log('Body of quote', quoteBody);
        return doPostFetch(quoteUrl, quoteBody, getState().auth.crmSToken)
            .then(response => {
                console.log('response', response);
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
                console.log('suggested Quote', suggestedValue);
                dispatch({ type: SUGGESTED_OPTIMAL_QUOTE, payload: suggestedValue });
                Actions.suggestedQuote({ suggestQuote: suggestedValue, previousState: optimalValue, cropYear });
                dispatch({ type: OPTIMAL_QUOTE_SPIN_ACTIVE, payload: false });
            })
            .catch(bugsnag.notify);
    };
};

export const estimateProfit = (start) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${VELO_SERVICES_URL}dashboard/profitabilityMatrix`;
        const body = {
            areaPlanted: getState().dashBoardData.Data.myFarmProduction.areaPlanted,
            basis: 0,
            expectedYield: getState().dashBoardData.Data.myFarmProduction.expectedYield,
            externalTradesAmount: 0,
            externalTradesQuantity: 0,
            includeBasis: false,
            openPositionsAmount: 0,
            openPositionsQuantity: 0,
            priceIncrement: 0.1,
            targetPrice: (start === 'Start' ? getState().optimalQuote.suggestedQuote.strike : getState().optimalQuote.suggestedQuote.bonusPrice) + getState().optimalQuote.suggestedQuote.price,
            unitCost: getState().dashBoardData.Data.myFarmProduction.unitCost,
            xDimension: 1,
            yDimension: 1,
            yieldIncrement: 5
        };
        return doPostFetch(url, body, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                    return;
                }
                if (response.ok) {
                    return response.json();
                } else {
                    return 'invalid';
                }
            }, rej => Promise.reject(rej))
            .then(estProfit => {
                    if (estProfit === 'invalid') {
                        return;
                    }
                    if (start === 'Start') {
                        dispatch({ type: ESTIMATED_PROFIT_START, payload: estProfit[0].value });
                    } else {
                        dispatch({ type: ESTIMATED_PROFIT_END, payload: estProfit[0].value });
                    }
                })
            .catch(bugsnag.notify);
    };
};
