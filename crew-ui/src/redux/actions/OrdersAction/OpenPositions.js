import { Actions } from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob';
import { ORDER_SERVICES_URL, POSITONS_TRADE_RECEIPT_URL, X_API_KEY } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, OPEN_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import bugsnag from '../../../components/common/BugSnag';

export const OpenPositionsData = (crop) => {
  return (dispatch, getState) => {
      dispatch({ type: FETCHING_ORDERS_ACTIVITY });
      const user = getState().account.accountDetails;
      bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
      const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=open,pendingUnwind&sort=product.contractMonth.month,product.contractMonth.year`;
          return doGetFetch(url, getState().auth.basicToken)
          .then(response => response.json())
          .then(opens => {
              if (!Array.isArray(opens)) {
                  dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions:[] });
               }
              return Promise.all(
                  opens.map(items => {
                     const underlyingURL = `${ORDER_SERVICES_URL}underlyings/${items.lines[0].underlying}`;
                     return doGetFetch(underlyingURL, getState().auth.basicToken)
                     .then(response => { /*console.log(response);*/ return response.json(); });
                  })
              )
                  .then(res => {
                      return opens.map((item, index) => {
                          return Object.assign({}, item, {
                              underlyingObjectData: res[index]
                          });
                      });
                  })
                  .then(openPositions =>
                      dispatch({ type: OPEN_POSITIONS_DATA_SUCCESS, openPositions }));
          })
          .catch(/*error => {
              console.error(`error ${error}`);
          }*/ bugsnag.notify);
  };
};

export const tradeReceipt = (relativePath) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
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
               // console.log('The file saved to ', res.path());
                // console.log('The pdf save', res.base64())
                Actions.pdfview({ path: res.path() });
            })
            .catch(bugsnag.notify);
    };
};

