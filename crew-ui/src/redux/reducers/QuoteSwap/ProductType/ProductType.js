import { RISK_PRODUCTS_DATA } from '../../../actions/types';

export default (state = '', action) => {
    switch (action.type) {
        case RISK_PRODUCTS_DATA:
            return action.payload;
        default:
            return state;
    }

}