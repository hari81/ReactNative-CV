/*jshint esversion: 6 */
'use strict';

const env = 'velo'; //Please change env constant to switch between environments

//Rest API's
export const REST_API_URL =
  `https://a7gp732c12.execute-api.us-east-1.amazonaws.com/${env}/extracense/`; //EC_REST_API_URL

// Rest Velo service
export const VELO_REST_API_URL = `https://t6sd119in4.execute-api.us-east-1.amazonaws.com/${env}/`;


//Rest DEV service  -- using External Trades - Tim
export const DEV_REST_API_URL = 'https://t6sd119in4.execute-api.us-east-1.amazonaws.com/DEV/';

//Tahiry CropData and ExternalTrades urls
export const DEV_CROP_EXTERNAL_TRADE_URL = 'https://ce3g1cx5bc.execute-api.us-east-1.amazonaws.com/dev/';
export const DEV2_CROP_EXTERNAL_TRADE_URL = 'https://rj7hg68va5.execute-api.us-east-1.amazonaws.com/dev2';

//Tahiry given service - never used
export const DEV_UNUSED_URL = 'https://vtbelr7y02.execute-api.us-east-1.amazonaws.com/DEV/';

//Authentication URL
export const AUTHENTICATE_URL =
  `https://1yvo5i7uk3.execute-api.us-east-1.amazonaws.com/qa/`;
//Rest qa service
export const QA_ACCOUNT_EXTERNALTRADES_FARMDATA = 'https://9itz0yke9l.execute-api.us-east-1.amazonaws.com/qa/';

//x-api-key
export const X_API_KEY = `rGNHStTlLQ976h9dZ3sSi1sWW6Q8qOxQ9ftvZvpb`;



//WEB links
export const PRIVACY = `http://go.cargill.com/CargillPriceHedgingPrivacy`;
export const TERMS = `http://go.cargill.com/CargillPriceHedgingTerms`;




/*

Authentication: REST_API_URL + 'identities/authenticate';

get Orders:  REST_API_URL + 'api/orders';
cancelOrders: REST_API_URL + 'api/orders/98177';
underlying Order:RESTAPIRUL + 'api/underlyings/CZ2017';
dropdownlist: REST_API_URL + 'api/commodities';
dropdown corn orders: REST_API_URL + 'api/orders?commodity=C';


 */
