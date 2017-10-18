import { Actions } from 'react-native-router-flux';
import { doDeleteFetch } from '../../Utils/FetchApiCalls';
import { AUTHENTICATE_URL } from '../../ServiceURLS/index';

export const invalidateSession = () => {
    return (dispatch, getState) => {
        const url = `${AUTHENTICATE_URL}sessions/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJDUk0gVG9rZW4iLCJhdWQiOiJDcmV3IDAuMS4wIiwiaXNzIjoiKGMpMjAxNyBDYXJnaWxsIFJpc2sgTWFuYWdlbWVudCIsImlhdCI6MTUwODI3MDI2OCwiZG9tYWluIjoiY29tbW9kaXR5aGVkZ2luZy5jb20iLCJzZXNzaW9uQ3JlYXRlVGltZSI6IjIwMTctMTAtMTdUMTk6NTc6MjAuMDAwWiIsInNlc3Npb25JZCI6IjEwMnluNmtlR1o1UUpDOExuRWIyVE5yNVEiLCJsb2dpbiI6ImpwanJAY29tbW9kaXR5aGVkZ2luZy5jb20iLCJ1dWlkIjoiMDB1Yzg1cHk3ZXRINDQxTjkwaDcifQ.HAbjCH-aRDN29JoLHacaF9sw369U_p3xByJOs3LhjR-KYfIDxbRqFSfev1KQjJ3H84jEEzzLTG8QdrWjbABcdw`;
        return doDeleteFetch(url, getState().auth.email, getState().auth.password)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(res => {
                if(res==='OK') {
                    Actions.auth();
                    dispatch({ type: 'INVALIDATE_SESSION' });

                }


            })
            .catch((status, error) => {
                console.log(`error ${error}`);
            });
    };
};
