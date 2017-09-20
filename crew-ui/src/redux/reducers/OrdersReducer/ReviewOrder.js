import { ORDERS_REVIEW_QUOTE, ORDERS_NEW_ORDER } from '../../actions/types';

const INITIAL_STATE = {
    quoteData: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDERS_REVIEW_QUOTE:
            return Object.assign({}, state, { quoteData: action.payload });
        case ORDERS_NEW_ORDER:
            return Object.assign({}, state, { orderData: action.payload });
        default:
            return state;
    }
};