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
                        <View style={{ marginLeft: 398, marginTop: 2 }}>
                            <Image source={cancelimage} style={{ width: 16, height: 16 }} />
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
                                            <Text style={styles.quoteLabel}>Mid Market Mark</Text>
                                            <Text style={styles.quoteData}>{this.props.calcs.midMarketMarkCents.toFixed(1)} Cents per {common.capitalizeWord(this.props.data.units)}</Text>
                                        </View>
                                        <View style={[styles.quoteField, { marginBottom: 0, alignItems: 'center' }]}>
                                            <Text style={styles.quoteLabel}>Indicative Market Price</Text>
                                            <Text style={styles.quoteData}>${this.props.data.price.toFixed(4)}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Switch
                                            style={styles.switchStyle} onTintColor='#01aca8' tintColor='#ddd'
                                            onValueChange={(value) => this.setState({ isPlaceOrderEnabled: value })} value={this.state.isPlaceOrderEnabled} 
                                        />
                                         <Text>Agree to </Text>
                                        <TouchableOpacity onPress={this.showTermsConditions.bind(this)}>
                                            <Text style={{ color: '#01aca8', textDecorationLine: 'underline' }}>Terms and Conditions</Text>
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
    reviewContainer: { height: height - 250, backgroundColor: '#404e59', marginLeft: 15, marginRight: 15, padding: 15, paddingBottom: 50 },
    reviewTitle: { backgroundColor: '#404e59', fontFamily: 'HelveticaNeue-Thin', fontSize: 30, color: '#fff', marginRight: 100, marginBottom: 15 },
    displayNone: { display: 'none' },
    displayBlock: { display: 'flex' },

    /* quote fields */
    quoteContainer: { height: height - 370, flexDirection: 'column', backgroundColor: '#fff', borderRadius: 5, padding: 20, paddingLeft: 100, paddingRight: 100 },
    quoteFields: { flexDirection: 'row', flex: 1 },
    quoteField: { marginBottom: 10 },
    quoteLabel: { color: '#888', fontSize: 12 },
    quoteData: { color: '#404e59', fontSize: 16 },
    quoteMarketContainer: {
        backgroundColor: '#ebf9f9', borderRadius: 5, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center'
    },
    switchStyle: { backgroundColor: '#ddd', borderRadius: 18, marginLeft: 10, marginRight: 10 },

    /* button styles */
    buttonContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    reviewButtonStyle: { alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 30, borderRadius: 4, paddingLeft: 20, paddingTop: 10, paddingRight: 20, paddingBottom: 10 },
    reviewButtonTextStyle: { fontFamily: 'HelveticaNeue-Light', color: '#4a4a4a', fontSize: 18 },
    backButtonStyle: { backgroundColor: '#fff', marginRight: 40 },
    reviewButtonStyleEnabled: { backgroundColor: '#279988' },
    reviewButtonStyleDisabled: { backgroundColor: '#27998835' },
    
    /* small page header */
    backHeader: { backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#bed8dd', borderTopColor: '#e7b514', borderTopWidth: 4, marginTop: 20, marginLeft: 15, marginRight: 15 },
    headerTextBox: { marginTop: 10, marginBottom: 10, borderRightColor: '#e6eaee', borderRightWidth: 2 },
    headerText: { fontFamily: 'HelveticaNeue', color: '#007681', fontSize: 18, paddingLeft: 10, paddingRight: 10 },

    /* popup/message style */
    messageContainer: { position: 'absolute', marginTop: 160, marginLeft: 370 },
    triangle: { 
        marginLeft: 200, width: 0, height: 0, backgroundColor: 'transparent', borderStyle: 'solid', borderColor: '#ddd', borderLeftWidth: 8, borderRightWidth: 8, borderTopWidth: 16, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#ddd'
    },
    messageBox: { width: 420, borderColor: '#ddd', borderWidth: 2, backgroundColor: '#fff', borderRadius: 3 }, 
    messageBoxText: { 
        fontFamily: 'HelveticaNeue-Thin', color: '#3b4a55', fontSize: 14, marginTop: 0, paddingLeft: 15, paddingTop: 0, paddingRight: 15, paddingBottom: 15 
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
