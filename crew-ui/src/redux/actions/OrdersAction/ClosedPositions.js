import { ORDER_SERVICES_URL } from '../../../ServiceURLS/index';
import { FETCHING_ORDERS_ACTIVITY, CLOSED_POSITIONS_DATA_SUCCESS } from '../types';
import { doGetFetch } from '../../../Utils/FetchApiCalls';
import bugsnag from '../../../components/common/BugSnag';


export const ClosedPositionsData = (crop) => {
  return (dispatch, getState) => {
      const user = getState().account.accountDetails;
      bugsnag.setUser(`User Id: ${user.userId}`, user.email, user.firstName);
      dispatch({ type: FETCHING_ORDERS_ACTIVITY });
      const url = `${ORDER_SERVICES_URL}positions?commodity=${crop}&state=closed&sort=product.contractMonth.month,product.contractMonth.year`;
      return doGetFetch(url, getState().auth.basicToken)
      .then(response => response.json(), rej => Promise.reject(rej))
      .then(closed => {
            if (!Array.isArray(closed)) {
              return Promise.resolve([]);
          }
          return Promise.all(
          closed.map(items => {
            const underlyingURL = `${ORDER_SERVICES_URL}underlyings/${items.lines[0].underlying}`;
            return doGetFetch(underlyingURL, getState().auth.basicToken)
             .then(response => response.json());
          }))
          .then(res => {
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
      .catch(/*error => console.log(error)*/bugsnag.notify);
  };
};

