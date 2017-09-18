import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import normalRadioBTN from '../../common/img/Radio-BTN-normal.png';
import selectedRadioBTN from '../../common/img/Radio-BTN-selected.png';
import LimitOrder from './LimitOrder';
export default class OrderType extends Component {
    constructor() {
        super();
        this.state = {
            radioBTNEnableMarket: true,
            radioBTNEnableLimit: false
        };
    }
    limitOrder() {
        if (this.state.radioBTNEnableLimit) {
            return <LimitOrder />;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>ORDER TYPE</Text>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => this.setState({ radioBTNEnableMarket: true, radioBTNEnableLimit: false })}><Image style={{ width: 32, height: 32 }} source={this.state.radioBTNEnableMarket ? selectedRadioBTN : normalRadioBTN} /></TouchableOpacity>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: 'rgb(255,255,255)', paddingRight: 45 }}>Market Order</Text>
                        <TouchableOpacity onPress={() => this.setState({ radioBTNEnableMarket: false, radioBTNEnableLimit: true })}><Image style={{ width: 32, height: 32 }} source={this.state.radioBTNEnableLimit ? selectedRadioBTN:normalRadioBTN} /></TouchableOpacity>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: 'rgb(255,255,255)' }}>Limit Order</Text>
                    </View>
                </View>
                {this.limitOrder()}
            </View>
        );
    }
}
const styles = {
    container: {
        flexDirection: 'column',
        marginTop: 10
    }
};
