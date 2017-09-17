import base64 from 'base-64';
import { REST_API_URL, X_API_KEY } from '../../../ServiceURLS/index';
import {
  FETCHING_ORDERS_ACTIVITY,
  DROP_DOWN_VALUES,
  ITEMS_FETCH_DATA_SUCCESS
} from '../types';

import { doGetFetch, reqHeaders, baseAuthentication } from '../../../Utils/FetchApiCalls';

export const ViewOrdersData = (crop) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_ORDERS_ACTIVITY });
    //console.log(crop);
    const url = `${REST_API_URL}api/orders?commodity=${crop}&sort=underlyingMonth,underlyingYear`;
    //console.log(url);
      reqHeaders.append('Authorization', baseAuthentication(getState().auth.email, getState().auth.passwor));
   // doGetFetch(url, getState().auth.email, getState().auth.password)
    return fetch(url, {
      method: 'GET',
      headers: reqHeaders
    })
      .then(response => response.json())
      .then(items => {
        return (
          Promise.all(
            items.value.map(item => {
                const underlyingURL = `${REST_API_URL}api/underlyings/${item.underlying}`;
              //  doGetFetch(underlyingURL, getState().auth.email, getState().auth.password)
              return fetch(underlyingURL, {
                method: 'GET',
                headers: reqHeaders
              })
                  .then(response => response.json());
            })
          )
            .then(response => {
              const finalResponse = Object.assign({}, items, {
                value: items.value.map((order, index) => ({
                  ...order,
                  underlyingObject: response[index]
                }))
              });
              // console.log(finalResponse)
              dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, items: finalResponse });
            })
        );
        })
            .catch(error => console.log(`error ${error}`));
    };
};

export const dropDownCrop = () => {
  return (dispatch, getState) => {
    const url = `${REST_API_URL}api/commodities`;
    //console.log(url);
      doGetFetch(url, getState().auth.email, getState().auth.password)
   /* return fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' +
          base64.encode(getState().auth.email + ':' + getState().auth.password),
        'x-api-key': X_API_KEY
      }
    })*/
      .then(response => response.json())
      .then(dropDownData => {
        //  console.log(dropDownData);
        dispatch({ type: DROP_DOWN_VALUES, payload: dropDownData });
      })
      .catch(error => console.log(`error ${error}`));
  };
};

