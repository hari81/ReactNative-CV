/*jshint esversion: 6 */
'use strict';

import {
    OPEN_POSITIONS_DATA_SUCCESS
} from '../../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case OPEN_POSITIONS_DATA_SUCCESS:
      return action.openPositions;
    default:
      return state;
  }
};
