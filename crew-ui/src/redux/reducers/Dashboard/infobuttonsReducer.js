import {
    SHOW_INFO_BUTTON_CLICK,
    HIDE_INFO_BUTTON_CLICK } from '../../actions/types';
const INITIAL_STATE = {
    infoEnable: false,
    btnNumber: '',
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_INFO_BUTTON_CLICK:
            return Object.assign({}, state, { infoEnable: true }, { btnNumber: action.payload });
        case HIDE_INFO_BUTTON_CLICK:
            return Object.assign({}, state, { infoEnable: false });

        default:
            return state;
    }
}