import { SUGGESTED_OPTIMAL_QUOTE, OPTIMAL_QUOTE_SPIN_ACTIVE, SHOW_BUTTONS } from '../../actions/types';

const INITIAL_STATE = {
    spinFlag: false,
    suggestedQuote: {},
    custFlag: ''
};

export default function SugQuote(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPTIMAL_QUOTE_SPIN_ACTIVE:
            return Object.assign({}, state, { spinFlag: action.payload });
        case SUGGESTED_OPTIMAL_QUOTE:
            return Object.assign({}, state, { suggestedQuote: action.payload });
        case SHOW_BUTTONS:
            return Object.assign({}, state, { custFlag: action.payload });
        default:
            return state;
    }
};

