import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { doPostFetch } from '../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../ServiceURLS/index';
import bugsnag from '../../components/common/BugSnag';
import { CLEAR_APPLICATION_STATE } from './types';

export const profitabilityMatrixData = (obj) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: 'MATRIX_SPINNER' });
        const url = `${VELO_SERVICES_URL}dashboard/profitabilityMatrix`;
        const body = {
            areaPlanted: getState().dashBoardData.Data.myFarmProduction.areaPlanted,
            contingentOfferAmount: getState().dashBoardData.Data.actionBar.openPositions.totalContingentOfferTradeAmount,
            contingentOfferQuantity: getState().dashBoardData.Data.actionBar.openPositions.totalContingentOfferQuantity,
            basis: getState().dashBoardData.Data.myFarmTiles.basisEstimate,
            externalTradesAmount: getState().dashBoardData.Data.myFarmProduction.externalTrades.totalTradeAmount,
            externalTradesQuantity: getState().dashBoardData.Data.myFarmProduction.externalTrades.totalQuantity,
            includeBasis: getState().dashBoardData.Data.myFarmTiles.basisEstimateEnabled,
            openPositionsAmount: getState().dashBoardData.Data.myFarmProduction.openPositions.totalTradeAmount,
            openPositionsQuantity: getState().dashBoardData.Data.myFarmProduction.openPositions.totalQuantity,
            unitCost: getState().dashBoardData.Data.myFarmProduction.unitCost,
            xDimension: 11,
            yDimension: 11,
            priceIncrement: obj.matrixPriceIncrement,
            targetPrice: obj.targetPrice,
            expectedYield: obj.expectedYield,
            yieldIncrement: obj.matrixYieldIncrement
        };
        return doPostFetch(url, body, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                    return;
                }
                return response.json();
            }, rej => Promise.reject(rej))
            .then(matrixData => {
                if (matrixData === undefined) {
                    return;
                }
                const Data = matrixData.map((o, i) => {
                return {
                    id: i,
                    price: o.price,
                    yield: o.yield,
                    value: o.value
                };
        });
                    dispatch(profitabilityMatrix(Data));
    }

            )
            .catch(/*(status, error) => {
                console.log(`error ${error}`);
            }*/bugsnag.notify);
    };
};
export function profitabilityMatrix(matrixData) {
    return {
        type: 'MATRIX_DATA',
        payload: matrixData
    };
}

