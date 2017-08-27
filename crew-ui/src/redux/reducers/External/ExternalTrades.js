/*jshint esversion: 6 */
'use strict';



import { EXTERNAL_GET_TRANS } from '../../actions/types';

const INITIAL_STATE = {

    externalGetData: {},

};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case EXTERNAL_GET_TRANS:
            return Object.assign({}, state, { externalGetData: action.payload });
        default:
           return state;
    }
}
