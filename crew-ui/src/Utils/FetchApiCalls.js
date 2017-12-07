import RNFetchBlob from 'react-native-fetch-blob';
import { X_API_KEY } from '../ServiceURLS/index';
//import fetch from 'isomorphic-fetch';
//const fetch = require('isomorphic-fetch');

function sessionToken(crmSToken) {
    return `CRM ${crmSToken}`;
}
export const reqHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': X_API_KEY,
    'User-Agent': 'Crew 0.1.0',
}
function doGetFetch(url, token) {
    delete reqHeaders.Authorization;
    reqHeaders.Authorization = sessionToken(token);
    return fetch(url, {
        method: 'GET',
        headers: reqHeaders
    });
}

function doPutFetch(url, body, token) {
    delete reqHeaders.Authorization;
    reqHeaders.Authorization = sessionToken(token);
    return fetch(url, {
        method: 'PUT',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doPostFetch(url, body, token) {
    delete reqHeaders.Authorization;
    reqHeaders.Authorization = sessionToken(token);
    return fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doLoginPostFetch(url, body) {
    reqHeaders['Accept-Encoding'] = 'gzip,deflate';
    return fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doDeleteFetch(url, token) {
    delete reqHeaders.Authorization;
    reqHeaders.Authorization = sessionToken(token);
    return fetch(url, {
        method: 'DELETE',
        headers: reqHeaders
    });
}

function doGetTradeReceiptFetch(url, token) {
    delete reqHeaders.Authorization;
    reqHeaders.Authorization = sessionToken(token);
    // console.log(url);
    reqHeaders.Accept = 'application/pdf';
    reqHeaders['Cache-Control'] = 'no-store';
    RNFetchBlob
        .config({
            // add this option that makes response data to be stored as a file.
            fileCache: true,
            appendExt: 'pdf',
            //path: DocumentDir
        })
        .fetch('GET', url, reqHeaders);

}

export { doGetFetch, doPostFetch, doPutFetch, doDeleteFetch, doLoginPostFetch, doGetTradeReceiptFetch };
