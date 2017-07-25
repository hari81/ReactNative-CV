import { CANCEL_BUTTON_PRESSED } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case CANCEL_BUTTON_PRESSED:
            return action.payload;
        default:
            return state;
    }
}