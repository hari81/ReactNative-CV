import { SHOW_INFO_BUTTON_CLICK, HIDE_INFO_BUTTON_CLICK } from '../types';

export const showInfoButtonClick = (num) => {
    return {
        type: SHOW_INFO_BUTTON_CLICK,
        payload: num
    };
};
export const hideInfoButtonClick = () => {
    return {
        type: HIDE_INFO_BUTTON_CLICK
    };
};