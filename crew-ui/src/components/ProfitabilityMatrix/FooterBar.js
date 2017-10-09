import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Dimensions, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Minus from '../common/img/Minus-32.png';
import Plus from '../common/img/Plus.png';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';

class FooterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetPrice: '',
            yield: '',
            matrixPriceIncrement: ''
        }
        this.timer = null;
    }
    componentDidMount() {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)))
        this.setState({ targetPrice: parseFloat(this.props.targetPrice).toFixed(4).toString(), matrixPriceIncrement: crop[0].matrixPriceIncrement });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ matrixPriceIncrement: nextProps.priceIncrement });
    }
    onFocusMake = () => {
        Keyboard.dismiss();
    }
    minusPriceButtonPress = () => {
        if (parseFloat(this.state.targetPrice) >= parseFloat(this.state.matrixPriceIncrement)) {
            this.setState({ targetPrice: ((parseFloat(this.state.targetPrice) - parseFloat(this.state.matrixPriceIncrement)).toFixed(4)).toString() });
        }
        this.timer = setTimeout(this.minusPriceButtonPress, 300);
    }
    plusPriceButtonPress = () => {
        this.setState({ targetPrice: (((parseFloat(this.state.targetPrice)) + parseFloat(this.state.matrixPriceIncrement)).toFixed(4)).toString() })
        this.timer = setTimeout(this.plusPriceButtonPress, 300);
    }
    stopTimer = () => {
        clearTimeout(this.timer);
    }
    breakEvenPricePress(breakPrice) {
        this.setState({ targetPrice: parseFloat(breakPrice).toFixed(4) });
    }
    todayPricePress(todayPrice) {
        this.setState({ targetPrice: parseFloat(todayPrice).toFixed(4) });
    }
    targetPricePress(targetPrice) {
        this.setState({ targetPrice: parseFloat(targetPrice).toFixed(4) });
    }
    matrixToPlaceOrder = () => {
        Actions.quoteswap();
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.breakEvenPricePress.bind(this, this.props.breakEvenPrice)}>
                <View style={{ marginLeft: width * 0.01, justifyContent: 'center', alignItems: 'center', height: height * 0.1, width: width * 0.1, backgroundColor: 'rgba(82,97,115,0.37)' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontFamily: 'HelveticaNeue' }}>BREAK EVEN</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 30, fontFamily: 'HelveticaNeue' }}>${this.props.breakEvenPrice}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.todayPricePress.bind(this, this.props.todayPrice)}>
                <View style={{ marginLeft: width * 0.006, justifyContent: 'center', alignItems: 'center', height: height * 0.1, width: width * 0.1, backgroundColor: 'rgba(82,97,115,0.37)' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 11, fontFamily: 'HelveticaNeue' }}>TODAY'S PRICE</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 26, fontFamily: 'HelveticaNeue' }}>${this.props.todayPrice}</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 13, fontFamily: 'HelveticaNeue' }}>{this.props.underlyingData.underlyingMonthDesc} {this.props.underlyingData.underlyingYear}</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.targetPricePress.bind(this, this.props.targetPrice)}>
                <View style={{ marginLeft: width * 0.006, justifyContent: 'center', alignItems: 'center', height: height * 0.1, width: width * 0.1, backgroundColor: 'rgba(82,97,115,0.37)' }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 12, fontFamily: 'HelveticaNeue' }}>TARGET PRICE</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 30, fontFamily: 'HelveticaNeue' }}>${this.props.targetPrice}</Text>
                </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', marginLeft: width * 0.0195 }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, paddingLeft: width * 0.039, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>TARGET PRICE($)</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPressIn={this.minusPriceButtonPress} onPressOut={this.stopTimer} >
                        <Image style={{ width: width * 0.031, height: height * 0.041, marginRight: 15, marginTop: 5 }} source={Minus} />
                      </TouchableOpacity>
                      <TextInput
                        style={{ height: height * 0.054, width: width * 0.09, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', padding: 2 }}
                        maxLength={9}
                        placeholder='0'
                        value={this.state.targetPrice}
                        onFocus={this.onFocusMake}
                      />
                      <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.plusPriceButtonPress} onPressOut={this.stopTimer}>
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
                            style={{ height: height * 0.054, width: width * 0.09, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', paddingLeft: width * 0.0097 }}
                            maxLength={9}
                            placeholder="0"
                            value={this.state.yield}
                            onFocus={this.onFocusMake}
                        />
                        <TouchableOpacity disabled={this.state.enableClick} onPressIn={this.plusButtonPress} onPressOut={this.stopTimer}>
                            <Image style={{ width: width * 0.031, height: height * 0.041, marginLeft: width * 0.014, marginTop: 5 }} source={Plus} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={this.matrixToPlaceOrder}>
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
const mapStateToProps = (state) => {
    return {

        defaultAccountData: state.account.defaultAccount,
        id: state.cropsButtons.selectedId,

        targetPrice: st(state.dashBoardData, ['Data', 'myFarmTiles', 'targetPrice']) === null ? '   -' : parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'targetPrice'])).toFixed(2),
        todayPrice: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price'])).toFixed(4),
        breakEvenPrice: st(state.dashBoardData, ['Data', 'myFarmTiles', 'breakEvenPrice']) === null ? '   -' : parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'breakEvenPrice'])).toFixed(2),
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol)
    };
}
export default connect(mapStateToProps, null)(FooterBar);
