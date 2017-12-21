import { SELECT_CONTRACT_MONTH, BUSHEL_QUANTITY_LIMIT } from '../../../actions/types';
const INITIAL_STATE = {
    contractMonth: '',
    bidPrice: '',
    askPrice: '',
    settlePrice: '',
    lastTradeDate: '',
    underlyingSymbol: '',
    bushelQuantity: {},
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SELECT_CONTRACT_MONTH:
            return Object.assign({}, state, { contractMonth: action.payload });
        case BUSHEL_QUANTITY_LIMIT:
            return Object.assign({}, state, { bushelQuantity: action.payload });
        default:
            return state;
    }
}
