//const fetch = require('isomorphic-fetch');
import base64 from 'base-64';
import { X_API_KEY } from '../ServiceURLS/index';

const baseAuthentication = (email, password) =>  {console.log(`Basic ${base64.encode(email + ':' + password)}`); return `Basic ${base64.encode(email + ':' + password)}`}

  export const doGetFetch = (url, email, password) => {
    console.log(url, email, password);
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization: baseAuthentication(email,password),
                'x-api-key': X_API_KEY,
                'Accept-Encoding': 'gzip,deflate',
                'Content-Type': 'application/json',
                'User-Agent': 'Crew 0.1.0'
            }
        })
            .then((response) => { console.log('FetchCalls ', response);
                if (response.ok) {
                    return Promise.resolve(response.json());
                }
                //console.log('Fetch Response', response.json());
               return response.json()

            .then(error =>
                        Promise.reject({ status: response.status, response: error }));
            })
            .catch(error => Promise.reject(error));
    }


export const doPutFetch = (url, method, body, email, password) => {
    console.log(url, email, password);
    return fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: baseAuthentication(email,password),
            'x-api-key': X_API_KEY,
            'Accept-Encoding': 'gzip,deflate',
            'Content-Type': 'application/json',
            'User-Agent': 'Crew 0.1.0'
        },
        body: body
    })
        .then((response) => { console.log('FetchCalls ', response);
            if (response.ok) {
                return Promise.resolve(response.json());
            }
            //console.log('Fetch Response', response.json());
            return response.json()

                .then(error =>
                    Promise.reject({ status: response.status, response: error }));
        })
        .catch(error => Promise.reject(error));
}

export const doPostFetch = (url, body, email, password) => {
    console.log(url, email, password);
    return fetch(url, {
        method: 'POST',
        headers: {
            Authorization: baseAuthentication(email,password),
            'x-api-key': X_API_KEY,
            'Accept-Encoding': 'gzip,deflate',
            'Content-Type': 'application/json',
            'User-Agent': 'Crew 0.1.0'
        },
        body: body
    })
        .then((response) => { console.log('FetchCalls ', response);
            if (response.ok) {
                return Promise.resolve(response.json());
            }
            //console.log('Fetch Response', response.json());
            return response.json()

                .then(error =>
                    Promise.reject({ status: response.status, response: error }));
        })
        .catch(error => Promise.reject(error));
}

export const doDeleteFetch = (url, body, email, password) => {
    console.log(url, email, password);
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: baseAuthentication(email,password),
            'x-api-key': X_API_KEY,
            'Accept-Encoding': 'gzip,deflate',
            'Content-Type': 'application/json',
            'User-Agent': 'Crew 0.1.0'
        },
        body: body
    })
        .then((response) => { console.log('FetchCalls ', response);
            if (response.ok) {
                return Promise.resolve(response.json());
            }
            //console.log('Fetch Response', response.json());
            return response.json()

                .then(error =>
                    Promise.reject({ status: response.status, response: error }));
        })
        .catch(error => Promise.reject(error));
};






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