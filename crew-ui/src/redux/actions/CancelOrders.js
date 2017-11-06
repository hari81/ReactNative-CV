import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ORDER_SERVICES_URL } from '../../ServiceURLS';
import { doDeleteFetch } from '../../Utils/FetchApiCalls';
import * as common from '../../Utils/common';
import bugsnag from '../.././components/common/BugSnag';
import { CLEAR_APPLICATION_STATE } from './types';

export const orderReceipt = (orderid, selectedCrop) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${ORDER_SERVICES_URL}orders/${orderid}`;
        return doDeleteFetch(url, getState().auth.crmSToken)
            .then(response => {
                switch (response.status) {
                    case 404:
                        Alert.alert('Order cannot be canceled as it cannot be found.');
                        break;
                    case 410:
                        Alert.alert('Order cannot be canceled as it cannot be found.');
                        break;
                    case 403:
                        response.json().then(userFail => { Alert.alert(userFail.message); Actions.auth(); dispatch({ type: CLEAR_APPLICATION_STATE });});
                        break;
                    case 500:
                        Alert.alert('Internal Server, Please contact Cargill Hedge desk.');
                        break;
                    default:
                        return response.json();
                }
                /*if (response.status === 202) {
                   // console.log(response);
                    //Actions.cancelorderreceipt({ orderid });
                } else {

                    if (response.status === 404) {
                        Alert.alert('Order cannot be canceled as it is cant found.');
                        //console.log('Response failed');
                    }
                    if (response.status === 410) {
                        Alert.alert('Order cannot be canceled as it is cant found.');
                        //console.log('Response failed');
                    }
                    if (response.status === 403) {
                        Alert.alert('Order cannot be canceled as it is cant found.');
                    }
                    if (response.status === 500) {
                        Alert.alert('Internal Server, Please contact Cargill Hedge desk.');
                    }
                }
                return response.json();*/
            })
            .then(cancelResponse => {
                //console.log(cancelResponse);
                if (cancelResponse === undefined) {
                    return;
                }
                if (cancelResponse.statusCode === 200 || cancelResponse.statusCode === 202 || cancelResponse.statusCode === 404) {
                    Actions.cancelorderreceipt({ orderid, message: cancelResponse.message, selectedCrop });
                } else {
                    Alert.alert('Internal Server, Please contact Cargill Hedge desk.');
                }
             })
            .catch(error => {
                common.handleError(error, 'There was an issue in canceling this order.');
            });
    };
};
