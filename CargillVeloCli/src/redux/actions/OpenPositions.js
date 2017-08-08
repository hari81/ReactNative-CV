/*jshint esversion: 6 */
'use strict';
import base64 from 'base-64';

export const OpenPositionsData = () =>{
    return (dispatch, getState) => {
        //console.log(getState().auth)
        return fetch('https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/positions?state=open&commodity=C', {
            method: 'GET',
            headers:{
                Authorization:'Basic ' + base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
            }
        })
            .then(response => response.json())
            .then((opens) => {
                return Promise.all(opens.map((items) => {
                        return Promise.all(items.lines.map((itemss) => {
                            return fetch('https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/underlyings/' + itemss.underlying, {
                                method: 'GET',
                                headers:{
                                    Authorization:'Basic ' + base64.encode(getState().auth.email + ':' + getState().auth.password),
                                    'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
                                }
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