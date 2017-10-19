import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, DatePickerIOS } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Info from '../../common/img/Info-white.png';
import { InfoPopup } from '../../common/InfoPopup';
import cancel from '../../common/img/Cancel-40.png';
import * as common from '../../../Utils/common';
import bugsnag from '../../common/BugSnag';

class LimitOrder extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            limitPrice: common.getLimitPrice(this.props.selectedContractMonth, this.props.buySell),
            expDate: common.getExpDate(this.props.selectedContractMonth),
            showDatePicker: false,
            infoLimitPricePopup: null,
            infoOrderExpiryPopup: null,
            dateFlag: false
        };
        this.timer = null;
        this.limitPriceInfo = { top: 30, left: 0, width: 200, arrowPosition: 'top', message: this.props.infoTargetPrice };
        this.orderExpiryInfo = { top: 30, left: 270, width: 200, arrowPosition: 'top', message: this.props.infoOptionExpirationDate };
    }

    componentWillReceiveProps(nextProps) {
        //transmits the change in selected contract month
        if (this.props.selectedContractMonth.id !== nextProps.selectedContractMonth.id) {
            const tPrice = common.getLimitPrice(nextProps.selectedContractMonth, this.props.buySell);
            this.setState({ limitPrice: tPrice });
            const tDate = common.getExpDate(nextProps.selectedContractMonth);
            this.setState({ expDate: tDate });
        }
    }

    onLimitPriceChange(limitPrice) {
        this.props.onLimitPriceChange(limitPrice);
    }

    onExpiryDateChange(date) {
        this.setState({ expDate: date });
        this.props.onExpiryDateChange(date);
    }

    onFocusMake() {
        this.props.onScrollUpdate();
        this.setState({ limitPrice: (this.state.limitPrice.charAt(0) === '$') ? this.state.limitPrice.slice(1, this.state.limitPrice.length) : this.state.limitPrice });
    }

    onBlurMake() {
        this.props.onScrollDown();
        let tlp = this.state.limitPrice.charAt(0) === '$' ? this.state.limitPrice.slice(1, this.state.limitPrice.length) : this.state.limitPrice;
        tlp = parseFloat(tlp).toFixed(4);
        this.setState({ limitPrice: `$${tlp}` });
        this.onLimitPriceChange(this.state.limitPrice);
    }

    onChangeQuantity(text) {
        if (/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/.test(text) || text === '') {
            this.setState({ limitPrice: text });
            this.onLimitPriceChange(text);
        }
    }

    minusButtonPress = () => {
        try {
            const lp = common.cleanNumericString(this.state.limitPrice);            
            if (parseFloat(lp) >= parseFloat(this.props.tickSizeIncrement)) {
                const tPrice = ((parseFloat(lp) - parseFloat(this.props.tickSizeIncrement)).toFixed(4));
                this.setState({ limitPrice: `$${tPrice}` });
                this.onLimitPriceChange(tPrice);
            }
            this.timer = setTimeout(this.minusButtonPress, 200);
        } catch (error) {
            console.log(error);
        }
    }

    plusButtonPress = () => {
        try {
            const lp = common.cleanNumericString(this.state.limitPrice);            
            const tPrice = ((parseFloat(lp) + parseFloat(this.props.tickSizeIncrement)).toFixed(4));
            this.setState({ limitPrice: `$${tPrice}` });
            this.onLimitPriceChange(tPrice);
            this.timer = setTimeout(this.plusButtonPress, 200);
        } catch (error) {
            console.log(error);
        }
    }

    stopTimer() {
        clearTimeout(this.timer);
    }

    warningMessage() {
        const lp = common.cleanNumericString(this.state.limitPrice);
        if (parseFloat(lp) < (0.8 * parseFloat(this.props.selectedContractMonth.bidPrice)) || parseFloat(lp) > (1.2 * parseFloat(this.props.selectedContractMonth.bidPrice))) {
            return <Text style={{ color: 'red', paddingLeft: 50 }}>Crossed 20% Limits</Text>;
        }
        return <Text />;
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
        try {
            return (
                <View>
                    <View style={styles.container}>
                        <View style={{flexDirection: 'column', zIndex: -1}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 16,
                                    fontFamily: 'HelveticaNeue',
                                    paddingBottom: 10
                                }}>LIMIT PRICE</Text>
                                <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'limitPriceInfo')}><Image
                                    style={{width: 20, height: 20, marginLeft: 5}} source={Info}/></TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity onPressIn={this.minusButtonPress}
                                                      onPressOut={this.stopTimer.bind(this)}>
                                        <Text style={[styles.updownIcon, {marginTop: 5, marginRight: 15}]}>-</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        style={{
                                            height: 42,
                                            width: 112,
                                            borderRadius: 4,
                                            backgroundColor: '#fff',
                                            padding: 2
                                        }}
                                        maxLength={9}
                                        placeholder='0'
                                        keyboardType='decimal-pad'
                                        returnKeyType="done"
                                        value={this.state.limitPrice}
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
                                    <TouchableOpacity onPressIn={this.plusButtonPress}
                                                      onPressOut={this.stopTimer.bind(this)}>
                                        <Text
                                            style={[styles.updownIcon, {marginTop: 5, marginLeft: 15, paddingLeft: 9}]}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                {this.warningMessage()}
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', marginLeft: 50}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 16, fontFamily: 'HelveticaNeue', color: '#fff'}}>VALID
                                    UNTIL</Text>
                                <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'orderExpiryInfo')}><Image
                                    style={{width: 20, height: 20, marginLeft: 5}} source={Info}/></TouchableOpacity>
                            </View>
                            <TextInput
                                style={{
                                    height: 42,
                                    width: 220,
                                    borderRadius: 4,
                                    backgroundColor: '#fff',
                                    paddingLeft: 2,
                                    marginTop: 10
                                }}
                                placeholder="MM/DD/YYYY"
                                onFocus={() => {
                                    Keyboard.dismiss();
                                    this.setState({showDatePicker: true});
                                }}
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
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const styles = {
    container: { flexDirection: 'row', marginTop: 16 },
    updownIcon: { fontSize: 23, fontFamily: 'HelveticaNeue-Bold', color: '#fff', width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', paddingLeft: 11 }     
};


const mapStateToProps = state => {
    return {
        infoTargetPrice: state.displayProperties.filter(item => item.propKey === 'infoTargetPrice')[0].propValue,
        infoOptionExpirationDate: state.displayProperties.filter(item => item.propKey === 'infoOptionExpirationDate')[0].propValue
    };
};

export default connect(mapStateToProps, null)(LimitOrder);
