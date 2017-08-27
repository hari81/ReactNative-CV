/*jshint esversion: 6 */
'use strict';
import base64 from 'base-64';
import { REST_API_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS } from '../types';

export const OpenPositionsData = (crop) => {
  return (dispatch, getState) => {
      dispatch({type: FETCHING_ORDERS_ACTIVITY});

      const url = REST_API_URL + 'api/positions?commodity=' + crop + '&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year';
      console.log(url);
      return fetch(
          url,
          {
              method: 'GET',
              headers: {
                  Authorization:
                  'Basic ' +
                  base64.encode(getState().auth.email + ':' + getState().auth.password),
                  'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
              }
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
                      return fetch(
                          REST_API_URL + 'api/underlyings/' +
                          items.lines[0].underlying,
                          {
                              method: 'GET',
                              headers: {
                                  Authorization:
                                  'Basic ' +
                                  base64.encode(
                                      getState().auth.email + ':' + getState().auth.password
                                  ),
                                  'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
                              }
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
                      dispatch({type: OPEN_POSITIONS_DATA_SUCCESS, openPositions}));
          })
          .catch(error => {
                debugger;
              console.error("openposit " + error);

          });
  }
};
/*export function openPositionsDataSuccess(openPositions) {
  console.log(openPositions);
  return {
    type: 'OPEN_POSITIONS_DATA_SUCCESS',
    openPositions
  };
}*/
