import { ACCOUNT_INFORMATION } from '../../actions/types';

const INITIAL_STATE = {
    accountDetails: {}

};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case ACCOUNT_INFORMATION:
            return Object.assign({}, state, { accountDetails: action.payload });
        default:
            return state;
    }
};