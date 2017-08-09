/*jshint esversion: 6 */
"use strict";
import base64 from "base-64";

export const OpenPositionsData = () => {
  return (dispatch, getState) => {
    //console.log(getState().auth)

    return fetch(
      "https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/positions?state=open&commodity=C",
      {
        method: "GET",
        headers: {
          Authorization:
            "Basic " +
            base64.encode(
              getState().auth.email + ":" + getState().auth.password
            ),
          "x-api-key": "rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb"
        }
      }
    )
      .then(response => response.json())
      .then(opens => {
        //console.log(opens)
        //dispatch(openPositionsDataSuccess(openPositions))
        return Promise.all(
          opens.map(items => {
            //console.log(items.lines[0].underlying)
            return fetch(
              "https://a7gp732c12.execute-api.us-east-1.amazonaws.com/qa/extracense/api/underlyings/" +
                items.lines[0].underlying,
              {
                method: "GET",
                headers: {
                  Authorization:
                    "Basic " +
                    base64.encode(
                      getState().auth.email + ":" + getState().auth.password
                    ),
                  "x-api-key": "rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb"
                }
              }
            ).then(response => response.json());
          })
        )
          .then(res => {
            return opens.map((item, index) => {
              return Object.assign({}, item, {
                underlyingObjectData: res[index]
              });
            });
          })
          .then(openPositions =>
            dispatch(openPositionsDataSuccess(openPositions))
          );
      })
      .catch(error => console.log(error));
  };
};
export function openPositionsDataSuccess(openPositions) {
  console.log(openPositions);
  return {
    type: "OPEN_POSITIONS_DATA_SUCCESS",
    openPositions
  };
}
