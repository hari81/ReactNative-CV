/*jshint esversion: 6 */
"use strict";

import base64 from "base-64";
import {REST_API_URL} from "../../../ServiceURLS/index";

export const ClosedPositionsData = (crop) => {
  return (dispatch, getState) => {
    //console.log(getState().auth)
      const url = REST_API_URL + "api/positions?commodity=" + crop + "&state=closed&sort=product.contractMonth.month,product.contractMonth.year";

    return fetch(url,
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
      .then(closed => {

        return Promise.all(
          closed.map(items => {
            //console.log(items.lines[0].underlying);
            return fetch(REST_API_URL+"api/underlyings/" + items.lines[0].underlying,
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
            return closed.map((item, index) => {
              return Object.assign({}, item, {
                underlyingObjectData: res[index]
              });
            });
          })
          .then(closedPositions =>
            dispatch(closedPositionsDataSuccess(closedPositions))
          );
      })
      .catch(error => console.log(error));
  };
};
export function closedPositionsDataSuccess(closedPositions) {
  //console.log(closedPositions);
  return {
    type: "CLOSED_POSITIONS_DATA_SUCCESS",
    closedPositions
  };
}
