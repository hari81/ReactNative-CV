/*jshint esversion: 6 */
'use strict';

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import vieworders from './OrdersReducer/ViewOrdersReducer';
import OpenPositions from './OrdersReducer/OpenPositions';
import ClosedPositions from './OrdersReducer/ClosedPositions';
import allCrops from './Dashboard/DashButtonsReducer';
import myFarmButtons from './MyFarm/CropReducer';
import externalTrades from './External/ExternalTrades';
import infoButtons from './Dashboard/infobuttonsReducer'
export default combineReducers({
    auth: AuthReducer,
    vieworder: vieworders,
    openPositions: OpenPositions,
    closedPositions: ClosedPositions,
    dashBoardButtons: allCrops,
    myFar: myFarmButtons,
    external: externalTrades,
    info: infoButtons
});

