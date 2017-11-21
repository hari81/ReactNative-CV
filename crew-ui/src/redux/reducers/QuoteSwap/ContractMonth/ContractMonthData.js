const INITIAL_STATE = {
    spinFlag: false,
    bushelSpinFlag: false,
    contract: '',
    isError: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SPIN_ACTIVE':
            return Object.assign({}, state, { spinFlag: true });
        case 'BUSHEL_SPIN_ACTIVE':
            return Object.assign({}, state, { bushelSpinFlag: true });
        case 'BUSHEL_SPIN_INACTIVE':
            return Object.assign({}, state, { bushelSpinFlag: false });
        case 'CONTRACT_MONTH_DATA':
            return Object.assign({}, state, { contract: action.payload }, { spinFlag: false });
        case 'CONTRACT_ERROR':
            return Object.assign({}, state, { isError: true });
        default:
            return state;
    }
}
