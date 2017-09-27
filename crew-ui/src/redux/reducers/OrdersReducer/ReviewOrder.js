import { ORDERS_REVIEW_QUOTE } from '../../actions/types';

const INITIAL_STATE = {
    quoteData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDERS_REVIEW_QUOTE:
            return Object.assign({}, state, { quoteData: action.payload });
        default:
            return state;
    }
};