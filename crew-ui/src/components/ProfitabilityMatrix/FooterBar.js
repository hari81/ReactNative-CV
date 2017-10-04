import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, Keyboard } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Minus from '../common/img/Minus-32.png';
import Plus from '../common/img/Plus.png';

class FooterBar extends Component {
    constructor() {
        super();
        this.state = {
            targetPrice: ''
        }
        this.timer = null;
    }
    onFocusMake = () => {
        this.setState({ targetPrice: (this.state.targetPrice.charAt(0) === '$') ? this.state.targetPrice.slice(1, this.state.targetPrice.length) : this.state.targetPrice });
    }
    onBlurMake = () => {
        this.setState({ targetPrice: '$' + this.state.targetPrice });
    }
    onChangeQuantity= (text) => {
        if (/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?[0-9]?[0-9]?$/.test(text) || text === '') {
            this.setState({ targetPrice: text });
        }
    }
    minusButtonPress = () => {
        if (parseFloat(this.state.targetPrice) >= parseFloat(this.state.tickSizeIncrement)) {
            this.setState({ targetPrice: ((parseFloat(this.state.targetPrice) - parseFloat(this.state.tickSizeIncrement)).toFixed(4)).toString() });
        }
        this.timer = setTimeout(this.minusButtonPress, 150);
    }
    plusButtonPress = () => {
        this.setState({ targetPrice: (((parseFloat(this.state.targetPrice)) + parseFloat(this.props.tickSizeIncrement)).toFixed(4)).toString() })
        this.timer = setTimeout(this.plusButtonPress, 150);
    }
    stopTimer = () => {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginLeft: width * 0.0195, justifyContent: 'center', alignItems: 'center', height: height * 0.097, width: width * 0.12, backgroundColor: 'rgba(82,97,115,0.37)' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>BREAK EVEN</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 33, fontFamily: 'HelveticaNeue' }}>$3.85</Text>
                </View>
                <View style={{ marginLeft: width * 0.0195, justifyContent: 'center', alignItems: 'center', height: height * 0.097, width: width * 0.12, backgroundColor: 'rgba(82,97,115,0.37)' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>TARGET PRICE</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 33, fontFamily: 'HelveticaNeue' }}>$4.05</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 13, fontFamily: 'HelveticaNeue' }}>Dec 2017</Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: width * 0.0195 }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, paddingLeft: width * 0.039, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>TARGET PRICE($)</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPressIn={this.minusButtonPress} onPressOut={this.stopTimer} >
                        <Image style={{ width: width * 0.031, height: height * 0.041, marginRight: 15, marginTop: 5 }} source={Minus} />
                      </TouchableOpacity>
                      <TextInput
                        style={{ height: height * 0.054, width: width * 0.109, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', padding: 2 }}
                        maxLength={9}
                        placeholder='0'
                        keyboardType='decimal-pad'
                        returnKeyType="done"
                        value={this.state.targetPrice}
                        onChangeText={this.onChangeQuantity}
                        onBlur={this.onBlurMake}
                        onFocus={this.onFocusMake}
                        onKeyPress={(e) => { if (e.nativeEvent.key === 'Enter') { Keyboard.dismiss(); } }}
                        selectTextOnFocus
                      />
                      <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.plusButtonPress} onPressOut={this.stopTimer}>
                        <Image style={{ width: width * 0.031, height: height * 0.041, marginLeft: 15, marginTop: 5 }} source={Plus} />
                      </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: width * 0.0195 }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, paddingLeft: width * 0.039, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>EXPECTED YIELD</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPressIn={this.minusButtonPress} onPressOut={this.stopTimer} >
                            <Image style={{ width: width * 0.031, height: height * 0.041, marginRight: width * 0.0146, marginTop: 5 }} source={Minus} />
                        </TouchableOpacity>
                        <TextInput
                            style={{ height: height * 0.054, width: width * 0.109, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', paddingLeft: width * 0.0097 }}
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
                            <Image style={{ width: width * 0.031, height: height * 0.041, marginLeft: width * 0.014, marginTop: 5 }} source={Plus} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity>
                    <View style={styles.placeOrderButtonStyle}>
                    <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 18, color: 'rgb(255,255,255)' }}>PLACE NEW ORDER NOW</Text>
                    </View>
                </TouchableOpacity>


            </View>

        );
    }
}
const { height, width } = Dimensions.get('window')
const styles = {
   container: {
       height: height * 0.130,
       backgroundColor: 'rgb(35,43,50)',
       flexDirection: 'row',
       alignItems: 'center'
   },
    placeOrderButtonStyle: {
        height: height * 0.052,
        width: width * 0.214,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.026,
        backgroundColor: 'rgb(39,153,137)',
        borderRadius: 4,
        marginLeft: width * 0.019
    }
}
export default FooterBar;
