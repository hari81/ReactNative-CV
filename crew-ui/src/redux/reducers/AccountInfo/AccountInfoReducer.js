import { ACCOUNT_INFORMATION, DEFAULT_ACCOUNT_DETAILS } from '../../actions/types';

const INITIAL_STATE = {
    accountDetails: {},
    defaultAccount: ''
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case ACCOUNT_INFORMATION:
            return Object.assign({}, state, { accountDetails: action.payload });
        case DEFAULT_ACCOUNT_DETAILS:
            return Object.assign({}, state, { defaultAccount: action.payload });
        default:
            return state;
    }
};