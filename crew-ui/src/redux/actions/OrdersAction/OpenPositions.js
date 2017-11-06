import { Alert } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { ORDER_SERVICES_URL, POSITIONS_TRADE_RECEIPT_URL, X_API_KEY } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS, TRADE_RECEIPT_PDFVIEW } from '../types';
import * as common from '../../../Utils/common';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import bugsnag from '../../../components/common/BugSnag';

export const OpenPositionsData = (crop) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const oCrop = getState().account.defaultAccount.commodities.find(x => x.commodity === crop);
        const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                    if (response.status === 403) {
                        response.json().then(userFail => { Alert.alert(userFail.message); });
                        return;
                    }
                common.handleError(response, 'There was an issue in retrieving the open positions.');
            })
            .then(opens => {
                if (!Array.isArray(opens)) {
                    dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions: [] });
                } else {
                  const openPositions = opens.map((item) => {
                            const oUnderlying = common.createUnderlyingObject(item.lines[0].underlying);
                            const cYear = item.lines[0].cropYear;
                            const uod = {
                                //year needs to be a int value instead of a string for later compares/equality tests
                                year: common.convertStringToInt(oUnderlying.underlyingYear),
                                crop: oCrop.name,
                                cropCode: oCrop.commodity,
                                cropYear: cYear,
                                month: oUnderlying.underlyingMonthDesc,
                                unit: oCrop.unitOfMeasure
                            };
                            return Object.assign({}, item, { underlyingObjectData: uod });
                        });
                        dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions });
                }
            })
            .catch(error => {
                common.handleError(error, 'There was an issue in retrieving the open positions.');
                dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions: [] });
            });
    };
};

export const tradeReceipt = (relativePath) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${POSITIONS_TRADE_RECEIPT_URL}${relativePath.substr(1, relativePath.length)}`;
        //console.log('url', url);
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
                Authorization: `CRM ${getState().auth.crmSToken}`,
                Accept: 'application/pdf',
                'Cache-Control': 'no-store'
            })
        //doGetTradeReceiptFetch(url, getState().auth.basicToken)
            .then((res) => {
                //console.log('pdf path', res.path());
                if (res.status === 403) {
                    res.json().then(userFail => { Alert.alert(userFail.message); });
                    return;
                }
                dispatch({ type: TRADE_RECEIPT_PDFVIEW, pdfPath: res.path() });
            })
            .catch(bugsnag.notify);
    };
};

