/*jshint esversion: 6 */
"use strict";
export const dashboardOpenPositionsCount = () => {
  return (dispatch, getState) => {
    const base64 = require("base-64");

    const url =
      "https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/positions/totals/2016/C";
    fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " +
          base64.encode(getState().auth.email + ":" + getState().auth.password),
        "x-api-key": "rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb"
      }
    })
      .then(response => response.json())
      .then(openPositionsCount => {
        dispatch(dashboardOpenOrders(openPositionsCount));
      });
  };
};
export function dashboardOpenOrders(openPositionsCount) {
  //console.log(openPositionsCount)
  return {
    type: "DASHBOARD_OPEN_POSITIONS_COUNT",
    openPositionsCount
  };
}
