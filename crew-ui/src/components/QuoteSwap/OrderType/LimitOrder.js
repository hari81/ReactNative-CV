import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, DatePickerIOS } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Minus from '../../common/img/Minus-32.png';
import Plus from '../../common/img/Plus.png';
import st from '../../../Utils/SafeTraverse';
import { onLimitSelection, onExpireSelection } from '../../../redux/actions/QuoteSwap/LimitOrderAction';
import Info from '../../common/img/Info-white.png';
import { InfoPopup } from '../../common/InfoPopup';
import DisclaimerData from '../../../restAPI/disclaimer.json';
import cancel from '../../common/img/Cancel-40.png';

class LimitOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limitPrice: parseFloat(props.bidPrice).toFixed(4).toString() || '',
            tickSizeIncrement: props.tickSizeIncrement,
            enableClick: true,
            showDatePicker: false,
            date: new Date(st(this.props, ['lastTradeDate']).concat('T00:00:00-06:00')) || '',
            infoLimitPricePopup: null,
            infoOrderExpiryPopup: null,
            dateFlag: false
        }
        this.timer = null;
    }
    componentDidMount() {
        this.props.onLimitSelection(this.state.limitPrice);
        this.props.onExpireSelection(this.state.date);
    }
    componentWillReceiveProps(newProps) {
        this.setState({ limitPrice: parseFloat(newProps.bidPrice).toFixed(4).toString() });
        this.setState({ date: new Date(newProps.lastTradeDate.concat('T00:00:00-06:00')) });
        this.props.onLimitSelection(newProps.bidPrice);
        this.props.onExpireSelection(newProps.lastTradeDate);
    }
    onFocusMake = () => {
       // this.props.scrollchanged();
        this.setState({ enableClick: false, limitPrice: (this.state.limitPrice.charAt(0) === '$') ? this.state.limitPrice.slice(1, this.state.limitPrice.length) : this.state.limitPrice });
    };
    onBlurMake = () => {
        this.setState({ enableClick: true, limitPrice: '$' + this.state.limitPrice });
        this.props.onLimitSelection(this.state.limitPrice);
    };
    onChangeQuantity= (text) => {
        if (/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/.test(text) || text === '') {
            this.setState({ limitPrice: text });
        }
    };
    minusButtonPress = () => {
        if (parseFloat(this.state.limitPrice) >= parseFloat(this.state.tickSizeIncrement)) {
            this.setState({ limitPrice: ((parseFloat(this.state.limitPrice) - parseFloat(this.state.tickSizeIncrement)).toFixed(4)).toString() });
        }
        this.timer = setTimeout(this.minusButtonPress, 50);
    };
    plusButtonPress = () => {
        this.setState({ limitPrice: (((parseFloat(this.state.limitPrice)) + parseFloat(this.props.tickSizeIncrement)).toFixed(4)).toString() })
        this.timer = setTimeout(this.plusButtonPress, 50);
    };
    stopTimer = () => {
        clearTimeout(this.timer);
    };
    warningMessage() {
        if (parseFloat(this.state.limitPrice) < (0.8 * parseFloat(this.props.bidPrice)) || parseFloat(this.state.limitPrice) > (1.2 * parseFloat(this.props.bidPrice))) {
            return <Text style={{ color: 'red', paddingLeft: 50 }}>Crossed 20% Limits</Text>;
        }
        return <Text />;
    }
    showInfoPopup(info) {
        switch (info) {
            case 'limitPriceInfo':
                const limitPricePopup = (<InfoPopup popupInfo={limitPriceInfo} onClose={this.hideInfoPopup} />);
                this.setState({ infoLimitPricePopup: limitPricePopup });
                break;
            case 'orderExpiryInfo':
                const orderExpiryPopup = (<InfoPopup popupInfo={orderExpiryInfo} onClose={this.hideInfoPopup} />);
                this.setState({ infoOrderExpiryPopup: orderExpiryPopup });
                break;
        }
    }
    hideInfoPopup = () => {
        const popup = (<View style={{ display: 'none' }} />);
        this.setState({ infoLimitPricePopup: popup, infoOrderExpiryPopup: popup });
    };
    datePicker() {
        if (this.state.showDatePicker) {
            return (
                <View style={{ position: 'absolute', marginTop: 45, marginLeft: 0 }} >
                    <DatePickerIOS
                        style={{ marginTop: -75, height: 200, width: 252, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: 'white', zIndex: 1 }}
                        date={this.state.date}
                        mode="date"
                        onDateChange={(date) => { this.setState({ date }); this.props.onExpireSelection(date); }}
                        minimumDate={new Date()}
                        maximumDate={new Date(this.props.lastTradeDate.concat('T00:00:00-06:00'))}
                    />
                </View>
            );
        }
    }
    datePickerClose() {
        if (this.state.showDatePicker) {
            return (<View style={{ marginTop: -30, height: 200, width: 20, position: 'absolute', marginLeft: 239, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: 'white', zIndex: 1 }}>
                    <TouchableOpacity onPress={() => { this.setState({ showDatePicker: false }); Keyboard.dismiss(); }}><Image source={cancel} style={{ height: 23, width: 23 }} /></TouchableOpacity>
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
                            <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>LIMIT PRICE</Text>
                            <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'limitPriceInfo')}><Image style={{ width: 20, height: 20, marginLeft: 5 }} source={Info} /></TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.minusButtonPress} onPressOut={this.stopTimer} >
                                    <Image style={{ width: 32, height: 32, marginRight: 15, marginTop: 5 }} source={Minus} />
                                </TouchableOpacity>
                                <TextInput
                                    style={{ height: 42, width: 112, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', padding: 2 }}
                                    maxLength={9}
                                    placeholder='0'
                                    keyboardType='decimal-pad'
                                    returnKeyType="done"
                                    value={this.state.limitPrice}
                                    onChangeText={this.onChangeQuantity}
                                    onBlur={this.onBlurMake}
                                    onFocus={this.onFocusMake}
                                    onKeyPress={(e) => { if (e.nativeEvent.key === 'Enter') { Keyboard.dismiss(); } }}
                                    selectTextOnFocus
                                />
                                <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.plusButtonPress} onPressOut={this.stopTimer}>
                                    <Image style={{ width: 32, height: 32, marginLeft: 15, marginTop: 5 }} source={Plus} />
                                </TouchableOpacity>
                            </View>
                            {this.warningMessage()}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 50 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>ORDER EXPIRATION DATE</Text>
                            <TouchableOpacity onPress={this.showInfoPopup.bind(this, 'orderExpiryInfo')}><Image style={{ width: 20, height: 20, marginLeft: 5 }} source={Info} /></TouchableOpacity>
                        </View>
                        <TextInput
                            style={{ height: 42, width: 220, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', paddingLeft: 2, marginTop: 10 }}
                            placeholder="MM/DD/YYYY"
                            onFocus={() => { Keyboard.dismiss(); this.setState({ showDatePicker: true }); }}
                            value={moment(this.state.date).format('MMMM Do, YYYY')}
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
const orderExpiryInfo = { top: 30, left: 280, width: 200, arrowPosition: 'top', message: DisclaimerData.infoOptionExpirationDate };
const styles = {
    container: {
        flexDirection: 'row',
        marginTop: 16
    }
};
const mapStateToProps = state => {
    return {
        bidPrice: state.selectedContractMonth.bidPrice,
        askPrice: state.selectedContractMonth.askPrice,
        lastTradeDate: state.selectedContractMonth.lastTradeDate
    };
};
export default connect(mapStateToProps, { onExpireSelection, onLimitSelection })(LimitOrder);
