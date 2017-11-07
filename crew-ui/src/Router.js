import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import App from './components/Welcome';
import Orders from './containers/Orders';
import CancelOrder from './components/CancelOrders/CancelOrder';
import OpenPositions from './components/Orders/OpenPositions';
import CancelOrderReceipt from './components/CancelOrders/CancelOrderReceipt';
import DashBoard from './containers/DashBoard';
import MyFarm from './containers/MyFarm';
import ExternalSales from './containers/ExternalSales';
import QuoteSwap from './containers/QuoteSwap/Product-107/QuoteSwap';
import ChartApp from './components/DashBoard/DoughnutChart/ChartApp';
import TradeConfirmationOrderReceipt from './components/QuoteSwap/Product-107/TradeConfirmationOrderReceipt';
import TradeConfirmationError from './components/QuoteSwap/Product-107/TradeConfirmationError';
import ReviewOrder from './components/Orders/ReviewOrder';
import Disclaimer from './containers/Disclaimer';
import ProfitabilityMatrix from './containers/ProfitabilityMatrix';
import TradeReceipt from './components/Orders/TradeReceipt';
import WhatToday from './containers/QuoteSwap/OrderMenu';
import ProductBenefits from './containers/QuoteSwap/ProductBenefits';
import SelectContractMonth from './containers/QuoteSwap/SelectContractMonth';
import SelectQuantity from './containers/QuoteSwap/SelectQuantity';
import SuggestedQuote from './components/QuoteSwap/SuggestedQuote/SuggestedQuote';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='auth' type={ActionConst.RESET} initial>
        <Scene hideNavBar key='app' type={ActionConst.RESET} component={App} initial />
      </Scene>
      <Scene key='main' type={ActionConst.RESET} >
        <Scene hideNavBar key='dashboard' component={DashBoard} type={ActionConst.RESET} />
        <Scene hideNavBar key='orders' component={Orders} type={ActionConst.RESET} />
        <Scene hideNavBar key='cancelorder' component={CancelOrder} type={ActionConst.RESET} />
        <Scene hideNavBar key='openposition' component={OpenPositions} type={ActionConst.RESET} />
        <Scene hideNavBar key='cancelorderreceipt' component={CancelOrderReceipt} type={ActionConst.RESET} />
        <Scene hideNavBar key='myfarm' component={MyFarm} type={ActionConst.RESET} />
        <Scene hideNavBar key='externalsales' component={ExternalSales} type={ActionConst.RESET} />
        <Scene hideNavBar key='quoteswap' component={QuoteSwap} type={ActionConst.RESET} />
        <Scene hideNavBar key="chartApp" component={ChartApp} type={ActionConst.RESET} />
        <Scene hideNavBar key='revieworder' component={ReviewOrder} />
        <Scene hideNavBar key='tcorderreceipt' component={TradeConfirmationOrderReceipt} type={ActionConst.RESET} />
        <Scene hideNavBar key='tcerror' component={TradeConfirmationError} type={ActionConst.RESET} />
        <Scene hideNavBar key='disclaimer' component={Disclaimer} />
        <Scene hideNavBar key="matrix" component={ProfitabilityMatrix} type={ActionConst.RESET} />
        <Scene hideNavBar key="pdfview" component={TradeReceipt} />
        <Scene hideNavBar key="whatToday" component={WhatToday} type={ActionConst.RESET} />
        <Scene hideNavBar key="productBenefits" component={ProductBenefits} type={ActionConst.RESET} />
        <Scene hideNavBar key="selectContractMonth" component={SelectContractMonth} type={ActionConst.RESET} />
        <Scene hideNavBar key="selectQuantity" component={SelectQuantity} />
        <Scene hideNavBar key='suggestedQuote'component={SuggestedQuote} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
