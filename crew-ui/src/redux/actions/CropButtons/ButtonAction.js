import { SELECT_ID } from '../types';

export const selectId = (id) => {
    return {
        type: SELECT_ID,
        payload: id
    };
};
export const selectedCropName = (name) => {
    return {
        type: 'SELECTED_CROP_NAME',
        payload: name
    };
};
