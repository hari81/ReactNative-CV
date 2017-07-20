import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import App from '../App';
import Orders from './components/Orders';

const RouterComponent = () => {
  return (
    <Router>

        <Scene key="login" component={App} initial />
        <Scene key='orders' component={Orders} />
    </Router>

  );
}

export default RouterComponent;
