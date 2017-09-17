import { REST_API_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch, reqHeaders, baseAuthentication } from '../../../Utils/FetchApiCalls';

export const OpenPositionsData = (crop) => {
  return (dispatch, getState) => {
      dispatch({ type: FETCHING_ORDERS_ACTIVITY });

      const url = `${REST_API_URL}api/positions?commodity=${crop}&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year`;
     // console.log(url);
      reqHeaders.append('Authorization', baseAuthentication(getState().auth.email, getState().auth.passwor));
     // doGetFetch(url, getState().auth.email, getState().auth.password)
      return fetch(
          url,
          {
              method: 'GET',
              headers: reqHeaders
          }
      )
          .then(response => response.json())
          .then(opens => {
              //dispatch(openPositionsDataSuccess(openPositions))
              //console.log('Opnes:' + opens);
              if (!Array.isArray(opens)) {
                  dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions:[] });
                   //return Promise.resolve([]);
               }
              return Promise.all(
                  opens.map(items => {
                      //console.log(items.lines[0].underlying)
                      const underlyingURL = `${REST_API_URL}api/underlyings/${items.lines[0].underlying}`;
                     // doGetFetch(underlyingURL, getState().auth.email, getState().auth.password)
                      return fetch(underlyingURL,
                          {
                              method: 'GET',
                              headers: reqHeaders
                          }
                      )
                          .then(response => response.json());
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

