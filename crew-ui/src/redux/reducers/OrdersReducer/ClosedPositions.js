/*jshint esversion: 6 */
'use strict';

import { CLOSED_POSITIONS_DATA_SUCCESS } from '../../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case CLOSED_POSITIONS_DATA_SUCCESS:
      return action.closedPositions;
    default:
      return state;
  }
};
