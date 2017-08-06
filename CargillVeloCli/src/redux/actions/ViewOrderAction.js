import base64 from 'base-64';
 import{ RESTAPIURL } from "../../ServiceURLS";


import { FETCHING_ORDERS_ACTIVITY, DROP_DOWN_VALUES, CROP_DROPDOWN_LOAD } from './types';

export function itemsFetchDataSuccess(items) {

    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}
export const ViewOrdersData = () => {
    return (dispatch, getState) => {
        dispatch( {type: FETCHING_ORDERS_ACTIVITY} );


        const url = RESTAPIURL+'api/orders';
        //const username = 'BernM@commodityhedging.com';
        //const password = 'test1234';


        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64.encode(getState().auth.email + ":" + getState().auth.password));
        headers.append('x-api-key','rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb');
        return fetch(url, {
            method: 'GET',
            headers
        })
            .then(response => response.json())
            .then((items) => {
                   /* if(items.value && items.value.length)
                    {
                        console.log('Undefined');
                    }else{*/
                return Promise.all(items.value.map((item)=>{


                   // const username = 'BernM@commodityhedging.com';
                   // const password = 'test1234';

                    const headers = new Headers();
                    headers.append('Authorization', 'Basic ' + base64.encode(getState().auth.email + ":" + getState().auth.password));
                    headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
                    return fetch(RESTAPIURL+'api/underlyings/'+item.underlying, {
                        method: 'GET',
                        headers
                    })
                        .then(response => response.json())


                }))
                //.then(response => response.json())
                    .then(response => {
                        const finalResponse =  Object.assign({}, items, {
                            value: items.value.map((order, index) => ({
                                ...order,
                                underlyingObject: response[index]
                            }))
                        })
                       // console.log(finalResponse)
                        dispatch(itemsFetchDataSuccess(finalResponse))

                    })
                //    }

            })
    }
}

             /*   console.log(items);
                dispatch(itemsFetchDataSuccess(items))

        })
            .catch((error) => console.log("error are"  +error ));

    };
};*/



export const dropDownCrop = () => {
    return(dispatch, getState) => {
        const url = RESTAPIURL+'api/commodities';
        console.log(url);
        return fetch(url, {
            method: 'GET',
            headers: {
            'Authorization': 'Basic ' + base64.encode(getState().auth.email + ":" + getState().auth.password),
                'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
                }
        })
            .then(response => response.json())
            .then(dropDownData => {
                   dispatch({type: DROP_DOWN_VALUES, payload: dropDownData})
                })
            .catch(error => console.log('error are' + error));

    }

};

/*export const selectedCrop = (crop, email, password) => {
  return(dispatch) => {
      const url = RESTAPI+'api/orders?commodity='+crop.toUpperCase().charAt(0);
      console.log(url);

      return fetch(url, {
          method: 'GET',
          headers: {
              'Authorization': 'Basic ' + base64.encode(email + ":" + password),
              'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
          }
      })
          .then(response => response.json())
          .then(cropOrders => {

              return Promise.all(cropOrders.value.map((order)=>{
                  // const base64 = require('base-64');

                  const username = 'BernM@commodityhedging.com';
                  const password = 'test1234';

                  const headers = new Headers();
                  headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));
                  headers.append('x-api-key', 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb')
                  return fetch(RESTAPI+'api/underlyings/'+order.underlying, {
                      method: 'GET',
                      headers
                  })
                      .then(response => response.json())


              }))
              //.then(response => response.json())
                  .then(response => {
                      const finalResponse =  Object.assign({}, cropOrders, {
                          value: cropOrders.value.map((order, index) => ({
                              ...order,
                              underlyingObject: response[index]
                          }))
                      })
                      // console.log(finalResponse)
                      dispatch(c(finalResponse))

                  })

          })*/




/*
              console.log(cropOrders);
              dispatch({type: DROP_DOWN_VALUES, payload: cropOrders.value})
          })
          .catch(error => console.log('error are' + error));

  }


};*/
