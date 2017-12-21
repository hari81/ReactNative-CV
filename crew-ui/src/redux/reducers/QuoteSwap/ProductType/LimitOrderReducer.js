import { ORDER_LIMIT_PRICE, ORDER_EXPIRE_DATE } from '../../../actions/types';

const INITIAL_STATE = {
    limitPrice: '',
    orderExpire: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ORDER_LIMIT_PRICE:
            return Object.assign({}, state, { limitPrice: action.payload });
        case ORDER_EXPIRE_DATE:
            return Object.assign({}, state, { orderExpire: action.payload });
        default:
            return state;
    }
}