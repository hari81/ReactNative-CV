export default function(state='',action) {
    switch(action.type) {
        case "CONTRACT_MONTH_DATA":
            return action.payload;
        default:
            return state;
    }
}