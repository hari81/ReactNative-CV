export const contractMonthSelect = (id) => {
    return {
        type: 'SELECT_CONTRACT_MONTH',
        payload:id
    };
};
export const bidPriceShow = (bidprice) => {
    return {
        type: 'BID_PRICE_SHOW',
        payload:bidprice
    };
};
export const askPriceShow = (askprice) => {
    return {
        type: 'ASK_PRICE_SHOW',
        payload:askprice
    };
};