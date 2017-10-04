import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import ProductType from '../../components/QuoteSwap/ProductsList/ProductType';
import TradeDirection from '../../components/QuoteSwap/TradeDirection';
import BushelQuantity from '../../components/QuoteSwap/BushelQuantity';
import OrderType from '../../components/QuoteSwap/OrderType/OrderType';
import BidAskPrice from '../../components/QuoteSwap/BidAskPrice';
import ContractMonth from '../../components/QuoteSwap/ContractMonth/ContractMonth';
import { Button } from '../../components/common/Button';
import { Spinner } from '../../components/common/Spinner';
import { getReviewOrderQuote } from '../../redux/actions/OrdersAction/ReviewOrder';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height, width } = Dimensions.get('window');

class SetOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riskProductId: 107,
            quoteType: 'new',
            orderType: 'market',
            targetPrice: props.underlyingSym.bidprice,
            goodTilDate: props.underlyingSym.lastTradeDate,
            quantity: '0',
            buySell: 'S',
            underlying: '',
            expirationDate: '',
            notes: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ underlying: nextProps.underlyingSym.underlyingSymbol });
        this.setState({ expirationDate: nextProps.underlyingSym.lastTradeDate });
        this.setState({ targetPrice: nextProps.limitOrderData.limitPrice });
        this.setState({ goodTilDate: nextProps.limitOrderData.orderExpire });
    }
    tradeDirectionChange=(tradeDirection) => {
        this.setState({ buySell: tradeDirection });
    }

    onQuantityChange = (quant) => {
        this.setState({ quantity: quant });
    }
    onOrderTypeChange=(type) => {
        this.setState({ orderType: type });
    }

    onExpireSelection=(goodTillDate) => {
        this.setState({ goodTilDate: goodTillDate });
    }
    onReviewOrder() {
        try {
            this.props.getReviewOrderQuote(this.state);
        } catch (error) {
            Alert.alert(`Unexpected error occurred: ${error}`);
        }
    }

    tradeDirectionChange=(tradeDirection) => {
        this.setState({ buySell: tradeDirection });
    }

    orderDetails = (id) => {
        this.setState({ riskProductId: id });
    }

    render() {
        //console.log(this.state)
        let spinner = null;
        if (this.props.contractMonth.spinFlag) {
            spinner = (
                <Spinner size="small" />
            );
        } else {
           spinner = (<View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'column', marginLeft: width * 0.0478 }}>
                    <ProductType onProductChange={this.orderDetails} />
                    <TradeDirection onTradeChange={this.tradeDirectionChange} />
                    <ContractMonth />
                </View>
                <View style={{ height: height * 0.355, width: 1, marginLeft: width * 0.029, marginTop: height * 0.026, backgroundColor: 'rgb(127,143,164)' }} />
                <View style={{ flexDirection: 'column', marginLeft: width * 0.029 }}>
                    <KeyboardAwareScrollView keyboardShouldPersistTaps="always" extraScrollHeight={4}>
                    <BushelQuantity onQuantityChange={this.onQuantityChange} />
                    <OrderType onOrderTypeChange={this.onOrderTypeChange} />
                    </KeyboardAwareScrollView>
                    <BidAskPrice />
                    <View style={{ flexDirection: 'row', marginLeft: width * 0.123, position: 'absolute', marginTop: height * 0.417 }}>
                        <Button onPress={() => Actions.dashboard()} buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}>CANCEL</Button>
                        <Button onPress={this.onReviewOrder.bind(this)} buttonStyle={[styles.buttonStyle, { backgroundColor: 'rgb(39,153,137)', marginLeft: width * 0.0273 }]} textStyle={[styles.textStyle, { color: 'rgb(255,255,255)' }]}>REVIEW ORDER</Button>
                    </View>
                </View>
            </View>
           );
        }
        return (
            <View style={styles.container}>
                <View style={styles.setOrderDetails}>
                    <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Medium', color: 'rgb(231,181,20)', paddingLeft: width * 0.02 }}>Set Order Details</Text>
                    <View style={{ flexDirection: 'row', marginLeft: width * 0.615 }}>
                        <TouchableOpacity onPress={() => Actions.disclaimer()}>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)', textDecorationLine: 'underline' }}>Need Help with this Product?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {spinner}
            </View>
        );
    }
}
const styles = {
    container: {
        height: height * 0.588,
        width: width * 0.968,
        backgroundColor: 'rgb(61,76,87)',
        marginHorizontal: width * 0.0156,
        marginTop: height * 0.0494,
        marginBottom: height * 0.0091,
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1,

    },
    setOrderDetails: {
        flexDirection: 'row',
        height: height * 0.0611,
        width: width * 0.966,
        borderBottomWidth: 1,
        borderColor: 'rgb(231,181,20)',
        alignItems: 'center'
    },
    textStyle: {
        color: 'rgb(159,169,186)',
        fontSize: 18,
        fontFamily: 'HelveticaNeue'
    },
    buttonStyle: {
        marginTop: height * 0.03125,
        width: width * 0.16,
        height: height * 0.052,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgb(159,169,186)',
        justifyContent: 'center',
        alignItems: 'center',
    }
};

const mapStateToProps = (state) => {
    return {
        MyFarmProd: state.dashBoardButtons,
        infoState: state.info,
        underlyingSym: state.selectedContractMonth,
        limitOrderData: state.limitOrder,
        contractMonth: state.contractData
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getReviewOrderQuote
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SetOrderDetails);
