import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import moment from 'moment';
import * as common from '../../Utils/common';
import OrderType from '../../components/QuoteSwap/OrderType/OrderType';
import BidAskPrice from '../../components/QuoteSwap/BidAskPrice';
import Refresh from '../../components/common/img/Refresh.png';
import { Button } from '../../components/common/Button';
import { getReviewOrderQuote } from '../../redux/actions/OrdersAction/ReviewOrder';
import { quoteSwapUnderlying } from '../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';

class UpdateOrderDetails extends Component {
    constructor(props) {
        super(props);
        const sOrder = this.props.selectedOrder;
        const uObject = common.createUnderlyingObject(sOrder.underlying);
        this.state = {
            reviewOrderDisabled: false,
            orderTitle: 'Close Position',
            riskProductId: sOrder.riskProductId,
            productName: common.translateProductId(sOrder.riskProductId, this.props.products),
            quoteType: sOrder.quoteType,
            orderType: sOrder.orderType,
            quantity: sOrder.quantity,
            buySell: sOrder.buysell === 'B' ? 'Buy' : 'Sell',
            isBuy: sOrder.buysell === 'B',
            underlying: sOrder.underlying,
            expirationDate: sOrder.expirationDate,
            netPremium: sOrder.netPremium,
            goodTilDate: sOrder.goodTilDate,
            targetPrice: sOrder.targetPrice,
            underlyingObject: uObject,
            notes: '',
            timeNow: moment().format('MMM Do YYYY, h:mm a'),
            contractBidAskPrice: 0,
            transId: sOrder.transId,
            activityId: sOrder.activityId
        };
    }
    
    componentDidMount() {
        this.setState({ reviewOrderDisabled: false });
    }

    componentWillReceiveProps() {
        this.setState({ timeNow: moment().format('MMM Do YYYY, h:mm a') });
    }
        
    onOrderTypeChange(type, targetPrice) {
        if (targetPrice !== undefined && (typeof (targetPrice) === typeof (this.state.targetPrice))) {
            this.setState({ orderType: type, targetPrice });
        } else { 
            this.setState({ orderType: type }); 
        }
    }

    onExpireSelection(goodTillDate) {
        this.setState({ goodTilDate: goodTillDate });
    }

    onRefreshBidAsk() {
        const { cropYear, cropCode } = this.props.contractMonth.contract[0];
        this.props.quoteSwapUnderlying(cropYear, cropCode);
        this.setState({ contractBidAskPrice: 1 });   
    }

    onReviewOrder() {
        try {
            this.props.getReviewOrderQuote(this.state);
        } catch (error) {            
            Alert.alert(`Unexpected error occurred: ${error}`);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.setOrderDetails}>
                    <Text style={styles.orderTitle}>{this.state.orderTitle}</Text>                    
                    <View style={{ flexDirection: 'row', marginLeft: 630 }}>
                        <TouchableOpacity onPress={() => Actions.disclaimer()}>
                            <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: '#fff' }}>Need Help with this Product?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingLeft: 50, paddingTop: 15, paddingRight: 50, paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', width: 340 }}>
                            {/* product */}
                            <Text style={styles.disabledLabel}>PRODUCT</Text>
                            <View style={styles.disabledDataContainer}>
                                <Text style={styles.disabledData}>{this.state.productName}</Text>
                            </View>
                            {/* trade direction */}
                            <Text style={styles.disabledLabel}>TRADE DIRECTION</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <View style={styles.radioButtonContainer}>
                                    {this.state.isBuy ? <View style={styles.radioButtonSelected} /> : null}
                                </View>
                                <Text style={styles.radioButtonText}>Sell</Text>
                                <View style={[styles.radioButtonContainer, { marginLeft: 40 }]}>
                                    {!this.state.isBuy ? <View style={styles.radioButtonSelected} /> : null}
                                </View>
                                <Text style={styles.radioButtonText}>Buy</Text>
                            </View>
                            {/* contract month */}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.disabledLabel}>CONTRACT MONTH</Text>
                                <TouchableOpacity disabled={!this.props.contractMonth.contract[0]} onPress={this.onRefreshBidAsk.bind(this, this.state.timeNow)}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={styles.refreshImage} source={Refresh} />
                                        <Text style={{ color: 'white', fontSize: 12, marginTop: 4 }}>as of {this.state.timeNow}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/*
                            <View>
                                <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: '#fff' }}>
                                    {this.state.underlyingObject.underlyingMonthShortDesc } {this.state.underlyingObject.underlyingYear}
                                </Text>
                                <Text style={{ fontSize: 18, fontFamily: 'HelveticaNeue-Bold', color: '#fff' }}>
                                    {this.state.contractBidAskPrice}
                                </Text>
                            </View>
                            */}
                            <View style={styles.disabledDataContainer}>
                                <Text style={styles.disabledData}>{this.state.underlyingObject.underlyingMonthShortDesc} {this.state.underlyingObject.underlyingYear}</Text>
                            </View>
                        </View>
                        <View style={{ height: 350, width: 1, marginLeft: 40, marginTop: 20, backgroundColor: 'rgb(127,143,164)' }} />
                        <View style={{ flexDirection: 'column', marginLeft: 33 }}>
                            {/* bushel quantity */}
                            <Text style={styles.disabledLabel}>BUSHEL QUANTITY</Text>
                            <View style={styles.disabledDataContainer}>
                                <Text style={styles.disabledData}>{common.formatNumberCommas(this.state.quantity)}</Text>
                            </View>
                            {/* order type */}
                            <OrderType onOrderTypeChange={this.onOrderTypeChange.bind(this)} onExpireSelection={this.onExpireSelection.bind(this)} />
                            {/* bid ask price */}                            
                            <BidAskPrice />
                            {/* buttons */}
                            <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 312, marginLeft: 130 }}>
                                <Button buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}>CANCEL</Button>
                                <TouchableOpacity onPress={this.onReviewOrder.bind(this)} style={[styles.buttonStyle, { marginLeft: 28 }, this.state.reviewOrderDisabled ? { backgroundColor: '#27998965' } : { backgroundColor: '#279989' }]}>
                                    <Text style={[styles.textStyle, { color: '#fff' }]}>REVIEW ORDER</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = {
    container: { height: 452, width: 992, backgroundColor: '#3d4c57', marginHorizontal: 16, marginTop: 38, marginBottom: 7, borderColor: '#bed8dd', borderWidth: 1, borderTopWidth: 4, borderTopColor: '#e7b514' },
    setOrderDetails: { flexDirection: 'row', height: 47, width: 990, borderBottomWidth: 1, borderColor: '#e7b514', alignItems: 'center' },
    orderTitle: { fontSize: 20, fontFamily: 'HelveticaNeue-Medium', color: '#e7b514', paddingLeft: 21 },
    disabledLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#ffffff60', marginBottom: 8 },
    disabledDataContainer: { marginBottom: 10, backgroundColor: '#ffffff80', borderRadius: 4, height: 40, width: 250, paddingLeft: 15, paddingTop: 10 },
    disabledData: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#00000060' },
    textStyle: { color: '#9fa9ba', fontSize: 18, fontFamily: 'HelveticaNeue' },
    buttonStyle: { marginTop: 24, width: 164, height: 40, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#9fa9ba', justifyContent: 'center', alignItems: 'center', zIndex: -1 },
    refreshImage: { width: 18, height: 18, marginLeft: 24, marginRight: 4 },
    radioButtonContainer: { height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#9ea6b1', backgroundColor: '#ffffff80', alignItems: 'center', justifyContent: 'center' },
    radioButtonSelected: { height: 20, width: 20, borderRadius: 10, backgroundColor: '#376768' },
    radioButtonText: { color: '#ffffff60', fontSize: 16, marginLeft: 5 }
};

const mapStateToProps = (state) => {
    return {
        MyFarmProd: state.dashBoardButtons,
        underlyingSym: state.selectedContractMonth,
        products: state.products,
        contractMonth: state.contractData        
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            quoteSwapUnderlying,
            getReviewOrderQuote
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderDetails);
