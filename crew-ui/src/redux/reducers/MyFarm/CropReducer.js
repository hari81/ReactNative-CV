/* jshint esversion: 6 */
'use strict';

import { ALL_BUTTONS, MY_FARM_CROP_VALUES, CROP_TYPE_AND_YEAR } from '../../actions/types';

const INITIAL_STATE = {
    myFarmCropData: {},
    allCropButtons: [],
    //cropTypeButton: ''
};

export default function (state = INITIAL_STATE, action) {
    //console.log("myfarmaction  " + action.payload);
    switch (action.type) {
        case MY_FARM_CROP_VALUES:
            //console.log("myfarm reduce " + action.payload);
            return Object.assign({}, state, { myFarmCropData: action.payload });
        case ALL_BUTTONS:
           // console.log('buttons ' + action.payload);
           return Object.assign({}, state, { allCropButtons: action.payload });
           // return action.payload;
 /*           case 'MY_FARM_CORN_2016':
                return Object.assign({}, state, { myFarmCropData: action.payload, cropTypeButton: action.cropNameYear  });
            //return action.payload;
        case 'MY_FARM_CORN_2018':
            return Object.assign({}, state, { myFarmCropData: action.payload, cropTypeButton: action.cropNameYear  });
            //return action.payload;
        case 'MY_FARM_SOY_2016':
            return Object.assign({}, state, { myFarmCropData: action.payload, cropTypeButton: action.cropNameYear  });
           // return action.payload;
        case 'MY_FARM_SOY_2017':
            return Object.assign({}, state, { myFarmCropData: action.payload, cropTypeButton: action.cropNameYear  });
           // return action.payload;
        case 'MY_FARM_SOY_2018':
            return Object.assign({}, state, { myFarmCropData: action.payload, cropTypeButton: action.cropNameYear  });
           // return action.payload;
        case CROP_TYPE_AND_YEAR:
            return Object.assign({}, state, { cropTypeButton: action.payload });*/
        default:
            return state;
    }
};

