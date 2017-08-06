import base64 from 'base-64';

export function itemsFetchDataSuccess(finalResponse) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        finalResponse
    };
}

export const ViewOrdersData = () => {
    return (dispatch, getState) => {
        return fetch('https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/orders', {
            method: 'GET',
            headers:{
                Authorization: 'Basic ' + base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
            }
        })
            .then(response => response.json())
            .then((items) => {
                return Promise.all(items.value.map((item)=>{
                    return fetch('https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/underlyings/'+item.underlying, {
                        method: 'GET',
                        headers:{
                            Authorization: 'Basic ' + base64.encode(getState().auth.email + ':' + getState().auth.password),
                            'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
                        }
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







