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
import productTypes from './QuoteSwap/ProductType/ProductType';
import selectcontractMonth from './QuoteSwap/ContractMonth/ContractMonthSelect';
import contractMonth from './QuoteSwap/ContractMonth/ContractMonthData';
import cropsButton from './CropButtons/ButtonReducer';
import selectedProduct from './QuoteSwap/ProductType/SelectedProduct';

export default combineReducers({
    auth: AuthReducer,
    vieworder: vieworders,
    openPositions: OpenPositions,
    closedPositions: ClosedPositions,
    dashBoardButtons: allCrops,
    info: infoButtons,
    cropsButtons: cropsButton,
    myFar: myFarmButtons,
    external: externalTrades,
    products: productTypes,
    selectedContractMonth: selectcontractMonth,
    contractData: contractMonth,
    selectedProductQuoteSwap: selectedProduct,
    account: accountDetails
});
