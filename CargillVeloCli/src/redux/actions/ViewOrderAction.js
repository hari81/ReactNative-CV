import base64 from 'base-64';
import { RESTAPI } from "../../ServiceURLS/service";

import { FETCHING_ORDERS_ACTIVITY, DROP_DOWN_VALUES } from './types';

export function itemsFetchDataSuccess(items) {

    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}
export const itemsFetchData = () => {
    return (dispatch) => {
        dispatch( {type: FETCHING_ORDERS_ACTIVITY} )
       // const base64 = require('base-64');

        const url = 'https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/orders';
        const username = 'BernM@commodityhedging.com';
        const password = 'test1234';


        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        headers.append('x-api-key','rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
        return fetch(url, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then((items) => {

                return Promise.all(items.value.map((item)=>{
                   // const base64 = require('base-64');

                    const username = 'BernM@commodityhedging.com';
                    const password = 'test1234';

                    const headers = new Headers();
                    headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
                    headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
                    return fetch('https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/underlyings/'+item.underlying, {
                        method: 'GET',
                        headers
                    })
                        .then(response => response.json())


                }))
                //.then(response => response.json())
                    .then(response => {
                        const finalResponse =  Object.assign({}, items, {
                            value: items.value.map((order, index) => ({
                                ...order,
                                underlyingObject: response[index]
                            }))
                        })
                       // console.log(finalResponse)
                        dispatch(itemsFetchDataSuccess(finalResponse))

                    })

            })
    }
}

             /*   console.log(items);
                dispatch(itemsFetchDataSuccess(items))

        })
            .catch((error) => console.log("error are"  +error ));

    };
};*/

/*export const fetchUnderlying = (underlyingcode) => {

    return (dispatch) => {
        const base64 = require('base-64');

        const url = 'https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/underlyings/' + underlyingcode;
        const username = 'BernM@commodityhedging.com';
        const password = 'test1234';
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb');
        fetch(url, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then((values) => {
            console.log(values);
                dispatch( {type: FETCH_UNDERLYING, payload: values});
            })
            .catch((error) => console.log("error are" + error));
    };

};*/

export const dropDownCrop = (email, password) => {
    return(dispatch) => {
        const url = RESTAPI+'api/commodities';
        console.log(url);
        return fetch(url, {
            method: 'GET',
            headers: {
            'Authorization': 'Basic ' + base64.encode(email + ":" + password),
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
                }
        })
            .then(response => response.json())
            .then(dropDownData => {
                    console.log(dropDownData);
                    dispatch({type: DROP_DOWN_VALUES, payload: dropDownData})
                })
            .catch(error => console.log('error are' + error));

    }

};
