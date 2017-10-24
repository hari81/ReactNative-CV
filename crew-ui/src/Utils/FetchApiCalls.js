import RNFetchBlob from 'react-native-fetch-blob';
import { X_API_KEY } from '../ServiceURLS/index';
//import fetch from 'isomorphic-fetch';
//const fetch = require('isomorphic-fetch');

function sessionToken(crmSToken) {
   return `CRM ${crmSToken}`;
}
export const reqHeaders = new Headers();
reqHeaders.append('Content-Type', 'application/json');
reqHeaders.append('x-api-key', X_API_KEY);
reqHeaders.append('User-Agent', 'Crew 0.1.0');

function doGetFetch(url, token) {
    reqHeaders.delete('Authorization');
    token.length >= 100 ? reqHeaders.append('Authorization', sessionToken(token)) : reqHeaders.append('Authorization', token);
    return fetch(url, {
        method: 'GET',
        headers: reqHeaders
    });
}

function doPutFetch(url, body, token) {
    reqHeaders.delete('Authorization');
    token.length >= 100 ? reqHeaders.append('Authorization', sessionToken(token)) : reqHeaders.append('Authorization', token);
    return fetch(url, {
        method: 'PUT',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doPostFetch(url, body, token) {
    reqHeaders.delete('Authorization');
    token.length >= 100 ? reqHeaders.append('Authorization', sessionToken(token)) : reqHeaders.append('Authorization', token);
    console.log('body', body);
    return fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doLoginPostFetch(url, body) {
    reqHeaders.append('Accept-Encoding', 'gzip,deflate');
    return fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doDeleteFetch(url, token) {
    reqHeaders.delete('Authorization');
    token.length >= 100 ? reqHeaders.append('Authorization', sessionToken(token)) : reqHeaders.append('Authorization', token);
    return fetch(url, {
        method: 'DELETE',
        headers: reqHeaders
    });
}

function doGetTradeReceiptFetch(url, token) {
    reqHeaders.delete('Authorization');
    // console.log(url);
    token.length >= 100 ? reqHeaders.append('Authorization', sessionToken(token)) : reqHeaders.append('Authorization', token);
    reqHeaders.append('Accept', 'application/pdf');
    reqHeaders.append('Cache-Control', 'no-store');
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
