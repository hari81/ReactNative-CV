import { SUGGESTED_OPTIMAL_QUOTE, OPTIMAL_QUOTE_SPIN_ACTIVE } from '../../actions/types';

const INITIAL_STATE = {
    spinFlag: false,
    suggestedQuote: {}
};

export default function SugQuote(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPTIMAL_QUOTE_SPIN_ACTIVE:
            return Object.assign({}, state, { spinFlag: action.payload });
        case SUGGESTED_OPTIMAL_QUOTE:
            return Object.assign({}, state, { suggestedQuote: action.payload, spinFlag: false });
        default:
            return state;
    }
};

