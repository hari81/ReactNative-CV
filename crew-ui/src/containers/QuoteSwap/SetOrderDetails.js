import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import ProductType from '../../components/QuoteSwap/ProductsList/ProductType';
import TradeDirection from '../../components/QuoteSwap/TradeDirection';
import BushelQuantity from '../../components/QuoteSwap/BushelQuantity';
import OrderType from '../../components/QuoteSwap/OrderType/OrderType';
import BidAskPrice from '../../components/QuoteSwap/BidAskPrice';
import ContractMonth from '../../components/QuoteSwap/ContractMonth/ContractMonth';
import { Button } from '../../components/common/Button';
import { getReviewOrderQuote } from '../../redux/actions/OrdersAction/ReviewOrder';

class SetOrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riskProductId: 107,
            quoteType: 'new',
            orderType: 'market',
            targetPrice: 0,
            goodTilDate: '',
            quantity: 0,
            buySell: 'S',
            underlying: '',
            expirationDate: '',
            notes: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ underlying: nextProps.underlyingSym.underlyingSymbol });
        this.setState({ expirationDate: nextProps.underlyingSym.lastTradeDate });
        this.setState({ targetPrice: nextProps.underlyingSym.bidprice });
        this.setState({ goodTilDate: nextProps.underlyingSym.lastTradeDate });
    }

    onQuantityChange = (quant) => {
        this.setState({ quantity: quant });
    }
    onOrderTypeChange=(type, targetPrice) => {
        this.setState({ orderType: type, targetPrice });
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
        return (
            <View style={styles.container}>
                <View style={styles.setOrderDetails}>
                    <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Medium', color: 'rgb(231,181,20)', paddingLeft: 21 }}>Set Order Details</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 630 }}>
                        <TouchableOpacity onPress={() => Actions.disclaimer()}>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>Need Help with this Product?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', marginLeft: 49 }}>
                        <ProductType onProductChange={this.orderDetails} />
                        <TradeDirection onTradeChange={this.tradeDirectionChange} />
                        <ContractMonth />
                    </View>
                    <View style={{ height: 364, width: 1, marginLeft: 40, marginTop: 20, backgroundColor: 'rgb(127,143,164)' }} />
                    <View style={{ flexDirection: 'column', marginLeft: 33 }}>
                        <BushelQuantity onQuantityChange={this.onQuantityChange} />
                        <OrderType onOrderTypeChange={this.onOrderTypeChange} onExpireSelection={this.onExpireSelection} />
                        <BidAskPrice />
                        <View style={{ flexDirection: 'row', marginLeft: 132, position: 'absolute', marginTop: 320, zIndex: -1 }}>
                            <Button buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}>CANCEL</Button>
                            <Button onPress={this.onReviewOrder.bind(this)} buttonStyle={[styles.buttonStyle, { backgroundColor: 'rgb(39,153,137)', marginLeft: 28 }]} textStyle={[styles.textStyle, { color: 'rgb(255,255,255)' }]}>REVIEW ORDER</Button>
                        </View>
                    </View>
                </View>
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
    messageBox: {
        position: 'absolute',
        marginTop: 14,
        width: 260,
        height: 140,
        borderColor: 'rgb(221,221,221)',
        borderWidth: 2,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 3,
    },
    triangle: {
        position: 'absolute',
        marginTop: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: 'rgb(221,221,221)',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgb(221,221,221)',

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
        zIndex: -1
    }
};

const mapStateToProps = (state) => {
    return {
        MyFarmProd: state.dashBoardButtons,
        infoState: state.info,
        underlyingSym: state.selectedContractMonth,
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
