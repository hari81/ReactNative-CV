export function itemsFetchDataSuccess(finalResponse) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        finalResponse
    };
}

export const ViewOrdersData = () => {
    return (dispatch, getState) => {
        const base64 = require('base-64');

        const url = 'https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/orders'
        //const username = 'BernM@commodityhedging.com';
        //const password = 'test1234';

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(getState().auth.email + ':' + getState().auth.password));
        headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
        return fetch(url, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then((items) => {
            //console.log(items);
                return Promise.all(items.value.map((item)=>{
                    const base64 = require('base-64');
                    //const username = 'BernM@commodityhedging.com';
                    //const password = 'test1234';

                    const headers = new Headers();
                    headers.append('Authorization', 'Basic ' + base64.encode(getState().auth.email + ':' + getState().auth.password));
                    headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
                    return fetch('https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/underlyings/'+item.underlying, {
                        method: 'GET',
                        headers
                    })
                        .then(response => response.json());
                }))
                    .then(response => {
                        const finalResponse = Object.assign({}, items, {
                            value: items.value.map((order, index) => ({
                                ...order,
                                underlyingObject: response[index]
                            }))

                        })

                      //  console.log(finalResponse)
                        dispatch(itemsFetchDataSuccess(finalResponse))

                    })

            })
    }
}







