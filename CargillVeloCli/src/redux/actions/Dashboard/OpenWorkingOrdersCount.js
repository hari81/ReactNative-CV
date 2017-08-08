/*jshint esversion: 6 */
'use strict';
export const dashboardOpenWorkingOrdersCount = () =>{
    return (dispatch, getState) => {
        const base64 = require('base-64');

        const url = 'https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/orders/totals/2016/C';
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization:
                'Basic ' + base64.encode(getState().auth.email + ':' + getState().auth.password),
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
            }
        })
            .then(response => response.json())
            .then((openWorkingOrders) => {
                dispatch(dashboardOpenOrders(openWorkingOrders));
            });
    };
}
export function dashboardOpenOrders(openWorkingOrders) {
    //console.log(openWorkingOrders)
    return {
        type: 'DASHBOARD_OPEN_WORKING_ORDERS_COUNT',
        openWorkingOrders
    };
}