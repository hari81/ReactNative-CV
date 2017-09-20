import base64 from 'base-64';
import { Actions } from 'react-native-router-flux';
import { ORDERS_REVIEW_QUOTE, ORDERS_NEW_ORDER } from '../types';
import { X_API_KEY, REST_API_URL } from '../../../ServiceURLS/index';

export const getReviewOrderQuote = (orderData) => {
    return (dispatch, getState) => {
        const url = `${REST_API_URL}api/quotes`;
        const b64 = base64.encode(`${getState().auth.email}:${getState().auth.password}`);
        const baseAuthentication = `Basic ${b64}`;

        let data = null;
        if (orderData.orderType === 'market') {
            data = JSON.stringify({
                riskProductId: orderData.riskProductId,
                buySell: orderData.buySell,
                expirationDate: orderData.expirationDate,
                notes: '',
                orderType: orderData.orderType,
                underlying: orderData.underlying,
                quoteType: 'new',
                quantity: orderData.quantity
            });
        } else {
            data = JSON.stringify({
                riskProductId: orderData.riskProductId,
                buySell: orderData.buySell,
                expirationDate: orderData.expirationDate,
                notes: '',
                orderType: orderData.orderType,
                underlying: orderData.underlying,
                quoteType: 'new',
                quantity: orderData.quantity,
                goodTilDate: orderData.goodTilDate,
                targetPrice: orderData.targetPrice
            });        
        }

        return fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': X_API_KEY,
                'Content-Type': 'application/json',
                Authorization: baseAuthentication
            },
            body: data
        })
            .then((response) => response.json())
            .then((quoteData) => {
                console.log('review quote data is: ', quoteData);
                dispatch({ type: ORDERS_REVIEW_QUOTE, payload: quoteData });
                Actions.revieworder();
            })
            .catch((status, error) => {
                console.log('error', error);
            });
    };
};

export const placeOrder = () => {
    return (dispatch, getState) => {
        const url = `${REST_API_URL}api/orders`;
        const b64 = base64.encode(`${getState().auth.email}:${getState().auth.password}`);
        const baseAuthentication = `Basic ${b64}`;
        const oData = getState().reviewQuote.quoteData;

        let data = null;
        if (oData.metadata.orderType.toLowerCase() === 'limit') {
            //limit order
            data = JSON.stringify({
                quoteId: oData.quoteId,
                riskProductId: oData.metadata.riskProductId,
                quoteType: oData.metadata.quoteType,
                quantity: oData.metadata.quantity,
                buySell: oData.metadata.buySell,
                underlying: oData.metadata.underlying,
                notes: oData.metadata.notes,
                orderType: oData.metadata.orderType,
                targetPrice: oData.metadata.targetPrice,
                goodTilDate: oData.metadata.goodTilDate
            });
        } else {
            //market order
            data = JSON.stringify({
                quoteId: oData.quoteId,
                riskProductId: oData.metadata.riskProductId,
                quoteType: oData.metadata.quoteType,
                quantity: oData.metadata.quantity,
                buySell: oData.metadata.buySell,
                underlying: oData.metadata.underlying,
                notes: oData.metadata.notes,
                orderType: oData.metadata.orderType
            });    
        }

        return fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': X_API_KEY,
                'Content-Type': 'application/json',
                Authorization: baseAuthentication
            },
            body: data
        })
            .then(response => { 
                if (response.status === 201) {
                    return response.json();
                }
                //redirect to failure screen
                Actions.tcerror();                
            })
            .then((orderData) => {
                console.log('order data is: ', orderData);
                //redirect to success screen here
                Actions.tcorderreceipt();                                    
                //dispatch({ type: ORDERS_NEW_ORDER, payload: orderData });
            })
            .catch((status, error) => {
                console.log('error', error);
                dispatch({ type: ORDERS_NEW_ORDER, payload: data });
                //redirect to order failure screen
                Actions.tcerror();
            });
    };
};
