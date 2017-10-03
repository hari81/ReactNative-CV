import { Actions } from 'react-native-router-flux';
import { ORDERS_REVIEW_QUOTE } from '../types';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';

export const getReviewOrderQuote = (orderData) => {
    return (dispatch, getState) => {
        const url = `${ORDER_SERVICES_URL}quotes`;
        let data = null;
        if (orderData.quoteType.toLowerCase() === 'rpx') {
            data = {
                transId: orderData.transId,
                activityId: orderData.activityId,
                orderType: orderData.orderType,
                quoteType: orderData.quoteType,
                notes: orderData.notes
            };
        } else {
            data = {
                riskProductId: orderData.riskProductId,
                buySell: orderData.buySell,
                expirationDate: orderData.expirationDate,
                notes: '',
                orderType: orderData.orderType,
                underlying: orderData.underlying,
                quoteType: orderData.quoteType === undefined ? 'new' : orderData.quoteType,
                quantity: orderData.quantity
            };
            //add limit quote fields only for non-reprice quotes
            if (orderData.orderType.toLowerCase() === 'limit') {
                data.goodTilDate = common.formatDate(orderData.goodTilDate, 6);
                data.targetPrice = orderData.targetPrice;
            }
        }

        return doPostFetch(url, data, getState().auth.email, getState().auth.password)
            .then(response => { 
                if (response.status === 200) {
                    return response.json();
                }
                return null;
            })
            .then(quoteData => {
                console.log('review quote data is: ', quoteData);
                //reprice needs some of the initial data for display on the review screen
                if (quoteData.metadata.quoteType.toLowerCase() === 'rpx') {
                    quoteData.metadata.buySell = orderData.buySell;
                    quoteData.metadata.riskProductId = orderData.riskProductId;
                    quoteData.metadata.underlying = orderData.underlying;
                    quoteData.metadata.quantity = orderData.quantity;
                    quoteData.metadata.expirationDate = quoteData.quoteExpiration;
                    if (quoteData.metadata.orderType.toLowerCase() === 'limit') {
                        quoteData.metadata.targetPrice = orderData.targetPrice;
                        quoteData.metadata.goodTilDate = orderData.goodTilDate;
                    }
                }
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
        const url = `${ORDER_SERVICES_URL}orders`;
        const oData = getState().reviewQuote.quoteData;
        let data = null;
        if (oData.metadata.quoteType.toLowerCase() === 'rpx') {
            data = {
                quoteId: oData.quoteId,
                transId: oData.metadata.transId,
                activityId: oData.metadata.activityId,
                orderType: oData.metadata.orderType,
                quoteType: oData.metadata.quoteType,
                notes: oData.notes
            };
        } else {
            data = {
                quoteId: oData.quoteId,
                riskProductId: oData.metadata.riskProductId,
                quoteType: oData.metadata.quoteType,
                quantity: oData.metadata.quantity,
                buySell: oData.metadata.buySell,
                underlying: oData.metadata.underlying,
                notes: oData.metadata.notes,
                orderType: oData.metadata.orderType
            };
        }
        //extra fields for limit orders
        if (oData.metadata.orderType.toLowerCase() === 'limit') {
            data.targetPrice = oData.metadata.targetPrice;
        }

        return doPostFetch(url, data, getState().auth.email, getState().auth.password)
            .then(response => { 
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                }
                //redirect to failure screen
                Actions.tcerror();                
            })
            .then((orderData) => {
         //       console.log('order data is: ', orderData);
         //       console.log('OrderId', orderData.id);
        //        console.log('Order Status', orderData.status);
                switch (orderData.status) {
                    case '201':
                    case 201:
                        Actions.tcorderreceipt({ orderId: orderData.id, message: orderData.statusMessage }); break;
                    case '500':
                    case 500:
                        Actions.tcerror({ message: orderData.statusMessage }); break;
                    case '400':
                    case 400:
                        Actions.tcerror({ message: orderData.statusMessage }); break;
                    default:
                        Actions.tcerror({ message: orderData.statusMessage }); break;
                }
            })
            .catch((status, error) => {
                console.log('error', error);
                //redirect to order failure screen
                Actions.tcerror();
            });
    };
};
