import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, CLOSED_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';

export const ClosedPositionsData = (crop) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_ORDERS_ACTIVITY });
    const oCrop = getState().account.defaultAccount.commodities.find(x => x.commodity === crop);
    const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=closed&sort=product.contractMonth.month,product.contractMonth.year`;
    
    return doGetFetch(url, getState().auth.email, getState().auth.password)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            common.createAlertErrorMessage(response, 'There was an issue in retrieving the closed positions.');
        })
        .then(closed => {
            if (!Array.isArray(closed)) {
                dispatch({ type: CLOSED_POSITIONS_DATA_SUCCESS, payload: [] });
            } else {
                return Promise.all(
                    closed.map((item) => {
                        const oUnderlying = common.createUnderlyingObject(item.lines[0].underlying);                   
                        const uod = {
                            //year needs to be a int value instead of a string for later compares/equality tests
                            year: common.convertStringToInt(oUnderlying.underlyingYear),
                            crop: oCrop.name,
                            cropCode: oCrop.commodity,
                            month: oUnderlying.underlyingMonthDesc,
                            unit: oCrop.unitOfMeasure
                        };
                        return Object.assign({}, item, { underlyingObjectData: uod });
                    })
                )
                .then(closedPositions => {
                    const newClosed = closedPositions.filter(item => Object.keys(item.underlyingObjectData).length !== 0);
                    dispatch({ type: CLOSED_POSITIONS_DATA_SUCCESS, payload: newClosed });
                });
            }
      })
      .catch(error => {
          console.error(`error ${error}`);
      });
  };
};
