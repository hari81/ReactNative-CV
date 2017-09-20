const INITIAL_STATE = {
    contractMonth: '',
    bidprice: '',
    askprice: '',
    lastTradeDate: '',
    underlyingSymbol: ''

}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SELECT_CONTRACT_MONTH':
            return Object.assign({}, state, { contractMonth: action.payload })
        case 'BID_PRICE_SHOW':
            return Object.assign({}, state, { bidprice: action.payload })
        case 'ASK_PRICE_SHOW':
            return Object.assign({}, state, { askprice: action.payload })
        case 'LAST_TRADE_DATE_SHOW':
            return Object.assign({}, state, { lastTradeDate: action.payload })
        case 'UNDERLYING_YEAR_SHOW':
            return Object.assign({}, state, { underlyingSymbol: action.payload })
        default:
            return state;
    }
}
