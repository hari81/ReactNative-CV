/* jshint esversion: 6 */
'use strict';
import base64 from 'base-64';

import { REST_API_URL, X_API_KEY } from '../../../ServiceURLS/index';

import {
  FETCHING_ORDERS_ACTIVITY,
  DROP_DOWN_VALUES,
  ITEMS_FETCH_DATA_SUCCESS
} from '../types';


/*export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}*/
export const ViewOrdersData = (crop) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_ORDERS_ACTIVITY });
    console.log(crop)
    const url = `${REST_API_URL}api/orders?commodity=${crop}&sort=underlyingMonth,underlyingYear`;
    console.log(url)

    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' +
          base64.encode(getState().auth.email + ':' + getState().auth.password),
        'x-api-key': X_API_KEY
      }
    })
      .then(response => response.json())
      .then(items => {
          console.log(items);
        /* if(items.value && items.value.length)
                    {
                        console.log('Undefined');
                    }else{*/
        return (
          Promise.all(
            items.value.map(item => {
              return fetch(`${REST_API_URL}api/underlyings/${item.underlying}`, {
                method: 'GET',
                headers: {
                  Authorization:
                    'Basic ' +
                    base64.encode(
                      getState().auth.email + ':' + getState().auth.password
                    ),
                  'x-api-key': X_API_KEY
                }
              }).then(response => response.json());
            })
          )
            //.then(response => response.json())
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
            .catch((error) =>
                    console.log('error are'  +error ));

    };
};

export const dropDownCrop = () => {
  return (dispatch, getState) => {
    const url = `${REST_API_URL}api/commodities`;
    //console.log(url);
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Basic ' +
          base64.encode(getState().auth.email + ':' + getState().auth.password),
        'x-api-key': X_API_KEY
      }
    })
      .then(response => response.json())
      .then(dropDownData => {
          console.log(dropDownData);
        dispatch({ type: DROP_DOWN_VALUES, payload: dropDownData });
      })
      .catch(error => console.log('error are' + error));
  };
};

