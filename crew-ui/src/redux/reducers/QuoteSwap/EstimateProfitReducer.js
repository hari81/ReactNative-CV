import { ESTIMATED_PROFIT_START_S, ESTIMATED_PROFIT_END_S, ESTIMATED_PROFIT_START_C, ESTIMATED_PROFIT_END_C } from '../../actions/types';

const INITIAL_STATE = {
    estProfitStart_S: '',
    estProfitEnd_S: '',
    estProfitStart_C: '',
    estProfitEnd_C: ''
};

export default function SugQuote(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ESTIMATED_PROFIT_START_S:
            return Object.assign({}, state, { estProfitStart_S: action.payload });
        case ESTIMATED_PROFIT_END_S:
            return Object.assign({}, state, { estProfitEnd_S: action.payload });
        case ESTIMATED_PROFIT_START_C:
            return Object.assign({}, state, { estProfitStart_C: action.payload });
        case ESTIMATED_PROFIT_END_C:
            return Object.assign({}, state, { estProfitEnd_C: action.payload });
        default:
            return state;
    }
};