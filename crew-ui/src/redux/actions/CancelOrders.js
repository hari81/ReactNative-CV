import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ORDER_SERVICES_URL } from '../../ServiceURLS';
import { doDeleteFetch } from '../../Utils/FetchApiCalls';
import bugsnag from '../.././components/common/BugSnag';

export const orderReceipt = (orderid, selectedCrop) => {
    return (dispatch, getState) => {
        const user = getState().account.accountDetails;
        bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
        const url = `${ORDER_SERVICES_URL}orders/${orderid}`;
        return doDeleteFetch(url, getState().auth.basicToken)
            .then(response => {
                if (response.status === 202) {
                   // console.log(response);
                    //Actions.cancelorderreceipt({ orderid });
                } else {
                    if (response.status === 404) {
                        //dispatch({ type: SERVER_NORESPONSE });
                        Alert.alert('Order cannot be canceled as it is cant found.');
                        //console.log('Response failed');
                    }
                    if (response.status === 410) {
                        //dispatch({ type: SERVER_NORESPONSE });
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
                return response.json();
            })
            .then(cancelResponse => {
                //console.log(cancelResponse);
                if (cancelResponse.statusCode === 200 || cancelResponse.statusCode === 202 || cancelResponse.statusCode === 404) {
                    Actions.cancelorderreceipt({ orderid, message: cancelResponse.message, selectedCrop });
                } else {
                        Alert.alert('Internal Server, Please contact Cargill Hedge desk.');
                }
             })
            .catch(/*(status, error) => console.log(`error ${error}`)*/bugsnag.notify);
    };
};
