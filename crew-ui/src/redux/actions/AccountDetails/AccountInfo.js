import base64 from 'base-64';
import { ACCOUNT_INFORMATION , ALL_BUTTONS } from '../types';
import { QA_ACCOUNT_EXTERNALTRADES_FARMDATA, X_API_KEY} from '../../../ServiceURLS/index';


//import mockAccountData from '../../../restAPI/get_account.json';


export const accountDetails = () => {
    return (dispatch, getState) => {
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = QA_ACCOUNT_EXTERNALTRADES_FARMDATA + 'accounts';
        console.log(url);
        console.log(getState().auth.email, getState().auth.password);
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization:
                'Basic ' +
                base64.encode(getState().auth.email + ':' + getState().auth.password),
                "x-api-key": X_API_KEY,

            }
        })
             .then(response => {console.log(response);return response.json() })

             .then(AccountData => {
                 console.log('AccountData:', AccountData);

                dispatch({ type: ACCOUNT_INFORMATION, payload: AccountData });
                const accountNo = AccountData.defaultAccountId;
                 const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}accounts/${accountNo}/crops`;
                 console.log(url);
                 return fetch(url, {
                     method: 'GET',
                     headers: {
                         Authorization:
                         'Basic ' +
                         base64.encode(getState().auth.email + ':' + getState().auth.password),
                         "x-api-key": X_API_KEY,

                     }
                 })
                     .then(response => {console.log(response);return response.json() })

                    .then(Data => {
                         console.log('ButtonsData:', Data);

                        const ButtonsData = [];
                        const commodities = Data.commodities;
                        // console.log('length', commodities.length);
                        // const firstCropYears =  commodities.crops;
                        let k = 0;
                        for (let i = 0; i < commodities.length; i++) {
                            const crops = commodities[i].crops;
                            for (let j = 0; j < crops.length; j++) {
                                ButtonsData[k] = Object.assign({},
                                    { id: commodities[i].commodity + crops[j].cropYear, cropYear: crops[j].cropYear, code: commodities[i].commodity, name: commodities[i].name });
                                k++;
                            }
                        }
                        ButtonsData.sort((a, b) => { return a.cropYear - b.cropYear });
                        dispatch({ type: ALL_BUTTONS, payload: ButtonsData });

                        //dispatch({type: ALL_BUTTONS, payload: ButtonsData});
                     })
                     .catch(error => console.log('error ' + error));

                     })
            .catch(error => console.log('error ' + error));
    };
};