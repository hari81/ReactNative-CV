import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ORDERS_REVIEW_QUOTE, ORDERS_REVIEW_SPIN_ACTIVE, ORDERS_REVIEW_SPIN_INACTIVE } from '../types';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { doPostFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';
import bugsnag from '../../../components/common/BugSnag';

export const getReviewOrderQuote = (orderData) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${ORDER_SERVICES_URL}quotes`;
        let data = null;
        if (orderData.quoteType.toLowerCase() === 'rpx') {
            data = {
                transId: orderData.transId,
                expirationDate: common.formatDate(orderData.expirationDate, 6),
                activityId: orderData.activityId,
                orderType: orderData.orderType,
                quoteType: orderData.quoteType,
                notes: orderData.notes
            };
        } else {
            data = {
                riskProductId: orderData.riskProductId,
                buySell: orderData.buySell,
                expirationDate: common.formatDate(orderData.expirationDate, 6),
                notes: '',
                orderType: orderData.orderType,
                underlying: orderData.underlying,
                quoteType: orderData.quoteType === undefined ? 'new' : orderData.quoteType,
                quantity: common.cleanNumericString(orderData.quantity)
            };
            //add limit quote fields only for non-reprice quotes
            if (orderData.orderType.toLowerCase() === 'limit') {
                data.goodTilDate = common.formatDate(orderData.goodTilDate, 6);
                data.targetPrice = parseFloat(orderData.targetPrice);
            }
        }
        

        return doPostFetch(url, data, getState().auth.crmSToken)
            .then(response => { 
                if (response.status === 200) {
                    return response.json();
                }
                if (response.status === 403) {
                    response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                    return;
                }
                Alert.alert('Review Order', 'There was an issue with quoting this order.\n\nPlease check data and try again.');
            })
            .then(quoteData => {
                if (quoteData === undefined) {
                    return;
                }
                if (quoteData === null || quoteData === undefined) {
                    console.log('There was an issue with the quote.');
                } else {
                    console.log('review quote data is: ', quoteData);
                    console.log('Order Data is', orderData);
                    //reprice needs some of the initial data for display on the review screen
                    if (quoteData.metadata.quoteType.toLowerCase() === 'rpx') {
                        quoteData.metadata.buySell = orderData.buySell;
                        quoteData.metadata.riskProductId = orderData.riskProductId;
                        quoteData.metadata.underlying = orderData.underlying;
                        quoteData.metadata.quantity = common.cleanNumericString(orderData.quantity.toString());
                        quoteData.metadata.expirationDate = common.formatDate(quoteData.metadata.expirationDate, 6);
                        if (quoteData.metadata.orderType.toLowerCase() === 'limit') {
                            quoteData.metadata.targetPrice = common.cleanNumericString(orderData.targetPrice.toString());
                            quoteData.metadata.goodTilDate = common.formatDate(orderData.goodTilDate, 6);
                        }
                    }
                    dispatch({ type: ORDERS_REVIEW_QUOTE, payload: quoteData });
                    Actions.revieworder();
                }
            })
            .catch(error => {
                common.handleError(error, 'There was an issue with quoting this order.');
            });
    };
};

export const placeOrder = () => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: ORDERS_REVIEW_SPIN_ACTIVE });
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
                notes: oData.notes,
                expirationDate: common.formatDate(oData.metadata.expirationDate, 6)
            };
        } else {
            data = {
                quoteId: oData.quoteId,
                riskProductId: oData.metadata.riskProductId,
                quoteType: oData.metadata.quoteType,
                quantity: common.cleanNumericString(oData.metadata.quantity),
                buySell: oData.metadata.buySell,
                underlying: oData.metadata.underlying,
                notes: oData.metadata.notes,
                orderType: oData.metadata.orderType,
                expirationDate: common.formatDate(oData.metadata.expirationDate, 6)
            };
        }
        //extra fields for limit orders
        if (oData.metadata.orderType.toLowerCase() === 'limit') {
            data.targetPrice = common.cleanNumericString(oData.metadata.targetPrice.toString());
            data.goodTilDate = common.formatDate(oData.metadata.goodTilDate, 6);
        }
        console.log('placing Data', data);
        return doPostFetch(url, data, getState().auth.crmSToken)
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 201:
                        return response.json();
                    case 403:
                        response.json().then(userFail => { Alert.alert(userFail.message); });
                        return;
                    case 400:
                        Actions.tcerror({ message: response.message }); break;
                    default:
                        Actions.tcerror(); break;
                }
            })
            .then((orderData) => {
                if (common.isValueExists(orderData)) {
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
                } else {
                    Actions.tcerror();
                }
            })
            .catch(error => {
                //don't redirect to order failure screen if no response received
                common.handleError(error);
                dispatch({ type: ORDERS_REVIEW_SPIN_INACTIVE });
            });
    };
};
