/*jshint esversion: 6 */
"use strict";

import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import vieworders from "./OrdersReducer/ViewOrdersReducer";
import OpenPositions from "./OrdersReducer/OpenPositions";
import ClosedPositions from "./OrdersReducer/ClosedPositions";


export default combineReducers({
  auth: AuthReducer,
  vieworder: vieworders,
  openPositions: OpenPositions,
  closedPositions: ClosedPositions,

});
