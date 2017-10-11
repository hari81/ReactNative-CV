import { doPostFetch } from '../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../ServiceURLS/index';

export const profitabilityMatrixData = (obj) => {
    return (dispatch, getState) => {
        dispatch({ type: 'MATRIX_SPINNER' });
        const url = `${VELO_SERVICES_URL}dashboard/profitabilityMatrix`;
        const body = {
            areaPlanted: getState().dashBoardData.Data.myFarmProduction.areaPlanted,
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
        }
        console.log(body);
        return doPostFetch(url, body, getState().auth.email, getState().auth.password)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(matrixData => {
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
            .catch((status, error) => {
                console.log(`error ${error}`);
            });
    };
};
export function profitabilityMatrix(matrixData) {
    return {
        type: 'MATRIX_DATA',
        payload: matrixData
    };
}

