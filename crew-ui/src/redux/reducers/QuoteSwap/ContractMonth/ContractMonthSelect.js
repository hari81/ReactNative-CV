const INITIAL_STATE={
    contractMonth:0,
    bidprice:'',
    askprice:''
}

export default function(state=INITIAL_STATE,action) {
    switch(action.type) {
        case 'SELECT_CONTRACT_MONTH':
            return Object.assign({},state,{contractMonth:action.payload})
        case 'BID_PRICE_SHOW':
            return Object.assign({},state,{bidprice:action.payload})
        case 'ASK_PRICE_SHOW':
            return Object.assign({},state,{askprice:action.payload})
        default:
            return state;
    }
}