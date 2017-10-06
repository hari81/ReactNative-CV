import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import ProductType from '../../components/QuoteSwap/ProductsList/ProductType';
import TradeDirection from '../../components/QuoteSwap/TradeDirection';
import BushelQuantity from '../../components/QuoteSwap/BushelQuantity';
import OrderType from '../../components/QuoteSwap/OrderType/OrderType';
import BidAskPrice from '../../components/QuoteSwap/BidAskPrice';
import ContractMonth from '../../components/QuoteSwap/ContractMonth/ContractMonth';
import { Button } from '../../components/common/Button';
import { Spinner } from '../../components/common/Spinner';
import { getReviewOrderQuote } from '../../redux/actions/OrdersAction/ReviewOrder';
import { bushelQuantityLimit } from '../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';

class SetOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riskProductId: 107,
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
            quantityLimit: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.contractMonth.spinFlag && this.state.selectedContractMonth === null && nextProps.contractMonth != null && nextProps.contractMonth.contract !== '') {
            const cmonth = nextProps.contractMonth.contract[0];
            this.onSelectContractMonth(cmonth);
            this.setState({ underlying: cmonth.underlying });
            this.setState({ expirationDate: cmonth.lastTradeDate });            
        }
    }

    onSelectContractMonth(contractMonth) {
        this.setState({ selectedContractMonth: contractMonth });        
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

    orderDetails = (id) => {
        this.setState({ riskProductId: id });
    }

    render() {
        //console.log(this.state)
        let spinner = null;
        if (this.props.contractMonth.spinFlag) {
            spinner = (<Spinner size="small" />);
        } else {
            spinner = (<View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', marginLeft: 49 }}>
                        <ProductType onProductChange={this.orderDetails} />
                        <TradeDirection buySell={this.state.buySell} onTradeChange={this.tradeDirectionChange.bind(this)} />
                        <ContractMonth 
                            onSelectContractMonth={this.onSelectContractMonth.bind(this)} 
                            selectedContractMonth={this.state.selectedContractMonth} 
                        />
                    </View>
                    <View style={{ height: 364, width: 1, marginLeft: 30, marginTop: 20, backgroundColor: 'rgb(127,143,164)' }} />
                    <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
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
                            />
                        </KeyboardAwareScrollView>
                        <BidAskPrice contractData={this.props.contractMonth} selectedContractMonth={this.state.selectedContractMonth} />
                        <View style={{ flexDirection: 'row', marginLeft: 126, position: 'absolute', marginTop: 320 }}>
                            <Button onPress={() => Actions.dashboard()} buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}>CANCEL</Button>
                            <Button onPress={this.onReviewOrder.bind(this)} buttonStyle={[styles.buttonStyle, { backgroundColor: 'rgb(39,153,137)', marginLeft: 28 }]} textStyle={[styles.textStyle, { color: '#fff' }]}>REVIEW ORDER</Button>
                        </View>
                    </View>

                </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.setOrderDetails}>
                    <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Medium', color: 'rgb(231,181,20)', paddingLeft: 21 }}>Set Order Details</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 610 }}>
                        <TouchableOpacity onPress={() => Actions.disclaimer()}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.questionIcon}>?</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: '#fff', textDecorationLine: 'underline', marginLeft: 5 }}>Need Help with this Product?</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {spinner}
            </View>
        );
    }
}
const styles = {
    container: { height: 452, width: 992, backgroundColor: 'rgb(61,76,87)', marginHorizontal: 16, marginTop: 38, marginBottom: 7, borderTopWidth: 4, borderTopColor: '#e7b514' },
    setOrderDetails: { flexDirection: 'row', height: 47, width: 990, borderBottomWidth: 1, borderColor: 'rgb(231,181,20)', alignItems: 'center' },
    textStyle: { color: 'rgb(159,169,186)', fontSize: 18, fontFamily: 'HelveticaNeue' },
    buttonStyle: { marginTop: 24, width: 164, height: 40, backgroundColor: 'rgb(255,255,255)', borderRadius: 4, borderWidth: 1, borderColor: 'rgb(159,169,186)', justifyContent: 'center', alignItems: 'center', },
    questionIcon: { fontSize: 10, fontFamily: 'HelveticaNeue', color: '#fff', width: 16, borderRadius: 8, borderWidth: 1, borderColor: '#fff', paddingLeft: 5.5, paddingTop: 1 }    
};

const mapStateToProps = (state) => {
    const code = state.cropsButtons.selectedId;
    const crop = state.account.defaultAccount.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)));
    const tTick = crop[0].tickSizeIncrement === null || crop[0].tickSizeIncrement === undefined ? '0' : crop[0].tickSizeIncrement.toString();
    const tBQL = state.selectedContractMonth.bushelQuantity === null ? 0 : Math.round(state.selectedContractMonth.bushelQuantity.shortLimitAvailable);
    const tQty = crop[0].quantityIncrement === null ? '0' : crop[0].quantityIncrement.toString();

    return {
        MyFarmProd: state.dashBoardButtons,
        infoState: state.info,
        underlyingSym: state.selectedContractMonth,
        limitOrderData: state.limitOrder,
        contractMonth: state.contractData,
        tickSizeIncrement: tTick,
        quantityIncrement: tQty,
        bushelLimit: tBQL
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            bushelQuantityLimit,
            getReviewOrderQuote
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderDetails);
