export const OpenPositionsData = () =>{
    return (dispatch) => {
        const base64 = require('base-64');
        const url = 'https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/positions?state=open&commodity=S'
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
            .then((opens) => {
                return Promise.all(opens.map((items) => {
                        //console.log(items)
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
                            .then(response => {
                                const openPositions = Object.assign({}, items, {
                                    lines: items.lines.map((order, index) => ({
                                        ...order,
                                        underlying: response[index],
                                        status: items.status,
                                        id: items.id,
                                        riskProduct: items.riskProduct,
                                        confirm: items.confirm
                                    }))

                                })
                                //console.log(openPositions)
                                dispatch(openPositionsDataSuccess(openPositions))
                            })

                    }
                ))
            })
    .catch((error) => console.log(error));
    };
}
export function openPositionsDataSuccess(openPositions) {
    return {
        type: 'OPEN_POSITIONS_DATA_SUCCESS',
        openPositions
    };
}