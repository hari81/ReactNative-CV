const INITIAL_STATE = {
    spinFlag: false,
    subSpinFlag: false,
    contract: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SPIN_ACTIVE':
            return Object.assign({}, state, { spinFlag: true });
        case 'SUBSPIN_ACTIVE':
            return Object.assign({}, state, { spinFlag: true });
        case 'SUBSPIN_INACTIVE':
        return Object.assign({}, state, { spinFlag: false });
        case 'CONTRACT_MONTH_DATA':
            return Object.assign({}, state, { contract: action.payload }, { spinFlag: false });
        default:
            return state;
    }
}
