import { MATRIX_SPINNER, MATRIX_DATA } from '.././actions/types';

const INITIAL_STATE = {
    matrixSpinner: false,
    Data: ''
};
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case MATRIX_SPINNER:
            return Object.assign({}, state, { matrixSpinner: true });
        case MATRIX_DATA:
            return Object.assign({}, state, { Data: action.payload }, { matrixSpinner: false });
        default:
            return state;
    }
}