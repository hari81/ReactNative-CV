import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import Minus from '../common/img/Minus-32.png';
import Plus from '../common/img/Plus.png';
import * as common from '../../Utils/common';

class BushelQuantity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '',
            quantityIncrement: '0',
            enableClick: true
        };
        this.timer = null;
    }
    componentDidMount() {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)))
        this.setState({ quantityIncrement: crop[0].quantityIncrement === null ? '0' : crop[0].quantityIncrement.toString(), quantity: '' });
    }
    onFocusMake = () => {
        this.setState({ enableClick: false, quantity: this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1') });
    }
    onBlurMake = () => {
        this.setState({ enableClick: true, quantity: common.formatNumberCommas(this.state.quantity) });
        this.props.onQuantityChange(this.state.quantity);
    }
    onChangeQuantity = (text) => {
        if (/[0-9]+$/.test(text) || text === '') {
            if (text <= this.props.quantityLimit) {
                this.setState({ quantity: text });
            } else {
                Alert.alert(`Your Available Limit is ${common.formatNumberCommas(this.props.quantityLimit)} ${this.props.defaultAccountData.commodities[0].unitOfMeasure}s`);
                this.setState({ quantity: this.props.quantityLimit.toString() });
            }
        }
    }
    minusButtonPress= () => {
        if (parseInt(this.state.quantity) >= parseInt(this.state.quantityIncrement)) {
            this.setState({ quantity: (parseInt(this.state.quantity) - parseInt(this.state.quantityIncrement)).toString() });
        }
        this.timer = setTimeout(this.minusButtonPress, 50);
    }
    plusButtonPress= () => {
        if (parseInt(this.state.quantity) <= (this.props.quantityLimit - parseInt(this.state.quantityIncrement)) || this.state.quantity === '') {
            this.setState({ quantity: ((parseInt(this.state.quantity) || 0) + parseInt(this.state.quantityIncrement)).toString() });
            this.timer = setTimeout(this.plusButtonPress, 50);
        } else {
            Alert.alert(`Your Available Limit is ${common.formatNumberCommas(this.props.quantityLimit)} ${this.props.defaultAccountData.commodities[0].unitOfMeasure}s`);
            this.setState({ quantity: this.props.quantityLimit.toString() });
        }
    }
    stopTimer= () => {
        clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>BUSHEL QUANTITY</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.minusButtonPress} onPressOut={this.stopTimer} >
                        <Image style={{ width: 32, height: 32, marginRight: 15, marginTop: 5 }} source={Minus} />
                    </TouchableOpacity>
                    <TextInput
                        style={{ height: 42, width: 112, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', paddingLeft: 10 }}
                        maxLength={9}
                        keyboardType="decimal-pad"
                        returnKeyType="done"
                        placeholder="0"
                        onKeyPress={(e) => { if (e.nativeEvent.key === 'Enter') { Keyboard.dismiss(); } }}
                        onChangeText={this.onChangeQuantity}
                        value={this.state.quantity}
                        onBlur={this.onBlurMake}
                        onFocus={this.onFocusMake}
                        selectTextOnFocus
                    />
                    <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.plusButtonPress} onPressOut={this.stopTimer}>
                        <Image style={{ width: 32, height: 32, marginLeft: 15, marginTop: 5 }} source={Plus} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>35% HEDGED</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>Your Available Limit is {common.formatNumberCommas(this.props.quantityLimit)} {this.props.defaultAccountData.commodities[0].unitOfMeasure}s</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = {
    container: {
        flexDirection: 'column',
        marginTop: 16,
    }
}
const mapStateToProps = (state) => {
    return {
        defaultAccountData: state.account.defaultAccount,
        contractMonth: state.contractData,
        id: state.cropsButtons.selectedId,
        quantityLimit: Math.round(state.selectedContractMonth.bushelQuantity.shortLimitAvailable)
    };
}
export default connect(mapStateToProps, null)(BushelQuantity);
