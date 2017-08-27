/*jshint esversion: 6 */
'use strict';


import base64 from 'base-64';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { REST_API_URL } from '../../ServiceURLS';

export const orderReceipt = orderid => {
    return (dispatch, getState) => {
        const url = `${REST_API_URL}api/orders/${orderid}`;


        return fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb',
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password)
            }
        })
            .then(response => {
                // debugger;
                // console.log(response);
                if (response.ok) {
                    console.log(response);

                    Actions.cancelorderreceipt({ orderid: orderid });
                    //return response.json();
                    //.then(responseJson => {
                    //  console.log(responseJson);
                    /*     switch (response.status) {
                             case 200:
                             Actions.cancelorderreceipt({orderid: orderid});
                             break;
                             case 404 || 410:
                             console.log('Order cannot be canceled as it is already completed');
                             Alert.alert('Orders Can't be deleted');
                             break;
                             //Actions.cancelorderreceipt({orderid: orderid});
                             //dispatch({type: ORDER_NOTDELETED});
                             case 500:
                                 console.log('Bad request');
                                // dispatch({type: INTERNAL_SERVER})
                                 Alert.alert('Internal Server, Please contact Cargill desk');
                                 break;
                             default:
                                 console.log('None of the case');

                         }*/
                    // })
                } else {
                    console.log(response.status);
                    if(response.status === 404 ) {
                        //dispatch({ type: SERVER_NORESPONSE });
                        Alert.alert('Order cannot be canceled as it is cant found.');
                        console.log('Response failed');
                    }
                    if(response.status === 410 ) {
                        //dispatch({ type: SERVER_NORESPONSE });
                        Alert.alert('Order cannot be canceled as it is cant found.');
                        console.log('Response failed');
                    }
                    if(response.status === 500 ) {
                        Alert.alert('Internal Server, Please contact Cargill Hedge desk.');
                    }
                }
            })
            .catch((status, error) => console.log(error));
    };
};