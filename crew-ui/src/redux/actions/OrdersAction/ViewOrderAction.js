import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, ITEMS_FETCH_DATA_SUCCESS, CLEAR_APPLICATION_STATE, SEGMENT_TAB_SELECT } from '../types';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';

export const ViewOrdersData = (crop, cropYear) => {
  return (dispatch, getState) => {
      const user = getState().account.accountDetails;
      bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
    dispatch({ type: FETCHING_ORDERS_ACTIVITY });
    const oCrop = getState().account.defaultAccount.commodities.find(x => x.commodity === crop);
    const url = `${ORDER_SERVICES_URL}orders?commodity=${crop}&cropYear=${cropYear}&sort=underlyingMonth,underlyingYear`;
    //console.log('orders Url', url);
    return doGetFetch(url, getState().auth.crmSToken)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            if (response.status === 403) {
                response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE }); });
                return;
            }
            common.handleError(response, 'There was an issue in retrieving the orders.');
        })
        .then(items => {
            if (items === undefined) {
                return;
            }
            const oOrders = items.value;
            if (!Array.isArray(oOrders)) {
                dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, items: [] });
            } else {
                const orders = oOrders.map((item) => {
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
                  });
                    dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, items: orders });
            }
      })
      .catch(error => {
        common.handleError(error, 'There was an issue in retrieving the orders.');
        dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, items: [] });
    });
  };
};

export const segmentTabSelect = (tab) => {
    return { type: SEGMENT_TAB_SELECT, payload: tab };
}

/*export const dropDownCrop = () => {
  return (dispatch, getState) => {
      const user = getState().account.accountDetails;
      bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
    const url = `${ORDER_SERVICES_URL}commodities`;
    return doGetFetch(url, getState().auth.crmSToken)
        .then(response => {
            if (response.status === 403) {
                response.json().then(userFail => { Alert.alert(userFail.message); });
                return;
            }
            return response.json();
        })
      .then(dropDownData => {
        //  console.log(dropDownData);
        dispatch({ type: DROP_DOWN_VALUES, payload: dropDownData });
      })
      .catch(/*error => console.log(`error ${error}`)*//*bugsnag.notify);
  };
};*/

