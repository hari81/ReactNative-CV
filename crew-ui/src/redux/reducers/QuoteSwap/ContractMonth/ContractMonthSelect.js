const INITIAL_STATE = {
    contractMonth: '',
    bidPrice: '',
    askPrice: '',
    settlePrice: '',
    lastTradeDate: '',
    underlyingSymbol: '',
    bushelQuantity: {},

}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SELECT_CONTRACT_MONTH':
            return Object.assign({}, state, { contractMonth: action.payload })
        case 'BID_PRICE_SHOW':
            return Object.assign({}, state, { bidPrice: action.payload });
        case 'ASK_PRICE_SHOW':
            return Object.assign({}, state, { askPrice: action.payload });
        case 'SETTLE_PRICE_SHOW':
            return Object.assign({}, state, { settlePrice: action.payload });
        case 'LAST_TRADE_DATE_SHOW':
            return Object.assign({}, state, { lastTradeDate: action.payload });
        case 'UNDERLYING_YEAR_SHOW':
            return Object.assign({}, state, { underlyingSymbol: action.payload });
        case 'BUSHEL_QUANTITY_LIMIT':
            return Object.assign({}, state, { bushelQuantity: action.payload });
        default:
            return state;
    }
}
