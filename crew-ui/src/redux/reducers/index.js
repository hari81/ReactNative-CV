import { combineReducers } from 'redux';
import { CLEAR_APPLICATION_STATE } from '../actions/types';
import AuthReducer from './AuthReducer';
import vieworders from './OrdersReducer/ViewOrdersReducer';
import OpenPositions from './OrdersReducer/OpenPositions';
import ClosedPositions from './OrdersReducer/ClosedPositions';
import myFarmButtons from './MyFarm/CropReducer';
import externalTrades from './External/ExternalTrades';
import accountDetails from './AccountInfo/AccountInfoReducer';
import productTypes from './QuoteSwap/ProductType/ProductType';
import selectcontractMonth from './QuoteSwap/ContractMonth/ContractMonthSelect';
import contractMonth from './QuoteSwap/ContractMonth/ContractMonthData';
import cropsButton from './CropButtons/ButtonReducer';
import selectedProduct from './QuoteSwap/ProductType/SelectedProduct';
import reviewOrderGetQuote from './OrdersReducer/ReviewOrder';
import limitorder from './QuoteSwap/ProductType/LimitOrderReducer';
import getDashBoardData from './Dashboard/DashboardReducer';
import getDisplayProps from './Dashboard/DisplayPropertiesReducer';
import getMatrixData from './ProfitabilityMatrixReducer';
import SugQuote from './QuoteSwap/SuggestedQuote';
import EstProfit from './QuoteSwap/EstimateProfitReducer';

const appReducer = combineReducers({
    auth: AuthReducer,
    vieworder: vieworders,
    openPositions: OpenPositions,
    closedPositions: ClosedPositions,
    cropsButtons: cropsButton,
    myFar: myFarmButtons,
    external: externalTrades,
    products: productTypes,
    selectedContractMonth: selectcontractMonth,
    contractData: contractMonth,
    selectedProductQuoteSwap: selectedProduct,
    eProfit: EstProfit,
    account: accountDetails,
    reviewQuote: reviewOrderGetQuote,
    limitOrder: limitorder,
    dashBoardData: getDashBoardData,
    displayProperties: getDisplayProps,
    matrixData: getMatrixData,
    optimalQuote: SugQuote
});
const rootReducer = (state, action) => {
    if (action.type === CLEAR_APPLICATION_STATE) {
        state = undefined;
    }
    return appReducer(state, action);
}
export { rootReducer };
