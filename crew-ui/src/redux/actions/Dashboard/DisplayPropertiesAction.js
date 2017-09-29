import { doGetFetch } from '../../../Utils/FetchApiCalls';
import { QA_ACCOUNT_EXTERNALTRADES_FARMDATA } from '../../../ServiceURLS/index';

export const displayProperties = () => {
    return (dispatch, getState) => {
        const url = `${QA_ACCOUNT_EXTERNALTRADES_FARMDATA}dashboard/displayProperties`;
        return doGetFetch(url, getState().auth.email, getState().auth.password)
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
