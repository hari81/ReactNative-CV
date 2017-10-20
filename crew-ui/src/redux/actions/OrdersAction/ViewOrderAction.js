import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, DROP_DOWN_VALUES, ITEMS_FETCH_DATA_SUCCESS } from '../types';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';

export const ViewOrdersData = (crop) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_ORDERS_ACTIVITY });
    const oCrop = getState().account.defaultAccount.commodities.find(x => x.commodity === crop);
    const url = `${ORDER_SERVICES_URL}orders?commodity=${crop}&sort=underlyingMonth,underlyingYear`;
    return doGetFetch(url, getState().auth.basicToken)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            common.createAlertErrorMessage(response, 'There was an issue in retrieving the orders.');
        })
        .then(items => {
            const oOrders = items.value;
            if (!Array.isArray(oOrders)) {
                dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, items: [] });
            } else {
                return Promise.all(
                  oOrders.map((item) => {
                    const oUnderlying = common.createUnderlyingObject(item.underlying);                   
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
                .then(orders => {
                    dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, items: orders });
                });
            }
      })
      .catch(error => {
          console.error(`error ${error}`);
      });
  };
};

export const dropDownCrop = () => {
  return (dispatch, getState) => {
    const url = `${ORDER_SERVICES_URL}commodities`;
    return doGetFetch(url, getState().auth.basicToken)
        .then(response => response.json())
      .then(dropDownData => {
        //  console.log(dropDownData);
        dispatch({ type: DROP_DOWN_VALUES, payload: dropDownData });
      })
      .catch(error => console.log(`error ${error}`));
  };
};

