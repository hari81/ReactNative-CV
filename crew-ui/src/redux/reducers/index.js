import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import vieworders from './OrdersReducer/ViewOrdersReducer';
import OpenPositions from './OrdersReducer/OpenPositions';
import ClosedPositions from './OrdersReducer/ClosedPositions';
import allCrops from './Dashboard/DashButtonsReducer';
import myFarmButtons from './MyFarm/CropReducer';
import externalTrades from './External/ExternalTrades';
import infoButtons from './Dashboard/infobuttonsReducer';
import accountDetails from './AccountInfo/AccountInfoReducer';
//import selectId from './Dashboard/SelectId';
//import cropButton from './Dashboard/CropButtons';
import productTypes from './QuoteSwap/ProductType/ProductType';
import selectcontractMonth from './QuoteSwap/ContractMonth/ContractMonthSelect';
import contractMonth from './QuoteSwap/ContractMonth/ContractMonthData';
import cropsButton from './CropButtons/ButtonReducer';
import selectedProduct from './QuoteSwap/ProductType/SelectedProduct';
import reviewOrderGetQuote from './OrdersReducer/ReviewOrder';

export default combineReducers({
    auth: AuthReducer,
    vieworder: vieworders,
    openPositions: OpenPositions,
    closedPositions: ClosedPositions,
    dashBoardButtons: allCrops,
    info: infoButtons,
   // cropButtons: cropButton,
    cropsButtons: cropsButton,
   // selectedId: selectId,
    myFar: myFarmButtons,
    external: externalTrades,
    products: productTypes,
    selectedContractMonth: selectcontractMonth,
    contractData: contractMonth,
    selectedProductQuoteSwap: selectedProduct,
    account: accountDetails,
    reviewQuote: reviewOrderGetQuote
    
});

