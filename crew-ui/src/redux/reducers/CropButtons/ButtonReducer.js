import { ALL_BUTTONS, SELECT_ID, BUTTONS_SPINNER, SELECTED_CROP_NAME } from '../../actions/types';

const INITIAL_STATE = {
    cropButtons: [],
    selectedId: '',
    buttonActive: true,
    selectedCropName: ''
};

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case ALL_BUTTONS:
            return Object.assign({}, state, { cropButtons: action.payload });
        case SELECT_ID:
            return Object.assign({}, state, { selectedId: action.payload });
        case SELECTED_CROP_NAME:
            return Object.assign({}, state, { selectedCropName: action.payload });
        case BUTTONS_SPINNER:
            return Object.assign({}, state, { buttonActive: false });
        default:
            return state;
    }
};
