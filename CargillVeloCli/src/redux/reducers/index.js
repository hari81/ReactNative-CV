import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import vieworders from './ViewOrdersReducer';
import OpenPositions from './OpenPositions';
import ClosedPositions from './ClosedPositions';
import openWorkingOrdersCount from './Dashboard/OpenWorkingOrdersCount';
import openPositionsCounting from './Dashboard/OpenPositionsCount'
import closedUnderlyings from './ClosedUnderlying';

export default combineReducers({
    auth: AuthReducer,
    vieworder: vieworders,
    openPositions: OpenPositions,
    closedPositions: ClosedPositions,
    openWorkingOrders: openWorkingOrdersCount,
    openPositionsCount: openPositionsCounting,
    closedUnderlying: closedUnderlyings

});
