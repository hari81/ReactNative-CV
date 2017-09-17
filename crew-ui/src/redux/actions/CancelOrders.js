import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { REST_API_URL } from '../../ServiceURLS';
import { doDeleteFetch } from '../../Utils/FetchApiCalls';

export const orderReceipt = orderid => {
    return (dispatch, getState) => {
        const url = `${REST_API_URL}api/orders/${orderid}`;
        doDeleteFetch(url, getState().auth.email, getState().auth.password)

        /*return fetch(url, {
            method: 'DELETE',
            headers: {
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb',
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password)
            }
        })*/
            .then(response => {
                // debugger;
                // console.log(response);
                if (response.ok) {
                    console.log(response);

                    Actions.cancelorderreceipt({ orderid: orderid });

                } else {
                    console.log(response.status);
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
                    if (response.status === 500) {
                        Alert.alert('Internal Server, Please contact Cargill Hedge desk.');
                    }
                }
            })
            .catch((status, error) => console.log(`error ${error}`));
    };
};
