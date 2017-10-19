import { Alert } from 'react-native';
import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch, doGetTradeReceiptFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';

export const OpenPositionsData = (crop) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const oCrop = getState().account.defaultAccount.commodities.find(x => x.commodity === crop);
        const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year`;
        return doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => response.json())
            .then(opens => {
                if (!Array.isArray(opens)) {
                    dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions: [] });
                }
                return Promise.all(              
                    opens.map((item) => {
                        const oUnderlying = common.createUnderlyingObject(item.lines[0].underlying);                   
                        const uod = {
                            //year needs to be a int value instead of a string for later compares/equality tests
                            year: common.convertStringToInt(oUnderlying.underlyingYear),
                            crop: oCrop.name,
                            cropCode: oCrop.commodity,
                            month: oUnderlying.underlyingMonthDesc,
                            unit: oCrop.unitOfMeasure
                        };
                        return Object.assign({}, item, { underlyingObjectData: uod });
                    })
                )
                .then(openPositions => 
                    dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions })
                );
          })
          .catch(error => {
              console.error(`error ${error}`);
          });
  };
};

export const tradeReceipt = (relativePath) => {
    return (dispatch, getState) => {
        const url = `${ORDER_SERVICES_URL}${relativePath.substr(1, relativePath.length)}`;
        return doGetTradeReceiptFetch(url, getState().auth.email, getState().auth.password)
            .then(response => {
                if (!response.ok) {
                    Alert.alert('Trade Report Not ready.');
                }
            })
            .catch(error => {
                console.error(`error ${error}`);
            });
    };
};

