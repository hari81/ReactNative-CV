import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
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
