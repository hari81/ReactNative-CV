import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, TextInput, Keyboard, DatePickerIOS, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import moment from 'moment';
import Refresh from '../../components/common/img/Refresh.png';
import { Button } from '../../components/common/Button';
import { Spinner } from '../../components/common/Spinner';
import { getReviewOrderQuote } from '../../redux/actions/OrdersAction/ReviewOrder';
import { quoteSwapUnderlying } from '../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import * as commonStyles from '../../Utils/styles';
import * as common from '../../Utils/common';

import Info from '../../components/common/img/Info-white.png';
import cancel from '../../components/common/img/Cancel-40.png';
import { InfoPopup } from '../../components/common/InfoPopup';
import bugsnag from '../.././components/common/BugSnag';

class UpdateOrderDetails extends Component {
    constructor(props) {
        super(props);
        const sOrder = this.props.selectedOrder;
        const uObject = common.createUnderlyingObject(sOrder.underlying);
        this.state = {
            riskProductId: sOrder.riskProductId,
            productName: common.translateProductId(sOrder.riskProductId, this.props.products),
            quoteType: sOrder.quoteType,
            orderType: sOrder.orderType,
            isLimitOrder: false,
            quantity: sOrder.quantity,
            buySell: sOrder.buySell.toLowerCase() === 'b' ? 'Buy' : 'Sell',
            isBuy: sOrder.buySell.toLowerCase() === 'b',
            underlying: sOrder.underlying,
            expirationDate: sOrder.expirationDate,
            targetPrice: 0,
            goodTilDate: null,
            underlyingObject: uObject,
            notes: sOrder.notes,
            timeNow: moment().format('MMM Do YYYY, h:mm a'),
            contractBidAskPrice: '-',
            transId: sOrder.transId,
            activityId: sOrder.activityId,
            bidPrice: null,
            askPrice: null,
            settlePrice: null,
            infoLimitPricePopup: null,
            infoOrderExpiryPopup: null,
            showDatePicker: false,
            tickSizeIncrement: 0,
            lastTradeDate: null,
            isRefreshPrices: false
        };
        this.limitPriceInfo = { top: 22, left: 0, width: 200, arrowPosition: 'top', message: this.props.infoTargetPrice };
        this.orderExpiryInfo = { top: 22, left: 250, width: 200, arrowPosition: 'top', message: this.props.infoOptionExpirationDate };   
    }

    componentWillMount() {
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === this.props.cropId.slice(0, (this.props.cropId.length - 4)));
        this.setState({ tickSizeIncrement: crop[0].tickSizeIncrement === null || crop[0].tickSizeIncrement === undefined ? '0' : crop[0].tickSizeIncrement.toString() });
    }

    componentWillReceiveProps(nextProps) {
        //contract month code
        if (nextProps.contractMonth !== null) {
            const cMonths = nextProps.contractMonth;
            if (!cMonths.spinFlag) {
                this.setState({ timeNow: moment().format('MMM Do YYYY, h:mm a') });
                const sMonth = cMonths.contract.find(x => x.underlying === this.state.underlying);
                if (sMonth !== null && sMonth !== undefined) {                    
                    let tPrice = '-';
                    if (this.state.isBuy) {
                        tPrice = sMonth.askPrice === null ? sMonth.settlePrice : sMonth.askPrice;
                    } else {
                        tPrice = sMonth.bidPrice === null ? sMonth.settlePrice : sMonth.bidPrice;
                    }
                    tPrice = tPrice === null ? '-' : tPrice.toFixed(4);
                    this.setState({ contractBidAskPrice: tPrice });
                    const tBidPrice = sMonth.bidPrice === null ? '-' : parseFloat(sMonth.bidPrice).toFixed(4);
                    const tAskPrice = sMonth.askPrice === null ? '-' : parseFloat(sMonth.askPrice).toFixed(4);
                    const tSettlePrice = sMonth.settlePrice === null ? '-' : parseFloat(sMonth.settlePrice).toFixed(4);
                    this.setState({ bidPrice: tBidPrice, askPrice: tAskPrice, settlePrice: tSettlePrice });
                    if (this.state.isRefreshPrices) {
                        this.setState({ isRefreshPrices: false });
                    } else {
                        this.onUpdateTargetPrice();
                        const tLastTradeDate = sMonth.lastTradeDate;
                        if (common.isValueExists(tLastTradeDate)) {
                            const tDate = new Date(tLastTradeDate.concat('T00:00:00-06:00')) || '';
                            this.setState({ lastTradeDate: tLastTradeDate, goodTilDate: tDate });    
                        } else {
                            const tDate = new Date();
                            this.setState({ lastTradeDate: tDate, goodTilDate: tDate });
                        }
                    }
                }
            }
        }
    }

    onMarketSelection() {
        this.setState({ orderType: 'market', isLimitOrder: false });
        this.onUpdateTargetPrice();
    }

    onLimitSelection() {
        this.setState({ orderType: 'limit', isLimitOrder: true });
        this.onUpdateTargetPrice();
    }

    onUpdateTargetPrice() {
        const tTargetPrice = this.state.bidPrice === '-' ? this.state.settlePrice : this.state.bidPrice;
        this.setState({ targetPrice: tTargetPrice });
    }

    onRefreshBidAsk() {
        this.setState({ isRefreshPrices: true });
        const cropYear = common.convertStringToInt(this.props.cropId.substring(this.props.cropId.length - 4));
        const cropCode = this.props.cropId.substring(0, this.props.cropId.length - 4);
        this.props.quoteSwapUnderlying(cropYear, cropCode);
    }

    onReviewOrder() {
        try {
            if (this.state.orderType.toLowerCase() === 'limit') {
                if (this.state.targetPrice === null || this.state.targetPrice === undefined || this.state.targetPrice === 0) {
                    Alert.alert('Update Order Details', 'A non-zero value must be entered for the Limit Price.');
                } else if (this.state.goodTilDate === null || this.state.goodTilDate === undefined) {
                    Alert.alert('Update Order Details', 'Please select a Valid Until date.');
                } else {
                    this.props.getReviewOrderQuote(this.state);
                }
            } else {
                this.props.getReviewOrderQuote(this.state);
            }
        } catch (error) {
            Alert.alert(`Unexpected error occurred: ${error}`);
        }
    }

    onFocusMake() {
        this.onScrollUpdate();        
        this.setState({ targetPrice: (this.state.targetPrice.charAt(0) === '$') ? this.state.targetPrice.slice(1, this.state.targetPrice.length) : this.state.targetPrice });
    }

    onBlurMake() {
        this.onScrollDown();
        let tlp = this.state.targetPrice.charAt(0) === '$' ? this.state.targetPrice.slice(1, this.state.targetPrice.length) : this.state.targetPrice;
        if (tlp === '') { tlp = '0'; }
        tlp = parseFloat(tlp).toFixed(4);        
        this.setState({ targetPrice: `$${tlp}` });
    }

    onChangeQuantity(text) {
        if (/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/.test(text) || text === '') {
            this.setState({ targetPrice: text });
        }
    }

    minusButtonPress = () => {
        try {
            let lp = common.cleanNumericString(this.state.targetPrice);
            lp = lp === '' ? 0 : lp;
            if (parseFloat(lp) >= parseFloat(this.state.tickSizeIncrement)) {
                const tPrice = ((parseFloat(lp) - parseFloat(this.state.tickSizeIncrement)).toFixed(4));
                this.setState({ targetPrice: `$${tPrice}` });
            }
            this.timer = setTimeout(this.minusButtonPress, 100);    
        } catch (error) {
            console.log(error);
        }
    }

    plusButtonPress = () => {
        try {
            let lp = common.cleanNumericString(this.state.targetPrice);
            lp = lp === '' ? 0 : lp;
            const tPrice = (parseFloat(lp) + parseFloat(this.state.tickSizeIncrement)).toFixed(4);
            this.setState({ targetPrice: `$${tPrice}` });
            this.timer = setTimeout(this.plusButtonPress, 100);
        } catch (error) {
            console.log(error);
        }        
    }

    stopTimer() {
        clearTimeout(this.timer);
    }

    showInfoPopup(info) {
        switch (info) {
            case 'limitPriceInfo':
                this.setState({ infoLimitPricePopup: <InfoPopup popupInfo={this.limitPriceInfo} onClose={this.hideInfoPopup.bind(this)} /> });
                break;
            case 'orderExpiryInfo':
                this.setState({ infoOrderExpiryPopup: <InfoPopup popupInfo={this.orderExpiryInfo} onClose={this.hideInfoPopup.bind(this)} /> });
                break;
            default: break;
        }
    }

    hideInfoPopup() {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ infoLimitPricePopup: popup, infoOrderExpiryPopup: popup });
    }

    onDateChange(date) {
        this.setState({ goodTilDate: date });
    }

    datePicker() {
        if (this.state.showDatePicker) {
            let tDate = new Date();
            let gDate = new Date();
            if (common.isValueExists(this.state.lastTradeDate)) {
                tDate = new Date(this.state.lastTradeDate.concat('T00:00:00-06:00'));
            }
            if (common.isValueExists(this.state.goodTilDate)) {
                gDate = this.state.goodTilDate;
            }
            return (
                <View style={{ position: 'absolute', marginTop: -167, marginLeft: 229, padding: 0 }} >
                    <DatePickerIOS
                        style={{ height: 195, width: 250, borderRadius: 4, backgroundColor: '#fff', zIndex: 1 }}
                        date={gDate}
                        mode="date"
                        onDateChange={(d) => { this.onDateChange(d); }}
                        minimumDate={new Date()}
                        maximumDate={tDate}
                    />
                    <View style={{ height: 20, width: 20, position: 'absolute', marginTop: 3, marginLeft: 225, backgroundColor: '#fff', zIndex: 2 }}>
                        <TouchableOpacity onPress={() => { this.setState({ showDatePicker: false }); Keyboard.dismiss(); }}><Image source={cancel} style={{ height: 20, width: 20 }} /></TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    warningMessage() {
        const tPrice = parseFloat(common.cleanNumericString(this.state.targetPrice));
        if (parseFloat(tPrice) < (0.8 * parseFloat(this.state.bidPrice)) || parseFloat(tPrice) > (1.2 * parseFloat(this.state.bidPrice))) {
            return <Text style={{ color: '#e7b514', paddingLeft: 45, marginTop: 2 }}>+/- 20% from Market</Text>;
        }
        return <Text />;
    }

    onReturnToOrders() {
        const cropCode = this.props.cropId.substring(0, this.props.cropId.length - 4);        
        Actions.orders({ selectedTab: 'Open Positions', Crop: cropCode, type: ActionConst.REPLACE });
    }
 
    onScrollUpdate() {
        this.refs.scrollView.scrollTo({ x: 0, y: 140, animated: true });
    }

    onScrollDown() {
        this.refs.scrollView.scrollToEnd();
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            let limitOrderFields = null;
            let fgdt = '';
            if (common.isValueExists(this.state.goodTilDate)) {
                fgdt = moment(this.state.goodTilDate).format('MMMM Do, YYYY');
            }
            if (this.state.isLimitOrder) {
                limitOrderFields = (
                    <View style={{ marginTop: 5, marginBottom: 5 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', zIndex: -1 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.enabledLabel}>LIMIT PRICE</Text>
                                    <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'limitPriceInfo')}>
                                        <Image style={styles.infoIcon} source={Info} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPressIn={this.minusButtonPress} onPressOut={this.stopTimer.bind(this)}>
                                            <Text style={[styles.updownIcon, { marginTop: 5, marginRight: 15 }]}>-</Text>
                                        </TouchableOpacity>
                                        <TextInput
                                            style={{ height: 40, width: 110, borderRadius: 4, backgroundColor: '#fff', padding: 2, paddingLeft: 5 }}
                                            maxLength={9} placeholder='0' keyboardType='decimal-pad'
                                            returnKeyType="done"
                                            value={this.state.targetPrice}
                                            onChangeText={this.onChangeQuantity.bind(this)}
                                            onBlur={this.onBlurMake.bind(this)}
                                            onFocus={this.onFocusMake.bind(this)}
                                            onKeyPress={(e) => {
                                                if (e.nativeEvent.key === 'Enter') {
                                                    Keyboard.dismiss();
                                                }
                                            }}
                                            selectTextOnFocus
                                        />
                                        <TouchableOpacity onPressIn={this.plusButtonPress} onPressOut={this.stopTimer.bind(this)}>
                                            <Text style={[styles.updownIcon, { marginTop: 5, marginLeft: 15, paddingLeft: 9 }]}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {this.warningMessage()}
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: 25 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.enabledLabel}>VALID UNTIL</Text>
                                    <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'orderExpiryInfo')}>
                                        <Image style={styles.infoIcon} source={Info} />
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={{
                                        height: 40,
                                        width: 250,
                                        borderRadius: 4,
                                        backgroundColor: '#fff',
                                        paddingLeft: 5
                                    }}
                                    placeholder="MM/DD/YYYY"
                                    onFocus={() => {
                                        Keyboard.dismiss();
                                        this.setState({ showDatePicker: true });
                                    }}
                                    value={fgdt}
                                    returnkeyType="done"
                                />
                            </View>
                        </View>
                        {this.datePicker()}
                        {this.state.infoLimitPricePopup}
                        {this.state.infoOrderExpiryPopup}
                    </View>
                );
            } else {
                limitOrderFields = <View style={{ display: 'none' }} />;
            }

            let spinner = null;
            if (this.props.contractMonth.spinFlag) {
                spinner = <Spinner size="small" />;
            } else {
                spinner = (
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
                                    {/* Sell */}
                                    <View style={commonStyles.common.radioButtonContainerDisabled}>
                                        {!this.state.isBuy ?
                                            <View style={commonStyles.common.radioButtonSelectedDisabled} /> : null}
                                    </View>
                                    <Text style={commonStyles.common.radioButtonTextDisabled}>Sell</Text>
                                    {/* Buy */}
                                    <View style={[commonStyles.common.radioButtonContainerDisabled, { marginLeft: 40 }]}>
                                        {this.state.isBuy ?
                                            <View style={commonStyles.common.radioButtonSelectedDisabled} /> : null}
                                    </View>
                                    <Text style={commonStyles.common.radioButtonTextDisabled}>Buy</Text>
                                </View>
                                {/* contract month */}
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.disabledLabel}>CONTRACT MONTH</Text>
                                    <TouchableOpacity onPress={this.onRefreshBidAsk.bind(this, this.state.timeNow)}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={styles.refreshImage} source={Refresh} />
                                            <Text style={{ color: '#fff', fontSize: 12, marginTop: 3 }}>as of {this.state.timeNow}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.disabledContractMonth}>
                                    <Text style={styles.disabledContractMonthYearText}>
                                        {this.state.underlyingObject.underlyingMonthShortDesc} {this.state.underlyingObject.underlyingYear}
                                    </Text>
                                    <Text style={styles.disabledContractBidAskPrice}>${this.state.contractBidAskPrice}</Text>
                                </View>
                            </View>
                            <View style={{ height: height - 280, width: 1, marginLeft: 40, backgroundColor: '#7f8fa4' }} />
                            <ScrollView ref='scrollView' keyboardDismissMode='interactive' keyboardShouldPersistTaps='never'>
                                <View style={{ flexDirection: 'column', marginLeft: 33 }}>
                                    {/* bushel quantity */}
                                    <Text style={styles.disabledLabel}>BUSHEL QUANTITY</Text>
                                    <View style={styles.disabledDataContainer}>
                                        <Text style={styles.disabledData}>{common.formatNumberCommas(this.state.quantity).toString()}</Text>
                                    </View>
                                    {/* order type */}
                                    <View>
                                        <Text style={styles.enabledLabel}>ORDER TYPE</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                            <TouchableOpacity onPress={this.onMarketSelection.bind(this)}>
                                                <View style={commonStyles.common.radioButtonContainer}>
                                                    {!this.state.isLimitOrder ?
                                                        <View style={commonStyles.common.radioButtonSelected} /> : null}
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={commonStyles.common.radioButtonText}>Market Order</Text>
                                            <TouchableOpacity onPress={this.onLimitSelection.bind(this)}>
                                                <View style={[commonStyles.common.radioButtonContainer, { marginLeft: 20 }]}>
                                                    {this.state.isLimitOrder ?
                                                        <View style={commonStyles.common.radioButtonSelected} /> : null}
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={commonStyles.common.radioButtonText}>Limit Order</Text>
                                        </View>
                                        {limitOrderFields}
                                    </View>
                                    {/* bid ask price */}
                                    <View style={styles.pricesContainer}>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.priceLabel}>BID PRICE:</Text>
                                            <Text style={styles.priceText}>${this.state.bidPrice}</Text>
                                        </View>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.priceLabel}>ASK PRICE:</Text>
                                            <Text style={styles.priceText}>${this.state.askPrice}</Text>
                                        </View>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.priceLabel}>LAST SETTLE:</Text>
                                            <Text style={styles.priceText}>${this.state.settlePrice}</Text>
                                        </View>
                                    </View>
                                    {/* buttons */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'baseline', zIndex: -1 }}>
                                        <Button onPress={this.onReturnToOrders.bind(this)} buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}>CANCEL</Button>
                                        <TouchableOpacity 
                                            onPress={this.onReviewOrder.bind(this)}
                                            style={[styles.buttonStyle, { marginLeft: 28, backgroundColor: '#279989', borderColor: '#279989' }]}
                                        >
                                            <Text style={[styles.textStyle, { color: '#fff' }]}>REVIEW ORDER</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                );
            }

            return (
                <View style={styles.container}>
                    <View style={styles.titleBarOrder}>
                        <Text style={styles.orderTitle}>Close Position</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 630 }}>
                            <TouchableOpacity onPress={() => Actions.disclaimer({ productId: this.state.riskProductId })}>
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
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const { width, height } = Dimensions.get('window');

const styles = {
    container: { height: height - 200, width: width - 32, backgroundColor: '#3d4c57', marginHorizontal: 16, marginTop: 38, marginBottom: 20, borderColor: '#bed8dd', borderWidth: 0, borderTopWidth: 4, borderTopColor: '#e7b514' },
    titleBarOrder: { flexDirection: 'row', height: 47, width: 990, borderBottomWidth: 1, borderColor: '#e7b514', alignItems: 'center' },
    orderTitle: { fontSize: 20, fontFamily: 'HelveticaNeue-Medium', color: '#e7b514', paddingLeft: 21 },
    enabledLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#ffffff', marginBottom: 10 },
    disabledLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#ffffff60', marginBottom: 10 },
    disabledDataContainer: { marginBottom: 15, backgroundColor: '#ffffff80', borderRadius: 4, height: 40, width: 250, paddingLeft: 15, paddingTop: 10 },
    disabledData: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#00000060' },
    disabledContractMonth: { width: 80, height: 50, backgroundColor: '#376768', marginLeft: 5, marginTop: 5, justifyContent: 'center', alignItems: 'center' },
    disabledContractMonthYearText: { fontSize: 12, fontFamily: 'HelveticaNeue', color: '#ffffff60' },
    disabledContractBidAskPrice: { fontSize: 18, fontFamily: 'HelveticaNeue-Bold', color: '#ffffff60' },
    textStyle: { color: '#9fa9ba', fontSize: 18, fontFamily: 'HelveticaNeue' },
    buttonStyle: { marginTop: 24, width: 164, height: 40, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#fff', justifyContent: 'center', alignItems: 'center', zIndex: -1 },
    refreshImage: { width: 18, height: 18, marginLeft: 12, marginRight: 5, marginTop: 2 },

    pricesContainer: { flexDirection: 'row', width: 480, height: 55, backgroundColor: '#5d6d79', padding: 40, paddingTop: 8, paddingBottom: 8, zIndex: -1 },
    priceContainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 60 },
    priceLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#e7b514' },
    priceText: { color: '#fff', fontSize: 18, fontFamily: 'HelveticaNeue' },

    infoIcon: { height: 16, width: 16, marginLeft: 5, marginTop: 2 },
    questionIcon: { fontSize: 10, fontFamily: 'HelveticaNeue', color: '#fff', width: 16, borderRadius: 8, borderWidth: 1, borderColor: '#fff', paddingLeft: 5.5, paddingTop: 1 },
    updownIcon: { fontSize: 23, fontFamily: 'HelveticaNeue-Bold', color: '#fff', width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', paddingLeft: 11 }    
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        contractMonth: state.contractData,
        defaultAccountData: state.account.defaultAccount,
        cropId: state.cropsButtons.selectedId,
        infoTargetPrice: state.displayProperties.filter(item => item.propKey === 'infoTargetPrice')[0].propValue,
        infoOptionExpirationDate: state.displayProperties.filter(item => item.propKey === 'infoOptionExpirationDate')[0].propValue,
        acc: state.account
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            quoteSwapUnderlying,
            getReviewOrderQuote,
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderDetails);
