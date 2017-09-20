import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Minus from '../common/img/Minus-32.png';
import Plus from '../common/img/Plus.png';

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
    componentWillReceiveProps(newProps) {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)))
        this.setState({ quantityIncrement: crop[0].quantityIncrement.toString() });
    }
    minusButtonPress= () => {
        if (parseInt (this.state.quantity) >= parseInt(this.state.quantityIncrement)) {
            this.setState({ quantity: (parseInt(this.state.quantity) - parseInt(this.state.quantityIncrement)).toString() });
        }
        this.timer = setTimeout(this.minusButtonPress, 50);
    }
    plusButtonPress= () => {
        //hard coding max Limit quantity for now,when the service is ready hook up
        if (parseInt(this.state.quantity) <= 99999999 || this.state.quantity === '') {
            this.setState({ quantity: ((parseInt(this.state.quantity) || 0) + parseInt(this.state.quantityIncrement)).toString() });
        }
        this.timer = setTimeout(this.plusButtonPress, 50);
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
                        style={{ height: 42, width: 112, borderRadius: 4,backgroundColor: 'rgb(255,255,255)', paddingLeft: 10}}
                        maxLength={9}
                        keyboardType="decimal-pad"
                        returnKeyType="done"
                        placeholder="0"
                        onKeyPress={(e) => { if (e.nativeEvent.key === 'Enter') { Keyboard.dismiss()} }}
                        onChangeText={(text) => { if (/[0-9]+$/.test(text) || text === '') { return this.setState({ quantity: text }); } }}
                        value={this.state.quantity}
                        onBlur={() => { this.setState({ enableClick: true, quantity: this.state.quantity.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }); this.props.onQuantityChange(this.state.quantity); }}
                        onFocus={() => this.setState({ enableClick: false,quantity: this.state.quantity.replace(/(\d+),(?=\d{3}(\D|$))/g, '$1') })}
                        selectTextOnFocus
                    />
                    <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.plusButtonPress} onPressOut={this.stopTimer}>
                        <Image style={{ width: 32, height: 32, marginLeft: 15, marginTop: 5 }} source={Plus} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>35% HEDGED</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>Your Available Limit is 40,000 bushels</Text>
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
        id: state.cropsButtons.selectedId
    };
}
export default connect(mapStateToProps, null)(BushelQuantity);
