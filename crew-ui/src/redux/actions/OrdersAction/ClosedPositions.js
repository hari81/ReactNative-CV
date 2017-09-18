import base64 from 'base-64';
import { REST_API_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, CLOSED_POSITIONS_DATA_SUCCESS } from '../types';

export const ClosedPositionsData = (crop) => {
  return (dispatch, getState) => {
      dispatch({ type: FETCHING_ORDERS_ACTIVITY });
      const url = REST_API_URL+'api/positions?commodity=' + crop + '&state=closed&sort=product.contractMonth.month,product.contractMonth.year';
        console.log(url);
    return fetch(url, {
        method: 'GET',
        headers: {
          Authorization:
            'Basic ' +
            base64.encode(
              getState().auth.email + ':' + getState().auth.password
            ),
          'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
        }
      }
    )
      .then(response => response.json())

      .then(closed => {
        //console.log(`closed: ${closed}`);
          if (!Array.isArray(closed)) {
              return Promise.resolve([]);
          }
          console.log(closed);
        return Promise.all(
          closed.map(items => {
            //console.log(items.lines[0].underlying);
            return fetch(REST_API_URL+'api/underlyings/' + items.lines[0].underlying,
              {
                method: 'GET',
                headers: {
                  Authorization:
                    'Basic ' +
                    base64.encode(
                      getState().auth.email + ':' + getState().auth.password
                    ),
                  'x-api-key': 'rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb'
                }
              }
            ).then(response => response.json());
          })
        )
          .then(res => { //console.log('Underlying res',res);
            return closed.map((item, index) => {

              return Object.assign({}, item, {
                underlyingObjectData:  res[index]
              });
            });
          })
          .then(closedPositions => {
          const newClosed = closedPositions.filter(item => Object.keys(item.underlyingObjectData).length !== 0);
            dispatch({ type: CLOSED_POSITIONS_DATA_SUCCESS, payload: newClosed });
          });
      })
      .catch(error => console.log(error));
  };
};
/*export function closedPositionsDataSuccess(closedPositions) {
  //console.log(closedPositions);
  return {
    type: 'CLOSED_POSITIONS_DATA_SUCCESS',
    closedPositions
  };
}*/
