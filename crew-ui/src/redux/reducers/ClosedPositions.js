/*jshint esversion: 6 */
"use strict";
export default (state = "", action) => {
  switch (action.type) {
    case "CLOSED_POSITIONS_DATA_SUCCESS":
      return action.closedPositions;
    default:
      return state;
  }
};
