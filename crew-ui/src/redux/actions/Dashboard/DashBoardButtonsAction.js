/*jshint esversion: 6 */
'use strict';

export const firstButton = () => {
    return {
        type: '16CORN',
        payload: require('../../../restAPI/16CORN')
    };
};
export const secondButton = () => {
    return {
        type: '16SOY',
        payload: require('../../../restAPI/16SOY')
    };
};
export const thirdButton = () => {
    return {
        type: '17CORN',
        payload: require('../../../restAPI/17CORN')
    };
};
export const fourthButton = () => {
    return {
        type: '17SOY',
        payload: require('../../../restAPI/17SOY')
    };
};
export const fifthButton = () => {
    return {
        type: '18CORN',
        payload: require('../../../restAPI/18CORN')
    };
};
export const sixthButton = () => {
    return {
        type: '18SOY',
        payload: require('../../../restAPI/18SOY')
    };
};