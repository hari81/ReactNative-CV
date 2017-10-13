import { doGetFetch } from '../../../Utils/FetchApiCalls';
import { VELO_SERVICES_URL } from '../../../ServiceURLS/index';

export const displayProperties = () => {
    return (dispatch, getState) => {
        const url = `${VELO_SERVICES_URL}dashboard/displayProperties`;
        return doGetFetch(url, getState().auth.crmSToken)
            .then(response => response.json(), rej => Promise.reject(rej))
            .then(displayProps =>
                dispatch(displayProperty(displayProps))
            )
            .catch((status, error) => {
                console.log(`error ${error}`);
            });
    };
};
export function displayProperty(displayProps) {
    return {
        type: 'DISPLAY_PROPERTIES',
        payload: displayProps
    };
}
