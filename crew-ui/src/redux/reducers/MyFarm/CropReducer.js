import { MY_FARM_CROP_VALUES, MY_FARM_CROP_VALUES_SUMMARY, SAVE_CROP_DATA_LOCALLY,MY_FARM_ACTION } from '../../actions/types';

const INITIAL_STATE = {
    myFarmCropData: {},
    cropValuesSummary: {},
    farmFlag: false,
    userFarm: {}

};

export default function (state = INITIAL_STATE, action) {
    //console.log("myfarmaction  " + action.payload);
    switch (action.type) {
        case MY_FARM_CROP_VALUES:
            return Object.assign({}, state, { myFarmCropData: action.payload });
        case MY_FARM_CROP_VALUES_SUMMARY:
            return Object.assign({}, state, { cropValuesSummary: action.payload });
        case SAVE_CROP_DATA_LOCALLY:
            return Object.assign({}, state, { myFarmCropData: action.payload });
        case MY_FARM_ACTION:
            return Object.assign({}, state, { farmFlag: action.payload });
        default:
            return state;
    }
}

