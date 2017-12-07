import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Switch, Image, StyleSheet, Dimensions, StatusBar, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import * as common from '../../Utils/common';
import { CommonHeader, InfoPopup, Button } from '../../components/common';
import MyFarmTiles from '../common/MyFarmTiles';
import { getReviewOrderQuote, placeOrder } from '../../redux/actions/OrdersAction/ReviewOrder';
import Info from '../common/img/Info.png';
import bugsnag from '../common/BugSnag';
import DisclaimerData from '../../restAPI/disclaimer.json';

class ReviewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTermsAccepted: false,
            isPlaceOrderEnabled: false,
            termsConditionsPopup: null,
            priceInfoPopup: null
        };
        this.priceInfo = { top: 205, left: 650, width: 300, arrowPosition: 'top', message: this.props.infoEstimatedNetPrice };        
    }

    componentWillReceiveProps(nextProps) {
        if (common.isValueExists(nextProps.isSpinActive)) {
            if (nextProps.isSpinActive) {
                this.setState({ isPlaceOrderEnabled: false });
            } else {
                if (this.state.isTermsAccepted) {
                    this.setState({ isPlaceOrderEnabled: true });
                }
            }
        }
    }
        
    onModifyOrder() {
        Actions.pop();
    }

    onAcceptTerms() {
        this.setState({ isTermsAccepted: true, isPlaceOrderEnabled: true });
    }

    onPlaceOrderNow() {
        if (this.state.isTermsAccepted === true) {
            this.setState({ isPlaceOrderEnabled: false });
            this.props.placeOrder();
        } else {
            Alert.alert('You must accept the terms and conditions before placing the order.');
        }
    }

    showTermsConditions() {
        const popup = (<InfoPopup popupInfo={termsInfo} onClose={this.hideTermsConditions.bind(this)} />);
        this.setState({ termsConditionsPopup: popup });
    }

    hideTermsConditions() {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ termsConditionsPopup: popup });
    }

    showPriceInfo() {
        this.priceInfo.top = this.props.isLimitOrder ? 250 : 200;
        const popup = (<InfoPopup popupInfo={this.priceInfo} onClose={this.hidePriceInfo.bind(this)} />);
        this.setState({ priceInfoPopup: popup });
    }

    hidePriceInfo() {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ priceInfoPopup: popup });
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            let limitViewGTD = null;
            let limitViewPrice = null;
            if (this.props.isLimitOrder) {
                limitViewGTD = (
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Order Valid Until</Text>
                        <Text style={styles.quoteData}>{common.formatDate(this.props.data.metadata.goodTilDate, 5)}</Text>
                    </View>
                );
                limitViewPrice = (
                    <View style={styles.quoteField}>
                        <Text style={styles.quoteLabel}>Limit Price</Text>
                        <Text style={styles.quoteData}>${parseFloat(this.props.data.metadata.targetPrice).toFixed(4)}</Text>
                    </View>
                );
            }
            let lMidMarketMark = null;
            if (!this.props.isRepriceOrder) {
                lMidMarketMark = (
                    <View style={[styles.quoteField, { marginBottom: 0, marginRight: 60, alignItems: 'center' }]}>
                        <Text style={[styles.quoteLabel, styles.marketLabel]}>MID MARKET MARK</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.quoteData, styles.marketData]}>{parseFloat(this.props.calcs.midMarketMarkCents).toFixed(1)}</Text>
                            <Text style={[styles.quoteData, styles.marketLabel, { fontSize: 14 }]}> Cents
                                per {common.capitalizeWord(this.props.data.units)}</Text>
                        </View>
                    </View>
                );
            }

            return (

                <View>
                    <StatusBar barStyle='light-content' />
                    <View style={{ backgroundColor: '#000', width, height: 20 }} />
                    <CommonHeader />
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
                                <Text style={styles.reviewTitle}>Let’s review the details and complete your order.</Text>
                                <View style={styles.quoteContainer}>
                                    {/* quote fields */}
                                    <View style={styles.quoteFields}>
                                        <View style={{ flex: 1 }}>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>Crop</Text>
                                                <Text style={styles.quoteData}>{this.props.commodity.name} {this.props.cropBut.selectedId.slice(-4)}</Text>
                                            </View>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>Product</Text>
                                                <Text style={styles.quoteData}>{this.props.productDesc}</Text>
                                            </View>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>Trade Direction</Text>
                                                <Text style={styles.quoteData}>{this.props.buySell}</Text>
                                            </View>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>Contract Details</Text>
                                                <Text style={styles.quoteData}>{this.props.underlying.underlyingMonthDesc} {this.props.underlying.underlyingYear}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>Contract Expiry Date</Text>
                                                <Text style={styles.quoteData}>{common.formatDate(this.props.data.metadata.expirationDate, 5)}</Text>
                                            </View>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>{common.capitalizeWord(this.props.data.units)} Quantity</Text>
                                                <Text style={styles.quoteData}>{common.formatNumberCommas(this.props.data.metadata.quantity)}</Text>
                                            </View>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>Order Type</Text>
                                                <Text style={styles.quoteData}>{common.capitalizeWord(this.props.data.metadata.orderType)} Order</Text>
                                            </View>
                                            {limitViewGTD}
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <View style={styles.quoteField}>
                                                <Text style={styles.quoteLabel}>Service Fee</Text>
                                                <Text style={styles.quoteData}>${parseFloat(this.props.calcs.midMarketMark).toFixed(4)}</Text>
                                            </View>
                                            {limitViewPrice}
                                            <View style={styles.quoteField}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.quoteLabel}>Estimated Net Price</Text>
                                                    <TouchableOpacity onPress={this.showPriceInfo.bind(this)}>
                                                        <Image style={{ width: 16, height: 16, marginLeft: 5, marginTop: 2 }} source={Info} />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text style={styles.quoteData}>${parseFloat(this.props.calcs.totalPrice).toFixed(4)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/* market and terms/conditions */}
                                    <View>
                                        <View style={styles.quoteMarketContainer}>
                                            {lMidMarketMark}
                                            <View style={[styles.quoteField, { marginBottom: 0, alignItems: 'center' }]}>
                                                <Text style={[styles.quoteLabel, styles.marketLabel]}>INDICATIVE MARKET
                                                    PRICE</Text>
                                                <Text style={[styles.quoteData, styles.marketData]}>${parseFloat(this.props.data.price).toFixed(4)}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.termsContainer}>
                                            <Switch 
                                                style={styles.switchStyle} onTintColor='#01aca8' tintColor='#ddd'
                                                onValueChange={this.onAcceptTerms.bind(this)}
                                                value={this.state.isTermsAccepted}
                                            />
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
                                                <Text style={[styles.reviewButtonTextStyle, { color: '#9fa9ba' }]}>MODIFY
                                                    ORDER</Text>
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
                            {this.state.priceInfoPopup}
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const { width, height } = Dimensions.get('window');
const termsInfo = { 
    top: 150, 
    left: 300, 
    width: 500, 
    arrowPosition: 'bottom', 
    message: DisclaimerData.disclosure,
    link: <Button buttonStyle={{}} textStyle={{ marginTop: -10, fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.cargill.com/price-risk/crm/pre-trade-disclosure')}>Pre-Trade Disclosure</Button>
};

const styles = StyleSheet.create({
    /* container */
    reviewMain: { height: height - 120, backgroundColor: '#eff4f7' },
    reviewContainer: { height: height - 260, backgroundColor: '#404e59', marginLeft: 15, marginRight: 15, padding: 15, paddingBottom: 50 },
    reviewTitle: { backgroundColor: '#404e59', fontFamily: 'HelveticaNeue-Thin', fontSize: 32, color: '#fff', marginRight: 100, marginBottom: 15 },

    /* quote fields */
    quoteContainer: { height: height - 345, flexDirection: 'column', backgroundColor: '#fff', borderRadius: 5, padding: 20, paddingLeft: 120, paddingRight: 120 },
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
    headerText: { fontFamily: 'HelveticaNeue-Medium', color: '#007681', fontSize: 20, paddingLeft: 10, paddingRight: 10 }
});

const mapStateToProps = state => {
    const isReprice = state.reviewQuote.quoteData.metadata.quoteType.toLowerCase() === 'rpx';
    const isBuy = state.reviewQuote.quoteData.metadata.buySell.toLowerCase() === 'b' || state.reviewQuote.quoteData.metadata.buySell.toLowerCase() === 'buy';
    const isLimit = state.reviewQuote.quoteData.metadata.orderType.toLowerCase() === 'limit';
    const oUnderlying = common.createUnderlyingObject(state.reviewQuote.quoteData.metadata.underlying);
    let tPrice = 0;
    if (isBuy) {
        tPrice = isLimit ? 
            parseFloat(state.reviewQuote.quoteData.metadata.targetPrice + Math.abs(state.reviewQuote.quoteData.midMarketMark)) :
            parseFloat(state.reviewQuote.quoteData.price + Math.abs(state.reviewQuote.quoteData.midMarketMark));
    } else {
        tPrice = isLimit ? 
            parseFloat(state.reviewQuote.quoteData.metadata.targetPrice - Math.abs(state.reviewQuote.quoteData.midMarketMark)) :
            parseFloat(state.reviewQuote.quoteData.price - Math.abs(state.reviewQuote.quoteData.midMarketMark));
    }

    return {
        acc: state.account,
        data: state.reviewQuote.quoteData,
        buySell: isBuy ? 'Buy' : 'Sell',
        calcs: {
            midMarketMark: parseFloat(Math.abs(state.reviewQuote.quoteData.midMarketMark)),
            midMarketMarkCents: parseFloat(state.reviewQuote.quoteData.midMarketMark * 100),
            totalPrice: tPrice
        },
        commodity: {
            name: state.cropsButtons.selectedCropName,
            year: oUnderlying.underlyingYear
        },
        productDesc: common.translateProductId(state.reviewQuote.quoteData.metadata.riskProductId, state.products),
        underlying: oUnderlying,
        isLimitOrder: isLimit,
        isRepriceOrder: isReprice,
        tradeTitle: isReprice ? 'close position' : 'new trade',
        infoEstimatedNetPrice: state.displayProperties.filter(item => item.propKey === 'infoEstimatedNetPrice')[0].propValue,
        isSpinActive: state.reviewQuote.spinFlag,
        cropBut: state.cropsButtons
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getReviewOrderQuote,
        placeOrder
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);
