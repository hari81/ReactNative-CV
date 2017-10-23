import {
    OPEN_POSITIONS_DATA_SUCCESS, TRADE_RECEIPT_PDFVIEW
} from '../../actions/types';

const INITIAL_STATE = {
    openPstns: [],
    receipt: ''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case OPEN_POSITIONS_DATA_SUCCESS:
      return Object.assign({}, state, { openPstns: action.openPositions });
     case TRADE_RECEIPT_PDFVIEW:
          return Object.assign({}, state, { receipt: action.pdfPath });
    default:
      return state;
  }
};
