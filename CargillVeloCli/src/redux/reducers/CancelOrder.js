import {CANCEL_BUTTON_PRESSED, ORDER_RECEIPT} from '../actions/types';

const INITIAL_STATE = {
    orderId:''
}
//console.log(process.env.REST_URL)
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CANCEL_BUTTON_PRESSED:
            return Object.assign({}, state, action.payload);

        case ORDER_RECEIPT:
            return Object.assign({}, state, {orderId: action.payload});
        default:
            return state;
    }
}
