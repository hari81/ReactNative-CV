import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    onReviewOrder() {
        const data = {
            riskProductId: 107,
            orderType: 'limit',
            quoteType: 'new',
            quantity: 10000,
            buySell: 'S',
            underlying: 'SH2018',
            expirationDate: '2018-10-31',
            notes: '',
            targetPrice: 5.0,
            goodTilDate: '2017-12-31'            
        }
        this.props.getReviewOrderQuote(data);
    }

    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <View style={styles.setOrderDetails}>
                    <Text style={{ fontSize: 20, fontFamily: 'HelveticaNeue-Medium', color: 'rgb(231,181,20)', paddingLeft: 21}}>Set Order Details</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 630 }}>
                        <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>Need Help with this Product?</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', marginLeft: 49 }}>
                        <ProductType />
                        <TradeDirection />


                    </View>
                    <View style={{ height: 364, width: 1, marginLeft: 40, marginTop: 20, backgroundColor: 'rgb(127,143,164)' }} />
                    <View style={{ flexDirection: 'column', marginLeft: 33 }}>
                        <BushelQuantity />
                        <OrderType />
                        <BidAskPrice />
                        <View style={{ flexDirection: 'row', marginLeft: 132, position: 'absolute', marginTop: 320 }}>
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
    return { MyFarmProd: state.dashBoardButtons,
        infoState: state.info
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
