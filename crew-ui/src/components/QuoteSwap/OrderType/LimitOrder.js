import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, DatePickerIOS } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Minus from '../../common/img/Minus-32.png';
import Plus from '../../common/img/Plus.png';
import st from '../../../Utils/SafeTraverse';
import Info from '../../common/img/Info-white.png';
import { InfoPopup } from '../../common/InfoPopup';
import DisclaimerData from '../../../restAPI/disclaimer.json';
import cancel from '../../common/img/Cancel-40.png';
import * as common from '../../../Utils/common';

class LimitOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limitPrice: this.getLimitPrice(this.props.selectedContractMonth),
            expDate: this.getExpDate(this.props.selectedContractMonth),
            showDatePicker: false,
            infoLimitPricePopup: null,
            infoOrderExpiryPopup: null,
            dateFlag: false
        };
        this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
        //transmits the change in selected contract month
        if (this.props.selectedContractMonth.id !== nextProps.selectedContractMonth.id) {
            const tPrice = this.getLimitPrice(nextProps.selectedContractMonth);
            this.setState({ limitPrice: tPrice });
            const tDate = this.getExpDate(nextProps.selectedContractMonth);
            this.setState({ expDate: tDate });
        }
    }

    getLimitPrice(selectedContractMonth) {
        let tPrice = null;
        const scm = selectedContractMonth;
        if (scm !== null) {
            if (this.props.buySell.toLowerCase() === 'b' || this.props.buySell.toLowerCase() === 'buy') {
                tPrice = scm.askPrice === null ? scm.settlePrice : scm.askPrice;
            } else {
                tPrice = scm.bidPrice === null ? scm.settlePrice : scm.bidPrice;            
            }
            tPrice = tPrice === null ? '-' : parseFloat(tPrice).toFixed(4);
            return tPrice;
        }
        return 0;
    }

    getExpDate() {
        let tDate = null;
        const scm = this.props.selectedContractMonth;
        if (scm !== null) {
            tDate = new Date(scm.lastTradeDate.concat('T00:00:00-06:00')) || '';
            return tDate;
        }
        return null;  
    }

    onLimitPriceChange(limitPrice) {
        this.props.onLimitPriceChange(limitPrice);
    }

    onExpiryDateChange(date) {
        this.setState({ expDate: date });
        this.props.onExpiryDateChange(date);
    }

    onFocusMake() {
        this.setState({ limitPrice: (this.state.limitPrice.charAt(0) === '$') ? this.state.limitPrice.slice(1, this.state.limitPrice.length) : this.state.limitPrice });
    }

    onBlurMake() {
         this.setState({ limitPrice: `$${this.state.limitPrice}` });
         this.onLimitPriceChange(this.state.limitPrice);
    }

    onChangeQuantity(text) {
        if (/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/.test(text) || text === '') {
            this.setState({ limitPrice: text });
            this.onLimitPriceChange(text);
        }
    }

    minusButtonPress() {
        try {
            const lp = common.cleanNumericString(this.state.limitPrice);            
            if (parseFloat(lp) >= parseFloat(this.props.tickSizeIncrement)) {
                const tPrice = ((parseFloat(lp) - parseFloat(this.props.tickSizeIncrement)).toFixed(4));
                this.setState({ limitPrice: tPrice });
                this.onLimitPriceChange(tPrice);
            }
            this.timer = setTimeout(this.minusButtonPress, 50);
        } catch (error) {
            console.log(error);
        }
    }

    plusButtonPress() {
        try {
            const lp = common.cleanNumericString(this.state.limitPrice);            
            const tPrice = ((parseFloat(lp) + parseFloat(this.props.tickSizeIncrement)).toFixed(4));
            this.setState({ limitPrice: tPrice });
            this.onLimitPriceChange(tPrice);
            this.timer = setTimeout(this.plusButtonPress, 50);
        } catch (error) {
            console.log(error);
        }
    }

    stopTimer() {
        clearTimeout(this.timer);
    }

    warningMessage() {
        if (parseFloat(this.state.limitPrice) < (0.8 * parseFloat(this.props.bidPrice)) || parseFloat(this.state.limitPrice) > (1.2 * parseFloat(this.props.bidPrice))) {
            return <Text style={{ color: 'red', paddingLeft: 50 }}>Crossed 20% Limits</Text>;
        }
        return <Text />;
    }

    showInfoPopup(info) {
        switch (info) {
            case 'limitPriceInfo':
<<<<<<< HEAD
                const limitPricePopup = (<InfoPopup popupInfo={limitPriceInfo} onClose={this.hideInfoPopup} />);
                this.setState({ infoLimitPricePopup: limitPricePopup });
                break;
            case 'orderExpiryInfo':
                const orderExpiryPopup = (<InfoPopup popupInfo={orderExpiryInfo} onClose={this.hideInfoPopup} />);
                this.setState({ infoOrderExpiryPopup: orderExpiryPopup });
=======
                this.setState({ infoLimitPricePopup: <InfoPopup popupInfo={limitPriceInfo} onClose={this.hideInfoPopup.bind(this)} /> });
                break;
            case 'orderExpiryInfo':
                this.setState({ infoOrderExpiryPopup: <InfoPopup popupInfo={orderExpiryInfo} onClose={this.hideInfoPopup.bind(this)} /> });
>>>>>>> 4f341e6bec93d3114e61763c2b1b56d6a3965121
                break;
            default: break;
        }
    }

    hideInfoPopup() {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ infoLimitPricePopup: popup, infoOrderExpiryPopup: popup });
    }

    datePicker() {
        if (this.state.showDatePicker) {
            return (
                <View style={{ position: 'absolute', marginTop: -155, marginLeft: 210 }} >
                    <DatePickerIOS

                        style={{ height: 200, width: 250, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: 'white', zIndex: 1 }}
                        date={this.state.expDate}
                        mode="date"
                        onDateChange={(date) => { this.onExpiryDateChange(date); }}
                        minimumDate={new Date()}
                        maximumDate={new Date(this.props.selectedContractMonth.lastTradeDate.concat('T00:00:00-06:00'))}
                    />
                </View>
            );
        }
    }

    datePickerClose() {
        if (this.state.showDatePicker) {

            return (<View style={{ position: 'absolute', height: 200, width: 20, marginTop: -155, marginLeft: 455, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'white', zIndex: 1 }}>
                    <TouchableOpacity onPress={() => { this.setState({ showDatePicker: false }); Keyboard.dismiss(); }}><Image source={cancel} style={{ height: 20, width: 20, marginTop: 4 }} /></TouchableOpacity>

                </View>
            );
        }
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'column', zIndex: -1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>LIMIT PRICE</Text>
                            <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'limitPriceInfo')}><Image style={{ width: 20, height: 20, marginLeft: 5 }} source={Info} /></TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPressIn={this.minusButtonPress.bind(this)} onPressOut={this.stopTimer.bind(this)} >
                                    <Image style={{ width: 32, height: 32, marginRight: 15, marginTop: 5 }} source={Minus} />
                                </TouchableOpacity>
                                <TextInput
                                    style={{ height: 42, width: 112, borderRadius: 4, backgroundColor: '#fff', padding: 2 }}
                                    maxLength={9}
                                    placeholder='0'
                                    keyboardType='decimal-pad'
                                    returnKeyType="done"
                                    value={this.state.limitPrice}
                                    onChangeText={this.onChangeQuantity.bind(this)}
                                    onBlur={this.onBlurMake.bind(this)}
                                    onFocus={this.onFocusMake.bind(this)}
                                    onKeyPress={(e) => { if (e.nativeEvent.key === 'Enter') { Keyboard.dismiss(); } }}
                                    selectTextOnFocus
                                />
                                <TouchableOpacity onPressIn={this.plusButtonPress.bind(this)} onPressOut={this.stopTimer.bind(this)}>
                                    <Image style={{ width: 32, height: 32, marginLeft: 15, marginTop: 5 }} source={Plus} />
                                </TouchableOpacity>
                            </View>
                            {this.warningMessage()}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 50 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>VALID UNTIL</Text>
                            <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'orderExpiryInfo')}><Image style={{ width: 20, height: 20, marginLeft: 5 }} source={Info} /></TouchableOpacity>
                        </View>
                        <TextInput
                            style={{ height: 42, width: 220, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', paddingLeft: 2, marginTop: 10 }}
                            placeholder="MM/DD/YYYY"
                            onFocus={() => { Keyboard.dismiss(); this.setState({ showDatePicker: true }); }}
                            value={moment(this.state.expDate).format('MMMM Do, YYYY')}
                            returnkeyType="done"
                        />
                    </View>
                </View>
                {this.datePicker()}
                {this.datePickerClose()}
                {this.state.infoLimitPricePopup}
                {this.state.infoOrderExpiryPopup}
            </View>
        );
    }
}
const limitPriceInfo = { top: 30, left: 0, width: 200, arrowPosition: 'top', message: DisclaimerData.infoTargetPrice };
<<<<<<< HEAD
const orderExpiryInfo = { top: 30, left: 280, width: 200, arrowPosition: 'top', message: DisclaimerData.infoOptionExpirationDate };
=======
const orderExpiryInfo = { top: 30, left: 270, width: 200, arrowPosition: 'top', message: DisclaimerData.infoOptionExpirationDate };

>>>>>>> 4f341e6bec93d3114e61763c2b1b56d6a3965121
const styles = {

    container: { flexDirection: 'row', marginTop: 16 }
};


const mapStateToProps = state => {
    return {
<<<<<<< HEAD
        bidPrice: state.selectedContractMonth.bidPrice,
        askPrice: state.selectedContractMonth.askPrice,
        lastTradeDate: state.selectedContractMonth.lastTradeDate
=======
        infoTargetPrice: st(state.displayProperties).filter(item => item.propKey === 'infoTargetPrice')[0].propValue,
        infoOptionExpirationDate: st(state.displayProperties).filter(item => item.propKey === 'infoOptionExpirationDate')[0].propValue
>>>>>>> 4f341e6bec93d3114e61763c2b1b56d6a3965121
    };
};

export default connect(mapStateToProps, null)(LimitOrder);
