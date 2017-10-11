import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

/* use this code if you don't want redux logging */

/*
import ReduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

*/

/* use this code if you want redux logger */

import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

/*  end of logging switch  */

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


