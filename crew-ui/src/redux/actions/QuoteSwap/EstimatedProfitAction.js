import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { ESTIMATED_PROFIT_START_S, ESTIMATED_PROFIT_END_S, ESTIMATED_PROFIT_START_C, ESTIMATED_PROFIT_END_C, CLEAR_APPLICATION_STATE } from '../types';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';
import bugsnag from '../../../components/common/BugSnag';

export const estimateProfit = (id, start, obj) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${VELO_SERVICES_URL}dashboard/profitabilityMatrix`;
        let body = null;
        if (id === 1) {
            body = {
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
        } else {
            body = {
                areaPlanted: getState().dashBoardData.Data.myFarmProduction.areaPlanted,
                basis: 0,
                expectedYield: getState().dashBoardData.Data.myFarmProduction.expectedYield,
                externalTradesAmount: 0,
                externalTradesQuantity: 0,
                includeBasis: false,
                openPositionsAmount: 0,
                openPositionsQuantity: 0,
                priceIncrement: 0.1,
                targetPrice: (start === 'Start' ? Number(obj.floorPrice) : Number(obj.bonusPrice)) + getState().optimalQuote.suggestedQuote.price,
                unitCost: getState().dashBoardData.Data.myFarmProduction.unitCost,
                xDimension: 1,
                yDimension: 1,
                yieldIncrement: 5
            };
        }
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
                if (id === 1) {
                    if (start === 'Start') {
                        dispatch({ type: ESTIMATED_PROFIT_START_S, payload: estProfit[0].value });
                    } else {
                        dispatch({ type: ESTIMATED_PROFIT_END_S, payload: estProfit[0].value });
                    }
                }
                if (id === 2) {
                    if (start === 'Start') {
                        dispatch({ type: ESTIMATED_PROFIT_START_C, payload: estProfit[0].value });
                    } else {
                        dispatch({ type: ESTIMATED_PROFIT_END_C, payload: estProfit[0].value });
                    }
                }
            })
            .catch(bugsnag.notify);
    };
};