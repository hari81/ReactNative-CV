export const contractMonthSelect = (id) => {
    return {
        type: 'SELECT_CONTRACT_MONTH',
        payload: id
    };
};

export const bidPriceShow = (bidprice) => {
    return {
        type: 'BID_PRICE_SHOW',
        payload: bidprice
    };
};

export const settlePriceShow = (settleprice) => {
    return {
        type: 'SETTLE_PRICE_SHOW',
        payload: settleprice
    };
};

export const askPriceShow = (askprice) => {
    return {
        type: 'ASK_PRICE_SHOW',
        payload: askprice
    };
};

export const lastTradeDateShow = (lastTradeDate) => {
    return {
        type: 'LAST_TRADE_DATE_SHOW',
        payload: lastTradeDate
    };
};

export const underlyingYearShow = (underlyingSym) => {
    return {
        type: 'UNDERLYING_YEAR_SHOW',
        payload: underlyingSym
    };
};

export function bushelLimit(limit) {
    return {
        type: 'BUSHEL_QUANTITY_LIMIT',
        payload: limit
    };
}