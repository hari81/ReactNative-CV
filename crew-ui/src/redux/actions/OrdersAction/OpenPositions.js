import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import { ORDER_SERVICES_URL, POSITONS_TRADE_RECEIPT_URL, X_API_KEY } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch, doGetTradeReceiptFetch } from '../../../Utils/FetchApiCalls';
import * as common from '../../../Utils/common';

export const OpenPositionsData = (crop) => {
    return (dispatch, getState) => {
        dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const oCrop = getState().account.defaultAccount.commodities.find(x => x.commodity === crop);
        const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year`;
        return doGetFetch(url, getState().auth.email, getState().auth.password)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                common.createAlertErrorMessage(response, 'There was an issue in retrieving the open positions.');
            })
            .then(opens => {
                if (!Array.isArray(opens)) {
                    dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions: [] });
                } else {
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
                }
            })
        .catch(error => {
            common.createAlertErrorMessage(error, 'There was an issue in retrieving the open positions.');
            console.error(`error ${error}`);
        });
    };
};

export const tradeReceipt = (relativePath) => {
    return (dispatch, getState) => {
        const url = `${POSITONS_TRADE_RECEIPT_URL}${relativePath.substr(1, relativePath.length)}`;
console.log('url', url);
        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file.
                fileCache: true,
                appendExt: 'pdf',
                //path: DocumentDir
            })
            .fetch('GET', url, {
                'Content-Type': 'application/json',
                'x-api-key': X_API_KEY,
                'User-Agent': 'Crew 0.1.0',
                Authorization: getState().auth.basicToken,
                Accept: 'application/pdf',
                'Cache-Control': 'no-store'
            })
            .then((res) => {
                // the temp file path
                //this.setState({fileLocation: res.path()});
                console.log('The file saved to ', res.path());
                // console.log('The pdf save', res.base64())
                Actions.pdfview({ path: res.path() });
            });
    };
};

