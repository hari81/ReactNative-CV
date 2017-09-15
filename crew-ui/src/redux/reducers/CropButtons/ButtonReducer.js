import { ALL_BUTTONS, SELECT_ID } from '../../actions/types';

const INITIAL_STATE = {
    cropButtons: [],
    selectedId: 'C2017'
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case ALL_BUTTONS:
            return Object.assign({}, state, { cropButtons: action.payload });
        case SELECT_ID:
            return Object.assign({}, state, { selectedId: action.payload });

        default:
            return state;
    }
};
