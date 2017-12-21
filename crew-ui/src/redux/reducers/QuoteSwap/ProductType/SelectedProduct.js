import { SELECT_PRODUCT_NAME, SELECT_PRODUCT_ID } from '../../../actions/types';

const INITIAL_STATE = {
    productName: '',
    productId: '',
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SELECT_PRODUCT_NAME:
            return Object.assign({}, state, { productName: action.payload });
        case SELECT_PRODUCT_ID:
            return Object.assign({}, state, { productId: action.payload });
        default:
            return state;
    }
}
