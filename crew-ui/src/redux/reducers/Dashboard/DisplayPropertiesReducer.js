export default function (state = '', action) {
    switch (action.type) {
        case 'DISPLAY_PROPERTIES':
          return action.payload;
        default:
            return state;
    }
}
