export function itemsFetchDataSuccess(items) {

    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}
export const itemsFetchData = () => {
    return (dispatch) => {
        const base64 = require('base-64');

        const url = 'https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/orders'
        const username = 'BernM@commodityhedging.com';
        const password = 'test1234';

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        headers.append('x-api-key','rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
        fetch(url, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch((error) => console.log(error));

    };
}

