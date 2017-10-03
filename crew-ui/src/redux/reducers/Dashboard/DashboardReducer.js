const INITIAL_STATE = {
    dashBoardSpinner: false,
    Data: ''
}
export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'DASHBOARD_SPINNER':
            return Object.assign({}, state, { dashBoardSpinner: true })
        case 'DASHBOARD_DATA':
            return Object.assign({}, state, { Data: action.payload }, { dashBoardSpinner: false });
        default:
            return state;
    }
}
