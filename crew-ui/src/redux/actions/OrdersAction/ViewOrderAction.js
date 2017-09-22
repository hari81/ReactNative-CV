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
    const url = `${REST_API_URL}orders?commodity=${crop}&sort=underlyingMonth,underlyingYear`;
    console.log(url)
   return doGetFetch(url, getState().auth.email, getState().auth.password)
      .then(response => response.json())
      .then(items => {
        return (
          Promise.all(
            items.value.map(item => {
                const underlyingURL = `${REST_API_URL}underlyings/${item.underlying}`;
              return doGetFetch(underlyingURL, getState().auth.email, getState().auth.password)
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
             dispatch({ type: ITEMS_FETCH_DATA_SUCCESS, items: finalResponse });
            })
        );
        })
            .catch(error => console.log(`error ${error}`));
    };
};

export const dropDownCrop = () => {
  return (dispatch, getState) => {
    const url = `${REST_API_URL}commodities`;
    return doGetFetch(url, getState().auth.email, getState().auth.password)
        .then(response => response.json())
      .then(dropDownData => {
        //  console.log(dropDownData);
        dispatch({ type: DROP_DOWN_VALUES, payload: dropDownData });
      })
      .catch(error => console.log(`error ${error}`));
  };
};

