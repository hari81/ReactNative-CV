import { Alert } from 'react-native';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch, doGetTradeReceiptFetch } from '../../../Utils/FetchApiCalls';

export const OpenPositionsData = (crop) => {
  return (dispatch, getState) => {
      dispatch({ type: FETCHING_ORDERS_ACTIVITY });

      const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year`;
          return doGetFetch(url, getState().auth.email, getState().auth.password)
          .then(response => response.json())
          .then(opens => {
              if (!Array.isArray(opens)) {
                  dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions:[] });
               }
              return Promise.all(
                  opens.map(items => {
                     const underlyingURL = `${ORDER_SERVICES_URL}underlyings/${items.lines[0].underlying}`;
                     return doGetFetch(underlyingURL, getState().auth.email, getState().auth.password)
                     .then(response => { /*console.log(response);*/ return response.json(); });
                  })
              )
                  .then(res => {
                      return opens.map((item, index) => {
                          return Object.assign({}, item, {
                              underlyingObjectData: res[index]
                          });
                      });
                  })
                  .then(openPositions =>
                      dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions }));
          })
          .catch(error => {
              console.error(`error ${error}`);
          });
  };
};

export const tradeReceipt = (relativePath) => {
    return (dispatch, getState) => {
        const url = `${ORDER_SERVICES_URL}${relativePath.substr(1, relativePath.length)}`;
        return doGetTradeReceiptFetch(url, getState().auth.email, getState().auth.password)
            .then(response => {
                if (!response.ok) {
                    Alert.alert('Trade Report Not ready.');
                }
            })
            .catch(error => {
                console.error(`error ${error}`);
            });
    };
};

