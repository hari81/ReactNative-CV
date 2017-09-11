import base64 from 'base-64';
import { FETCHING_ORDERS_ACTIVITY, ALL_BUTTONS, SELECT_ID } from '../types';
import { REST_API_URL } from '../../../ServiceURLS/index';

//import Data from '../../../restAPI/MyCropButtons.json';
import Data from '../../../restAPI/get_crops.json';
export const cropsButtons = () => {

    return (dispatch, getState) => {
        // dispatch({ type: FETCHING_ORDERS_ACTIVITY });
        const url = REST_API_URL + '';
        /* return fetch(url, {
             method: 'GET',
             headers: {
                 'Authorization': 'Base ' + base64.encode(getState().email + ':' + getState().password),
                 'x-pai-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
             }
         })
             .then(response => response.json())

             .then(cropValues => {
                 //console.log(`cropValues: ${cropValues}`);
                 if (!Array.isArray(cropValues)) {
                     return Promise.resolve([]);
                 }
                 //cropValues = farmCorn2017;*/

        //dispatch({ type: ALL_BUTTONS, payload: ButtonsData });
        const ButtonsData = [];
        const commodities = Data.commodities;
       // console.log('length', commodities.length);
       // const firstCropYears =  commodities.crops;
        let k = 0;
        for (let i = 0; i < commodities.length; i++) {
            const crops = commodities[i].crops;
            for (let j = 0; j < crops.length; j++) {
                ButtonsData[k] = Object.assign({},
                    { id: commodities[i].commodity + crops[j].cropYear, cropYear: crops[j].cropYear, code: commodities[i].commodity, name: commodities[i].name });
                k++;
            }
        }
        ButtonsData.sort((a, b) => { return a.cropYear - b.cropYear });
        dispatch({ type: ALL_BUTTONS, payload: ButtonsData });
        console.log('ButtonsData', ButtonsData);

        /*  })
          .catch(error => console.log('error ' + error));*/
    };
};

export const selectId = (id) => {
    return {
        type: SELECT_ID,
        payload: id
    };
};