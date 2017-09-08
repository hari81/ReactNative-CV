/*jshint esversion: 6 */
'use strict';



import { EXTERNAL_GET_TRANS, EXTERNAL_FLAG } from '../../actions/types';

const INITIAL_STATE = {

    externalGetData: {},
    exflag: false

};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case EXTERNAL_GET_TRANS:
            return Object.assign({}, state, { externalGetData: action.payload });

        case EXTERNAL_FLAG:
            return Object.assign({}, state, { exflag: action.payload });
        default:
           return state;
    }
}
