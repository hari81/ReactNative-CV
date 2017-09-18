
import base64 from 'base-64';
import { X_API_KEY } from '../ServiceURLS/index';
//import fetch from 'isomorphic-fetch';
//const fetch = require('isomorphic-fetch');

function baseAuthentication(email, password) {
   return `Basic ${base64.encode(`${email}:${password}`)}`;
}
export const reqHeaders = new Headers();
reqHeaders.append('Content-Type', 'application/json');
reqHeaders.append('x-api-key', X_API_KEY);
reqHeaders.append('Accept-Encoding', 'gzip,deflate');
reqHeaders.append('User-Agent', 'Crew 0.1.0');

export const reqestHeaders = new Headers({
    'x-api-key': X_API_KEY,
    'Accept-Encoding': 'gzip,deflate',
    'Content-Type': 'application/json',
    'User-Agent': 'Crew 0.1.0'
});

function doGetFetch(url, email, password) {
    reqHeaders.append('Authorization', baseAuthentication(email, password));
    return fetch(url, {
        method: 'GET',
        headers: reqHeaders
    });
}

function doPutFetch(url, body, email, password) {
    reqHeaders.append('Authorization', baseAuthentication(email, password));
    return fetch(url, {
        method: 'PUT',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doPostFetch(url, body, email, password) {
    reqHeaders.append('Authorization', baseAuthentication(email, password));
    return fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doLoginPostFetch(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body)
    });
}

function doDeleteFetch(url, email, password) {
    reqHeaders.append('Authorization', baseAuthentication(email, password));
    return fetch(url, {
        method: 'DELETE',
        headers: reqHeaders
    });
}

export { doGetFetch, doPostFetch, doPutFetch, doDeleteFetch, baseAuthentication, doLoginPostFetch };

/*module.exports = function goFetch (url, options) {
    return fetch(url, options)
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response.json());
            }
            return response
                .json()
                .then(error =>
                    Promise.reject({ status: response.status, response: error }),
                );
        })
        .catch(error => Promise.reject(error));
};*/