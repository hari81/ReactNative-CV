import { CLOSED_POSITIONS_DATA_SUCCESS } from '../../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case CLOSED_POSITIONS_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
