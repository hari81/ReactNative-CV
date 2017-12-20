import { DISPLAY_PROPERTIES } from '../../actions/types';

export default function (state = '', action) {
    switch (action.type) {
        case DISPLAY_PROPERTIES:
          return action.payload;
        default:
            return state;
    }
}
