import { SUGGESTED_OPTIMAL_QUOTE, OPTIMAL_QUOTE_SPIN_ACTIVE, ESTIMATED_PROFIT_START, ESTIMATED_PROFIT_END } from '../../actions/types';

const INITIAL_STATE = {
    spinFlag: false,
    suggestedQuote: {},
    estProfitStart: '',
    estProfitEnd: ''
};

export default function SugQuote(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPTIMAL_QUOTE_SPIN_ACTIVE:
            return Object.assign({}, state, { spinFlag: action.payload });
        case SUGGESTED_OPTIMAL_QUOTE:
            return Object.assign({}, state, { suggestedQuote: action.payload });
        case ESTIMATED_PROFIT_START:
            return Object.assign({}, state, { estProfitStart: action.payload });
        case ESTIMATED_PROFIT_END:
            return Object.assign({}, state, { estProfitEnd: action.payload });
        default:
            return state;
    }
};

