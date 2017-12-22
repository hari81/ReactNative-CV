import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Dimensions, Linking } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import TradeDirection from '../../../components/QuoteSwap/Product-107/TradeDirection';
import BushelQuantity from '../../../components/QuoteSwap/Product-107/BushelQuantity';
import OrderType from '../../../components/QuoteSwap/Product-107/OrderType/OrderType';
import BidAskPrice from '../../../components/QuoteSwap/Product-107/BidAskPrice';
import ContractMonth from '../../../components/QuoteSwap/Product-107/ContractMonth';
import { Spinner } from '../../../components/common/Spinner';
import { getReviewOrderQuote } from '../../../redux/actions/OrdersAction/ReviewOrder';
import { bushelQuantityLimit } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import { dashBoardDataFetch } from '../../../redux/actions/Dashboard/DashboardAction';
import { URL_HOW_TO_VIDEO_PLACEORDER } from '../../../ServiceURLS/index';
import * as common from '../../../Utils/common';
import * as cStyles from '../../../Utils/styles';
import bugsnag from '../../../components/common/BugSnag';

const { height, width } = Dimensions.get('window');

class SetOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riskProductId: 107,
            productName: common.translateProductId(107, this.props.products),
            quoteType: 'new',
            orderType: 'market',
            targetPrice: '',
            goodTilDate: '',
            quantity: '0',
            buySell: 'S',
            underlying: '',
            expirationDate: '',
            notes: '',
            selectedContractMonth: null,
            quantityLimit: 0,
            isRefreshPrices: false,
            isReviewEnabled: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.contractMonth.spinFlag && this.state.selectedContractMonth === null && nextProps.contractMonth != null && common.isValueExists(nextProps.contractMonth.contract)) {
            const cmonth = nextProps.contractMonth.contract[0];
            this.onSelectContractMonth(cmonth);
        } else {
            if (this.state.selectedContractMonth !== null && common.isValueExists(nextProps.contractMonth) && common.isValueExists(nextProps.contractMonth.contract)) {
                const sm = nextProps.contractMonth.contract.find(x => x.underlying === this.state.selectedContractMonth.underlying);
                //if we can't find a match, a new crop/contract/month has been selected (so set it and forget it)
                if (sm === undefined || sm === null) {
                    const cm = nextProps.contractMonth.contract[0];
                    this.onSelectContractMonth(cm);
                    if (cm.cropYear !== this.state.selectedContractMonth.cropYear || cm.cropCode !== this.state.selectedContractMonth.cropCode) {
                        this.setState({ quantity: 0 });
                    }
                } else if (this.state.isRefreshPrices) {
                    this.setState({ isRefreshPrices: false });            
                    this.onSelectContractMonth(sm);
                }
            }
        }
    }

    onSelectContractMonth(contractMonth) {
        this.setState({ selectedContractMonth: contractMonth });       
        this.setState({ underlying: contractMonth.underlying });
        this.setState({ expirationDate: common.getExpDate(contractMonth) });
        this.setState({ targetPrice: common.getLimitPrice(contractMonth, this.state.buySell) });
        this.setState({ goodTilDate: common.getExpDate(contractMonth) });
    }

    onRefreshPrices() {
        this.setState({ isRefreshPrices: true });
    }

    onQuantityChange(quant) {
        this.setState({ quantity: quant });
    }

    onOrderTypeChange(type) {
        this.setState({ orderType: type });
    }

    onLimitPriceChange(limitPrice) {
        this.setState({ targetPrice: limitPrice });
    }

    onExpiryDateChange(goodTillDate) {
        this.setState({ goodTilDate: goodTillDate });
    }

    onReviewOrder() {
        try {
            if (this.state.quantity === '' || parseFloat(this.state.quantity) < 1) {
                Alert.alert('Set Order Details', 'A quantity of 1 or greater must be entered.');
            } else {
                this.props.getReviewOrderQuote(this.state);
            }
        } catch (error) {
            Alert.alert(`Unexpected error occurred: ${error}`);
        }
    }

    tradeDirectionChange(tradeDirection) {
        this.setState({ buySell: tradeDirection });
    }

    onScrollUpdate() {
        this.refs.scrollView.scrollTo({ x: 0, y: 140, animated: true });
    }

    onScrollDown() {
        this.refs.scrollView.scrollToEnd();
    }

    onCancel() {
        this.props.dashBoardDataFetch(this.state.selectedContractMonth.cropYear, this.state.selectedContractMonth.cropCode);
        Actions.dashboard();
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);

            let spinner = null;
            if (this.props.contractMonth.spinFlag) {
                spinner = <Spinner size="small" />;
            } else {
                if (!common.isValueExists(this.props.contractMonth.contract)) {
                    spinner = <View style={{ display: 'none' }} />;
                } else {
                    spinner = (<View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', marginLeft: 49 }}>
                                <Text style={{ marginTop: 15, color: '#fff', fontSize: 16, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>PRODUCT</Text>
                                <View style={styles.disabledDataContainer}>
                                    <Text style={styles.disabledData}>{this.state.productName}</Text>
                                </View>
                                <TradeDirection buySell={this.state.buySell} onTradeChange={this.tradeDirectionChange.bind(this)} />
                                <ContractMonth
                                    onSelectContractMonth={this.onSelectContractMonth.bind(this)}
                                    onRefreshPrices={this.onRefreshPrices.bind(this)}
                                    selectedContractMonth={this.state.selectedContractMonth}
                                />
                            </View>
                            <View style={{ height: 364, width: 1, marginLeft: 30, marginTop: 20, backgroundColor: '#7f8fa4' }} />
                            <ScrollView ref='scrollView' keyboardDismissMode='interactive' keyboardShouldPersistTaps='never'>
                                <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                                    <BushelQuantity
                                        buySell={this.state.buySell}
                                        onQuantityChange={this.onQuantityChange.bind(this)}
                                        quantity={this.state.quantity}
                                        quantityIncrement={this.props.quantityIncrement}
                                        quantityLimit={this.props.bushelLimit}
                                    />
                                    <OrderType
                                        buySell={this.state.buySell}
                                        limitPrice={this.state.targetPrice}
                                        onOrderTypeChange={this.onOrderTypeChange.bind(this)}
                                        onExpiryDateChange={this.onExpiryDateChange.bind(this)}
                                        onLimitPriceChange={this.onLimitPriceChange.bind(this)}
                                        selectedContractMonth={this.state.selectedContractMonth}
                                        tickSizeIncrement={this.props.tickSizeIncrement}
                                        onScrollUpdate={this.onScrollUpdate.bind(this)}
                                        onScrollDown={this.onScrollDown.bind(this)}
                                    />
                                    <BidAskPrice contractData={this.props.contractMonth} selectedContractMonth={this.state.selectedContractMonth} />
                                    <View style={{ flexDirection: 'row', marginLeft: 145 }}>
                                        <TouchableOpacity onPress={this.onCancel.bind(this)} style={[cStyles.common.touchButtonCancel, { marginRight: 15 }]}>
                                            <Text style={cStyles.common.touchButtonCancelText}>CANCEL</Text>
                                        </TouchableOpacity>    
                                        <TouchableOpacity 
                                            onPress={this.onReviewOrder.bind(this)}
                                            style={[cStyles.common.touchButton, this.props.isReviewEnabled ? cStyles.common.touchButtonEnabled : cStyles.common.touchButtonDisabled]}
                                            disabled={!this.props.isReviewEnabled}
                                        >
                                            <Text style={[cStyles.common.touchButtonText, this.props.isReviewEnabled ? cStyles.common.touchButtonTextEnabled : cStyles.common.touchButtonTextDisabled]}>REVIEW ORDER</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    );
                }
            }
            return (
                <View style={styles.container}>
                    <View style={styles.setOrderDetails}>
                        <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Medium', color: '#e7b514', paddingLeft: width * 0.02 }}>Set Order Details</Text>
                        <View style={{ flexDirection: 'row', marginLeft: width * 0.58 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={() => Linking.openURL(URL_HOW_TO_VIDEO_PLACEORDER)}>
                                    <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: '#fff', textDecorationLine: 'underline', marginLeft: 5 }}>How To Video</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Actions.disclaimer({ productId: this.state.riskProductId })}>
                                    <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: '#fff', textDecorationLine: 'underline', marginLeft: 20 }}>Terminology</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    {spinner}
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const styles = {
    container: { height: height * 0.588, width: width * 0.968, backgroundColor: '#3d4c57', marginHorizontal: width * 0.0156, marginTop: height * 0.0494, marginBottom: height * 0.0091, borderColor: '#bed8dd', borderWidth: 1, },
    setOrderDetails: { flexDirection: 'row', height: height * 0.0611, width: width * 0.966, borderBottomWidth: 1, borderColor: '#e7b514', alignItems: 'center' },
    textStyle: { color: '#9fa9ba', fontSize: 18, fontFamily: 'HelveticaNeue' },
    buttonStyle: { height: height * 0.052, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#9fa9ba', justifyContent: 'center', alignItems: 'center' },
    questionIcon: { fontSize: 10, fontFamily: 'HelveticaNeue', color: '#fff', width: 16, borderRadius: 8, borderWidth: 1, borderColor: '#fff', paddingLeft: 5.5, paddingTop: 1 },
    disabledDataContainer: { marginBottom: 15, backgroundColor: '#ffffff80', borderRadius: 4, height: 40, width: 250, paddingLeft: 15, paddingTop: 10 },
    disabledData: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#00000065' },
};

const mapStateToProps = (state) => {
    const code = state.cropsButtons.selectedId;
    const crop = state.account.defaultAccount.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)));
    const tTick = crop[0].tickSizeIncrement === null || crop[0].tickSizeIncrement === undefined ? '0' : crop[0].tickSizeIncrement.toString();
    const tBQL = (state.selectedContractMonth.bushelQuantity === null || !common.isValueExists(state.selectedContractMonth.bushelQuantity.shortLimitAvailable)) ? 0 : Math.round(state.selectedContractMonth.bushelQuantity.shortLimitAvailable);
    const tQty = crop[0].quantityIncrement === null ? '0' : crop[0].quantityIncrement.toString();
    const isReviewSpinInactive = common.isValueExists(state.reviewQuote) ? !state.reviewQuote.reviewSpinFlag : true;

    return {
        products: state.products,
        MyFarmProd: state.dashBoardButtons,
        limitOrderData: state.limitOrder,
        contractMonth: state.contractData,
        tickSizeIncrement: tTick,
        quantityIncrement: tQty,
        bushelLimit: tBQL,
        acc: state.account,
        isReviewEnabled: isReviewSpinInactive
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            bushelQuantityLimit,
            getReviewOrderQuote,
            dashBoardDataFetch
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderDetails);
