import { ACCOUNT_INFORMATION, DEFAULT_ACCOUNT_DETAILS, INVALID_ACCOUNT, ACCOUNT_INFO_LIMITS } from '../../actions/types';

const INITIAL_STATE = {
    accountDetails: {},
    defaultAccount: '',
    invalidAccount: true,
    limits: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ACCOUNT_INFORMATION:
            return Object.assign({}, state, { accountDetails: action.payload });
        case DEFAULT_ACCOUNT_DETAILS:
            return Object.assign({}, state, { defaultAccount: action.payload });
        case INVALID_ACCOUNT:
            return Object.assign({}, state, { invalidAccount: action.payload });
        case ACCOUNT_INFO_LIMITS:
            return Object.assign({}, state, { limits: action.payload });
        default:
            return state;
    }
}
