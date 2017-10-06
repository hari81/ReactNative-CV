import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch, reqHeaders, baseAuthentication } from '../../../Utils/FetchApiCalls';

export const OpenPositionsData = (crop) => {
  return (dispatch, getState) => {
      dispatch({ type: FETCHING_ORDERS_ACTIVITY });

      const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year`;
     // console.log(url);
      reqHeaders.append('Authorization', baseAuthentication(getState().auth.email, getState().auth.passwor));
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

