import { REST_API_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, CLOSED_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch, reqHeaders, baseAuthentication } from '../../../Utils/FetchApiCalls';

export const ClosedPositionsData = (crop) => {
  return (dispatch, getState) => {
      dispatch({ type: FETCHING_ORDERS_ACTIVITY });
      const url = `${REST_API_URL}api/positions?commodity=${crop}&state=closed&sort=product.contractMonth.month,product.contractMonth.year`;
       // console.log(url);
      reqHeaders.append('Authorization', baseAuthentication(getState().auth.email, getState().auth.passwor));
    return fetch(url, {
        method: 'GET',
        headers: reqHeaders
      }
    )
   // doGetFetch(url, getState().auth.email, getState().auth.password)
      .then(response => response.json(), rej => Promise.reject(rej))
      .then(closed => {
        //console.log(`closed: ${closed}`);
          if (!Array.isArray(closed)) {
              return Promise.resolve([]);
          }
          //console.log(closed);
        return Promise.all(
          closed.map(items => {
            //console.log(items.lines[0].underlying);
              const underlyingURL = `${REST_API_URL}api/underlyings/${items.lines[0].underlying}`;
            //  doGetFetch(underlyingURL, getState().auth.email, getState().auth.password)
            return fetch(underlyingURL,
              {
                method: 'GET',
                headers: reqHeaders
              }
            )
                .then(response => response.json());
          }))
          .then(res => { //console.log('Underlying res',res);
            return closed.map((item, index) => {
              return Object.assign({}, item, {
                underlyingObjectData: res[index]
              });
            }, rej => Promise.reject(rej));
          })
          .then(closedPositions => {
          const newClosed = closedPositions.filter(item => Object.keys(item.underlyingObjectData).length !== 0);
            dispatch({ type: CLOSED_POSITIONS_DATA_SUCCESS, payload: newClosed });
          });
      })
      .catch(error => console.log(error));
  };
};

