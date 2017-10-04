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
            //Actions.revieworder
        } catch (error) {
            Alert.alert(`Unexpected error occurred: ${error}`);
        }
    }

    tradeDirectionChange=(tradeDirection) => {
        this.setState({ buySell: tradeDirection });
    }

    orderDetails = (id) => {
        this.setState({ riskProductId: id });
    };

   /* scrollUpdate() {
        this.refs.scrollView.scrollTo({ x: 0, y: 100, animated: true });
    };
    scrollDown() {
        this.refs.scrollView.scrollToEnd();
    }*/


    render() {
        //console.log(this.state)
        let spinner = null;
        if (this.props.contractMonth.spinFlag) {
            spinner = (<Spinner size="small" />);
        } else {
            spinner = (<View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', marginLeft: 49 }}>
                        <ProductType onProductChange={this.orderDetails} />
                        <TradeDirection buySell={this.state.buySell} onTradeChange={this.tradeDirectionChange} />
                        <ContractMonth buySell={this.state.buySell} />
                    </View>
                    <View style={{ height: 364, width: 1, marginLeft: 30, marginTop: 20, backgroundColor: 'rgb(127,143,164)' }} />
                    <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">

                            <BushelQuantity buySell={this.state.buySell} onQuantityChange={this.onQuantityChange} />
                            <OrderType buySell={this.state.buySell} onOrderTypeChange={this.onOrderTypeChange} />

                        </KeyboardAwareScrollView>
                        <BidAskPrice />
                        <View style={{ flexDirection: 'row', marginLeft: 126, position: 'absolute', marginTop: 320 }}>
                            <Button onPress={() => Actions.dashboard()} buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}>CANCEL</Button>
                            <Button onPress={this.onReviewOrder.bind(this)} buttonStyle={[styles.buttonStyle, { backgroundColor: 'rgb(39,153,137)', marginLeft: 28 }]} textStyle={[styles.textStyle, { color: 'rgb(255,255,255)' }]}>REVIEW ORDER</Button>
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
    container: {
        height: 452,
        width: 992,
        backgroundColor: 'rgb(61,76,87)',
        marginHorizontal: 16,
        marginTop: 38,
        marginBottom: 7,
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1,
    },
    setOrderDetails: {
        flexDirection: 'row',
        height: 47,
        width: 990,
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
        marginTop: 24,
        width: 164,
        height: 40,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgb(159,169,186)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionIcon: { fontSize: 10, fontFamily: 'HelveticaNeue', color: '#fff', width: 16, borderRadius: 8, borderWidth: 1, borderColor: '#fff', paddingLeft: 5.5, paddingTop: 1 }    
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