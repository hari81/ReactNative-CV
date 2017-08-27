/* jshint esversion: 6*/
'use strict';

import base64 from 'base-64';
import { FETCHING_ORDERS_ACTIVITY, ALL_BUTTONS } from '../types';
import { REST_API_URL } from '../../../ServiceURLS/index';
import ButtonsData from '../../../restAPI/AllButtonsData.json';

export const allButtons = () => {

    return (dispatch, getState) => {
       // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = REST_API_URL + '';
        /* return fetch(url, {
             method: 'GET',
             headers: {
                 'Authorization': 'Base ' + base64.encode(getState().email + ':' + getState().password),
                 'x-pai-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
             }
         })
             .then(response => response.json())

             .then(cropValues => {
                 //console.log(`cropValues: ${cropValues}`);
                 if (!Array.isArray(cropValues)) {
                     return Promise.resolve([]);
                 }
                 //cropValues = farmCorn2017;*/
        // console.log(farmCorn2017);
        dispatch({ type: ALL_BUTTONS, payload: ButtonsData });
       /*  })
         .catch(error => console.log('error ' + error));*/
    };
};
