export default (state = '', action) => {
    switch (action.type) {
        case 'CLOSED_POSITIONS_DATA_SUCCESS_UNDERLYING':
            return action.closedUnderlying;
        default :
            return state;
    }
};
