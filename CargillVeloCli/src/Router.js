import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import App from './components/Welcome';
import Orders from './containers/Orders';
import CancelOrder from './components/CancelOrder';
import DashBoard from './containers/DashBoard';
import CropButton from './components/common/CropButton';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="auth" initial >
        <Scene hideNavBar key="app" component={App} />
        </Scene>
        <Scene key="main" >
            <Scene hideNavBar key='dashboard' component={DashBoard} />
            <Scene hideNavBar key='orders' component={Orders} />
            <Scene hideNavBar key='cancelorder' component={CancelOrder} />
            <Scene hideNavBar key='cropbutton' component={CropButton} />
        </Scene>
    </Router>

  );
}

export default RouterComponent;
