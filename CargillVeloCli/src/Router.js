import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import App from './components/Welcome';
import Orders from './containers/Orders';
import CancelOrder from './containers/CancelOrder';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="auth">
        <Scene hideNavBar key="app" component={App} />
        </Scene>
        <Scene key="main" >
            <Scene hideNavBar key='orders' component={Orders} />
            <Scene hideNavBar key='cancelorder' component={CancelOrder} />
        </Scene>
    </Router>

  );
}

export default RouterComponent;
