export const ClosedPositionsData = () =>{
    return (dispatch) => {
        const base64 = require('base-64');

        const url = 'https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/positions?state=closed&commodity=C'
        const username = 'BernM@commodityhedging.com';
        const password = 'test1234';

        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
        headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
        fetch(url, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then((closedPositions) => {
            //console.log(closedPositions);

                dispatch(closedPositionsDataSuccess(closedPositions));

            return Promise.all(closedPositions.map((items) => {
                return Promise.all(items.lines.map((itemss) => {
                    const base64 = require('base-64');

                    const username = 'BernM@commodityhedging.com';
                    const password = 'test1234';
                    const headers = new Headers();
                    headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
                    headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
                    return fetch('https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/underlyings/' + itemss.underlying, {
                        method: 'GET',
                        headers
                    })
                        .then(response => response.json());
                }))
                        .then((closedUnderlying) => {
                            dispatch(closedPositionsUnderlying(closedUnderlying))
                        });
            }));
            }
    )
                        .catch((error) => console.log(error));
    }
}
export function closedPositionsDataSuccess(closedPositions) {
    return {
        type: 'CLOSED_POSITIONS_DATA_SUCCESS',
        closedPositions
    };
}
export function closedPositionsUnderlying(closedUnderlying) {
    //console.log(closedUnderlying)
    return {
        type: 'CLOSED_POSITIONS_DATA_SUCCESS_UNDERLYING',
        closedUnderlying
    };
}