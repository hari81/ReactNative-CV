export const contractMonthSelect = (id) => {
    return {
        type: 'SELECT_CONTRACT_MONTH',
        payload: id
    };
};

export const bushelLimitShow = (limit) => {
    return {
        type: 'BUSHEL_QUANTITY_LIMIT',
        payload: limit
    };
};
