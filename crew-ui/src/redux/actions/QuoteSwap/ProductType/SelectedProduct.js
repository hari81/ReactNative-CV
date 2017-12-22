import { SELECT_PRODUCT_ID, SELECT_PRODUCT_NAME } from '../../types';

export const onChangeName = (name) => {
    return {
        type: SELECT_PRODUCT_NAME,
        payload: name
    };
};
export const onChangeId = (id) => {
    return {
        type: SELECT_PRODUCT_ID,
        payload: id
    };
};
