export default function(state=1,action) {
    switch(action.type) {
        case 'SELECT_ID':
            return action.payload;
        default:
            return state;
    }
}