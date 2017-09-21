import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Switch, StyleSheet, Image } from 'react-native';
import Dimensions from 'Dimensions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import * as common from '../../Utils/common';
import cancelimage from '../common/img/Cancel-20.png';
import { LogoHomeHeader } from '../../components/common';
import MyFarmTiles from '../../components/DashBoard/MyFarmTiles';
import { getReviewOrderQuote, placeOrder } from '../../redux/actions/OrdersAction/ReviewOrder';
import DisclaimerData from '../../restAPI/disclaimer.json';

class ReviewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isPlaceOrderEnabled: false,
            termsConditionsPopup: null
        }; 
    }

    onModifyOrder() {
        Actions.pop();
    }

    onPlaceOrderNow() {
        if (this.state.isPlaceOrderEnabled === true) {
            this.props.placeOrder();            
        } else {
            Alert.alert('You must accept the terms and conditions before placing the order.');
        }
    }

    showTermsConditions() {
        const popup = (         
            <View style={styles.messageContainer}>
                <View style={styles.messageBox}>
                    <TouchableOpacity onPress={this.hideTermsConditions.bind(this)} >
                        <View style={{ marginLeft: 470, marginTop: 5 }}>
                            <Image source={cancelimage} style={{ width: 20, height: 20 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.messageBoxText}>{DisclaimerData.disclosure}</Text>
                </View>
                <View style={styles.triangle} />
            </View>
        );
        this.setState({ termsConditionsPopup: popup });
    }

    hideTermsConditions() {
        const popup = <View style={{ display: 'none' }} />;
        this.setState({ termsConditionsPopup: popup });
    }

    render() {
        let limitViewGTD = null;
        let limitViewPrice = null;
        if (this.props.isLimitOrder) {
            limitViewGTD = (
            <View style={styles.quoteField}>
                <Text style={styles.quoteLabel}>Your order will be valid until</Text>
                <Text style={styles.quoteData}>{common.formatDate(this.props.data.metadata.goodTilDate, 5)}</Text>
            </View>
            );
            limitViewPrice = (
            <View style={styles.quoteField}>
                <Text style={styles.quoteLabel}>Your limit price total is</Text>
                <Text style={styles.quoteData}>${this.props.data.metadata.targetPrice}</Text>
            </View>
            );
        }

        return (
            <View>
                <View style={{ backgroundColor: '#000', width, height: 20 }} />
                <LogoHomeHeader />
                <View style={{ backgroundColor: '#eff4f7' }}>
                    <View style={{ height: 83, width, backgroundColor: '#404e59' }} />

                    <MyFarmTiles />

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.backHeader}>
                            <View style={styles.headerTextBox}>
                                <Text style={styles.headerText}>Review Your Order Details</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.reviewMain}>
                        <View style={styles.reviewContainer}>
                            <Text style={styles.reviewTitle}>Your New Trade details have been set. Let's review it and complete your order.</Text>
                            <View style={styles.quoteContainer}>
                                {/* quote fields */}
                                <View style={styles.quoteFields}>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your crop is</Text>
                                            <Text style={styles.quoteData}>{this.props.commodity.name} {this.props.commodity.year}</Text>
                                        </View>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your product is a</Text>
                                            <Text style={styles.quoteData}>{this.props.productDesc}</Text>
                                        </View>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your trade direction is</Text>
                                            <Text style={styles.quoteData}>{this.props.buySell}</Text>
                                        </View>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your product details are</Text>
                                            <Text style={styles.quoteData}>{this.props.underlying.underlyingMonthDesc} {this.props.underlying.underlyingYear}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your product expiry date is</Text>
                                            <Text style={styles.quoteData}>{common.formatDate(this.props.data.metadata.expirationDate, 5)}</Text>
                                        </View>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your {common.capitalizeWord(this.props.data.units)} quantity is</Text>
                                            <Text style={styles.quoteData}>{common.formatNumberCommas(this.props.data.metadata.quantity)}</Text>
                                        </View>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your order type is</Text>
                                            <Text style={styles.quoteData}>{common.capitalizeWord(this.props.data.metadata.orderType)} Order</Text>
                                        </View>
                                        {limitViewGTD}
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your service fee is</Text>
                                            <Text style={styles.quoteData}>${this.props.calcs.midMarketMark.toFixed(4)}</Text>
                                        </View>
                                        {limitViewPrice}
                                        <View style={styles.quoteField}>
                                            <Text style={styles.quoteLabel}>Your estimated total price is</Text>
                                            <Text style={styles.quoteData}>${this.props.calcs.totalPrice.toFixed(4)}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* market and terms/conditions */}
                                <View>
                                    <View style={styles.quoteMarketContainer}>
                                        <View style={[styles.quoteField, { marginBottom: 0, marginRight: 60, alignItems: 'center' }]}>
                                            <Text style={[styles.quoteLabel, styles.marketLabel]}>MID MARKET MARK</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={[styles.quoteData, styles.marketData]}>{this.props.calcs.midMarketMarkCents.toFixed(1)}</Text>
                                                <Text style={[styles.quoteData, styles.marketLabel, { fontSize: 14 }]}> Cents per {common.capitalizeWord(this.props.data.units)}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.quoteField, { marginBottom: 0, alignItems: 'center' }]}>
                                            <Text style={[styles.quoteLabel, styles.marketLabel]}>INDICATIVE MARKET PRICE</Text>
                                            <Text style={[styles.quoteData, styles.marketData]}>${this.props.data.price.toFixed(4)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.termsContainer}>
                                        <Switch style={styles.switchStyle} onTintColor='#01aca8' tintColor='#ddd' onValueChange={(value) => this.setState({ isPlaceOrderEnabled: value })} value={this.state.isPlaceOrderEnabled} />
                                        <Text>Agree to </Text>
                                        <TouchableOpacity onPress={this.showTermsConditions.bind(this)}>
                                            <Text style={styles.termsLink}>Terms and Conditions</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* buttons */}
                                <View style={styles.buttonContainer}>
                                    <View style={[styles.reviewButtonStyle, styles.backButtonStyle]}>
                                        <TouchableOpacity onPress={this.onModifyOrder.bind()}>
                                            <Text style={[styles.reviewButtonTextStyle, { color: '#9fa9ba' }]}>MODIFY ORDER</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.reviewButtonStyle, this.state.isPlaceOrderEnabled ? styles.reviewButtonStyleEnabled : styles.reviewButtonStyleDisabled]}>
                                        <TouchableOpacity onPress={this.onPlaceOrderNow.bind(this)} disabled={!this.state.isPlaceOrderEnabled}>
                                            <Text style={[styles.reviewButtonTextStyle, { color: '#fff' }]}>PLACE ORDER NOW</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {this.state.termsConditionsPopup}
                    </View>
                </View>
            </View>        
        );
    }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    /* container */
    reviewMain: { height: height - 100, backgroundColor: '#eff4f7' },
    reviewContainer: { height: height - 240, backgroundColor: '#404e59', marginLeft: 15, marginRight: 15, padding: 15, paddingBottom: 50 },
    reviewTitle: { backgroundColor: '#404e59', fontFamily: 'HelveticaNeue-Thin', fontSize: 32, color: '#fff', marginRight: 100, marginBottom: 15 },

    /* quote fields */
    quoteContainer: { height: height - 360, flexDirection: 'column', backgroundColor: '#fff', borderRadius: 5, padding: 20, paddingLeft: 120, paddingRight: 120 },
    quoteFields: { flexDirection: 'row', flex: 1 },
    quoteField: { marginBottom: 10 },
    quoteLabel: { fontFamily: 'Helveticaneue-Thin', color: '#3b4a55', fontSize: 14 },
    quoteData: { color: '#3b4a55', fontSize: 20 },
    quoteMarketContainer: { backgroundColor: '#ebf9f9', borderRadius: 3, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center' },
    marketLabel: { fontSize: 10, color: '#606d77' },
    marketData: { fontSize: 18, color: '#606d77' },
    switchStyle: { backgroundColor: '#ddd', borderRadius: 18, marginLeft: 10, marginRight: 10 },
    termsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    termsLink: { fontSize: 16, color: '#606d77', textDecorationLine: 'underline' },

    /* button styles */
    buttonContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    reviewButtonStyle: { alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 4, paddingTop: 10, paddingBottom: 10, width: 220 },
    reviewButtonTextStyle: { fontFamily: 'HelveticaNeue-Light', color: '#4a4a4a', fontSize: 18 },
    backButtonStyle: { backgroundColor: '#fff', borderColor: '#9fa9ba', borderWidth: 1, marginRight: 45 },
    reviewButtonStyleEnabled: { backgroundColor: '#279988' },
    reviewButtonStyleDisabled: { backgroundColor: '#27998865' },
    
    /* small page header */
    backHeader: { backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#bed8dd', borderTopColor: '#e7b514', borderTopWidth: 4, marginTop: 20, marginLeft: 15, marginRight: 15 },
    headerTextBox: { marginTop: 10, marginBottom: 10, borderRightColor: '#e6eaee', borderRightWidth: 2 },
    headerText: { fontFamily: 'HelveticaNeue-Medium', color: '#007681', fontSize: 20, paddingLeft: 10, paddingRight: 10 },

    /* popup/message style */
    messageContainer: { position: 'absolute', marginTop: 160, marginLeft: 320 },
    triangle: { 
        marginLeft: 240, marginTop: -2, width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#fff', borderLeftWidth: 15, borderRightWidth: 15, borderTopWidth: 20, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#ddd', shadowColor: '#aaa', shadowOffset: { width: 0, height: 3 }, shadowRadius: 1, shadowOpacity: 0.5
    },
    messageBox: { width: 500, borderColor: '#ddd', borderWidth: 1, backgroundColor: '#fff', borderRadius: 3, shadowColor: '#aaa', shadowOffset: { width: 0, height: 3 }, shadowRadius: 3, shadowOpacity: 0.5 },
    messageBoxText: { 
        fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', fontSize: 14, marginTop: 0, paddingLeft: 25, paddingTop: 0, paddingRight: 25, paddingBottom: 25 
    }    
    
});

const mapStateToProps = state => {
    return {
        data: state.reviewQuote.quoteData,
        buySell: state.reviewQuote.quoteData.metadata.buySell === 'B' ? 'Buy' : 'Sell',
        calcs: {
            midMarketMark: Math.abs(state.reviewQuote.quoteData.midMarketMark),
            midMarketMarkCents: state.reviewQuote.quoteData.midMarketMark * 100,
            totalPrice: state.reviewQuote.quoteData.metadata.buySell === 'B' ?
                state.reviewQuote.quoteData.price + Math.abs(state.reviewQuote.quoteData.midMarketMark) :
                state.reviewQuote.quoteData.price - Math.abs(state.reviewQuote.quoteData.midMarketMark),
        },
        commodity: {
            name: state.dashBoardButtons.activeCommodity.name,
            year: state.dashBoardButtons.activeCropYear
        },
        productDesc: common.translateProductId(state.reviewQuote.quoteData.metadata.riskProductId, state.products),
        underlying: common.createUnderlyingObject(state.reviewQuote.quoteData.metadata.underlying),
        isLimitOrder: state.reviewQuote.quoteData.metadata.orderType === 'limit'
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        getReviewOrderQuote,
        placeOrder
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
