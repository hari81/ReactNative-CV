import { SUGGESTED_OPTIMAL_QUOTE, OPTIMAL_QUOTE_SPIN_ACTIVE, SHOW_BUTTONS, OPTIMAL_QUOTE_BODY, BACK_TO_SUGGESTED_QUOTE } from '../../actions/types';

const INITIAL_STATE = {
    spinFlag: false,
    suggestedQuote: {},
    quoteBody: {},
    custFlag: '',
    custToSugFlag: ''
};

export default function SugQuote(state = INITIAL_STATE, action) {
    switch (action.type) {
        case OPTIMAL_QUOTE_SPIN_ACTIVE:
            return Object.assign({}, state, { spinFlag: action.payload });
        case SUGGESTED_OPTIMAL_QUOTE:
            return Object.assign({}, state, { suggestedQuote: action.payload });
        case SHOW_BUTTONS:
            return Object.assign({}, state, { custFlag: action.payload });
        case OPTIMAL_QUOTE_BODY:
            return Object.assign({}, state, { quoteBody: action.payload });
        case BACK_TO_SUGGESTED_QUOTE:
            return Object.assign({}, state, { custToSugFlag: action.payload });
        default:
            return state;
    }
};

