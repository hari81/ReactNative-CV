import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { rootReducer } from './redux/reducers';
import Router from './Router';

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

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


