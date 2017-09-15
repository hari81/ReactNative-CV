export default function (state = '', action) {
    switch (action.type) {
        case '16CORN':
            return action.payload;
        case '16SOY':
            return action.payload;
        case '17CORN':
            return action.payload;
        case '17SOY':
            return action.payload;
        case '18CORN':
            return action.payload;
        case '18SOY':
            return action.payload;
        case '19CORN':
            return action.payload;
        case '19SOY':
            return action.payload;
        default:
            return state;
    }
}