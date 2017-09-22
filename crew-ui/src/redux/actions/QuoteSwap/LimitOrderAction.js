export const onLimitSelection = (limitprice) => {
    return {
        type: 'ORDER_LIMIT_PRICE',
        payload: limitprice
    };
}

export const onExpireSelection = (date) => {
    return {
        type: 'ORDER_EXPIRE_DATE',
        payload: date
    };
}
