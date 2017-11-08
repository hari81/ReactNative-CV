import { ORDERS_REVIEW_QUOTE, ORDERS_REVIEW_SPIN_ACTIVE, ORDERS_REVIEW_SPIN_INACTIVE } from '../../actions/types';

const INITIAL_STATE = {
    quoteData: {},
    spinFlag: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDERS_REVIEW_QUOTE:
            return Object.assign({}, state, { quoteData: action.payload });
        case ORDERS_REVIEW_SPIN_ACTIVE:
            return Object.assign({}, state, { spinFlag: true });
        case ORDERS_REVIEW_SPIN_INACTIVE:
            return Object.assign({}, state, { spinFlag: false });
        default:
            return state;
    }
};
