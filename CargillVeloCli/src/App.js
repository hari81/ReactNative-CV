/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { createLogger } from 'redux-logger';

import Router from './Router';


import thunk from 'redux-thunk';

import reducer from './redux/reducers';

const middlewares = [thunk];


    const logger = require('redux-logger');
    middlewares.push(logger.createLogger());


const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(reducer);
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
