/*jshint esversion: 6 */
"use strict";

const env = 'qa'; //Please change env constant to switch between environments

//Rest API's
export const REST_API_URL =
  `https://a7gp732c12.execute-api.us-east-1.amazonaws.com/${env}/extracense/`;

//Authentication URL
export const AUTHENTICATE_URL =
  `https://1yvo5i7uk3.execute-api.us-east-1.amazonaws.com/${env}/`;

//x-api-key
export const X_API_KEY = `rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb`;

//WEB links
export const PRIVACY = `http://go.cargill.com/CargillPriceHedgingPrivacy`;
export const TERMS = `http://go.cargill.com/CargillPriceHedgingTerms`;

//env = QA, VELO, PROD

//if env = QA

//service Urls

/*

Authentication: REST_API_URL + 'identities/authenticate';

get Orders:  REST_API_URL + 'api/orders';
cancelOrders: REST_API_URL + 'api/orders/98177';
underlying Order:RESTAPIRUL + 'api/underlyings/CZ2017';
dropdownlist: REST_API_URL + 'api/commodities';
dropdown corn orders: REST_API_URL + 'api/orders?commodity=C';


 */
