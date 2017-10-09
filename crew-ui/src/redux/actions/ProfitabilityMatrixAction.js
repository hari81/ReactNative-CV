import { doPostFetch } from '../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../ServiceURLS/index';

export const profitabilityMatrixData = () => {
    return (dispatch, getState) => {
        dispatch({ type: 'MATRIX_SPINNER' });
        const url = `${VELO_SERVICES_URL}dashboard/profitabilityMatrix`;
        const body = {
            "areaPlanted": 3000,
            "basis": -0.17,
            "expectedYield": 165,
            "externalTradesAmount": 51000,
            "externalTradesQuantity": 14000,
            "includeBasis": false,
            "openPositionsAmount": 361330,
            "openPositionsQuantity": 92000,
            "priceIncrement": 0.25,
            "targetPrice": 3.7,
            "unitCost": 600,
            "xDimension": 11,
            "yDimension": 11,
            "yieldIncrement": 10
        }
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

