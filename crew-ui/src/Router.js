/*jshint esversion: 6 */
'use strict';
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import App from './components/Welcome';
import Orders from './containers/Orders';
import CancelOrder from './components/CancelOrders/CancelOrder';
import OpenPositions from './components/Orders/OpenPositions';
import CancelOrderReceipt from './components/CancelOrders/CancelOrderReceipt';
import DashBoard from './containers/DashBoard';
import MyFarm from './containers/MyFarm';
import ExternalSales from "./containers/ExternalSales";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='auth' initial>
        <Scene hideNavBar key='app' component={App} initial />
      </Scene>
      <Scene key='main'>
        <Scene hideNavBar key='dashboard' component={DashBoard} />
        <Scene hideNavBar key='orders' component={Orders} />
        <Scene hideNavBar key='cancelorder' component={CancelOrder} />
        <Scene hideNavBar key='openposition' component={OpenPositions} />
        <Scene
          hideNavBar
          key='cancelorderreceipt'
          component={CancelOrderReceipt}
        />
        <Scene hideNavBar key='myfarm' component={MyFarm} />
          <Scene hideNavBar key='externalsales' component={ExternalSales} />

      </Scene>
    </Router>
  );
};

export default RouterComponent;
