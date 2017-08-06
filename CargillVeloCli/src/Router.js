import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import App from './components/Welcome';
import Orders from './containers/Orders';
import CancelOrder from './components/CancelOrder';
import OpenPositions from './components/OpenPositions';
import CancelOrderReceipt from './components/CancelOrderReceipt';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="auth" initial>
        <Scene hideNavBar key="app" component={App} initial />
        </Scene>
        <Scene key="main" >
            <Scene hideNavBar key='orders' component={Orders} />
            <Scene hideNavBar key='cancelorder' component={CancelOrder} />
            <Scene hideNavBar key='openposition' component={OpenPositions} />
            <Scene hideNavBar key='cancelorderreceipt' component={CancelOrderReceipt} />
        </Scene>
    </Router>

  );
}

export default RouterComponent;
