/* jshint esversion: 6 */
'use strict';

import { ALL_BUTTONS, MY_FARM_CROP_VALUES, CROP_TYPE_AND_YEAR, MY_FARM_CROP_VALUES_SUMMARY,SAVE_CROP_DATA_LOCALLY } from '../../actions/types';

const INITIAL_STATE = {
    myFarmCropData: {},
    allCropButtons: [],
    cropValuesSummary: {}

};

export default function (state = INITIAL_STATE, action) {
    //console.log("myfarmaction  " + action.payload);
    switch (action.type) {
        case MY_FARM_CROP_VALUES:
            return Object.assign({}, state, { myFarmCropData: action.payload });
        case ALL_BUTTONS:
           return Object.assign({}, state, { allCropButtons: action.payload });
        case MY_FARM_CROP_VALUES_SUMMARY:
            return Object.assign({},state, {cropValuesSummary: action.payload});
        case SAVE_CROP_DATA_LOCALLY:
            return Object.assign({}, state, myFarmCropData);

        default:
            return state;
    }
};

