import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';
import { profitabilityMatrixData } from '../../redux/actions/ProfitabilityMatrixAction';
import { Button } from '../../components/common';
import { Actions } from 'react-native-router-flux';
import bugsnag from '../../components/common/BugSnag';

class FooterBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            targetPrice: '',
            expectedYield: '',
            matrixPriceIncrement: '',
            matrixYieldIncrement: ''
        }
        this.timer = null;
    }
    componentWillMount() {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)))
        this.setState({ targetPrice: (this.props.todayPrice).toString(),
                        expectedYield: this.props.expectedYield.toString(),
                        matrixPriceIncrement: crop[0].matrixPriceIncrement,
                        matrixYieldIncrement: crop[0].matrixYieldIncrement
                    });
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ matrixPriceIncrement: nextProps.priceIncrement, matrixYieldIncrement: nextProps.yieldIncrement });
        if (this.state.matrixPriceIncrement !== nextProps.priceIncrement || this.state.matrixYieldIncrement !== nextProps.yieldIncrement) {
            this.props.profitabilityMatrixData({ targetPrice: this.state.targetPrice,
                                                expectedYield: this.state.expectedYield,
                                                matrixPriceIncrement: nextProps.priceIncrement,
                                                matrixYieldIncrement: nextProps.yieldIncrement });
        }
    }
    onFocusMake = () => {
        Keyboard.dismiss();
    }

    minusButtonPress(val) {
        switch (val) {
            case 'price':
                if (parseFloat(this.state.targetPrice) >= parseFloat(this.state.matrixPriceIncrement)) {
                    this.setState({ targetPrice: ((parseFloat(this.state.targetPrice) - parseFloat(this.state.matrixPriceIncrement)).toFixed(2)).toString() });
                }
                break;
            case 'yield':
                if (parseFloat(this.state.expectedYield) >= parseFloat(this.state.matrixYieldIncrement)) {
                    this.setState({ expectedYield: (parseFloat(this.state.expectedYield) - parseFloat(this.state.matrixYieldIncrement)).toString() });
                }
        }
    }
    plusButtonPress(val) {
        switch (val) {
            case 'price':
                this.setState({ targetPrice: (((parseFloat(this.state.targetPrice)) + parseFloat(this.state.matrixPriceIncrement)).toFixed(2)).toString() });
                break;
            case 'yield':
                this.setState({ expectedYield: ((parseFloat(this.state.expectedYield)) + parseFloat(this.state.matrixYieldIncrement)).toString() });
        }
    }
    breakEvenPricePress(breakPrice) {
        this.setState({ targetPrice: breakPrice.toString() });
    }
    todayPricePress(todayPrice) {
        this.setState({ targetPrice: todayPrice.toString() });
    }
    targetPricePress(targetPrice) {
        this.setState({ targetPrice: targetPrice.toString() });
    }
    reCalculate = () => {
        this.props.profitabilityMatrixData(this.state);
    }
    matrixToPlaceOrder = () => {
        //const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
       // Actions.quoteswap({ cropcode: Crop[0].code, cropyear: Crop[0].cropYear });
        Actions.whatToday();
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPressIn={this.breakEvenPricePress.bind(this, this.props.breakEvenPrice)}
                                      onPressOut={this.reCalculate}>
                        <View style={{
                            marginLeft: width * 0.01,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: height * 0.1,
                            width: width * 0.1,
                            backgroundColor: 'rgba(82,97,115,0.37)'
                        }}>
                            <Text style={{color: 'rgb(255,255,255)', fontSize: 12, fontFamily: 'HelveticaNeue'}}>BREAK
                                EVEN</Text>
                            <Text style={{
                                color: 'rgb(255,255,255)',
                                fontSize: 30,
                                fontFamily: 'HelveticaNeue'
                            }}>${this.props.breakEvenPrice.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={this.todayPricePress.bind(this, this.props.todayPrice)}
                                      onPressOut={this.reCalculate}>
                        <View style={{
                            marginLeft: width * 0.006,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: height * 0.1,
                            width: width * 0.1,
                            backgroundColor: 'rgba(82,97,115,0.37)'
                        }}>
                            <Text style={{color: 'rgb(255,255,255)', fontSize: 11, fontFamily: 'HelveticaNeue'}}>TODAY'S
                                PRICE</Text>
                            <Text style={{
                                color: 'rgb(255,255,255)',
                                fontSize: 26,
                                fontFamily: 'HelveticaNeue'
                            }}>${this.props.todayPrice.toFixed(2)}</Text>
                            <Text style={{
                                color: 'rgb(255,255,255)',
                                fontSize: 13,
                                fontFamily: 'HelveticaNeue'
                            }}>{this.props.underlyingData.underlyingMonthDesc} {this.props.underlyingData.underlyingYear}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPressIn={this.targetPricePress.bind(this, this.props.targetPrice)}
                                      onPressOut={this.reCalculate}>
                        <View style={{
                            marginLeft: width * 0.006,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: height * 0.1,
                            width: width * 0.1,
                            backgroundColor: 'rgba(82,97,115,0.37)'
                        }}>
                            <Text style={{color: 'rgb(255,255,255)', fontSize: 12, fontFamily: 'HelveticaNeue'}}>TARGET
                                PRICE</Text>
                            <Text style={{
                                color: 'rgb(255,255,255)',
                                fontSize: 30,
                                fontFamily: 'HelveticaNeue'
                            }}>${this.props.targetPrice.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'column', marginLeft: width * 0.0195}}>
                        <Text style={{
                            color: 'rgb(255,255,255)',
                            fontSize: 16,
                            paddingLeft: width * 0.069,
                            fontFamily: 'HelveticaNeue',
                            paddingBottom: 10,
                        }}>PRICE</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPressIn={this.minusButtonPress.bind(this, 'price')}
                                              onPressOut={this.reCalculate}>
                                <Text style={[styles.updownIcon, {marginTop: 5, marginRight: 15}]}>-</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={{
                                    height: height * 0.054,
                                    width: width * 0.09,
                                    borderRadius: 4,
                                    backgroundColor: 'rgb(255,255,255)',
                                    padding: 2
                                }}
                                maxLength={9}
                                placeholder='0'
                                value={parseFloat(this.state.targetPrice).toFixed(2)}
                                onFocus={this.onFocusMake}
                            />
                            <TouchableOpacity onPressIn={this.plusButtonPress.bind(this, 'price')}
                                              onPressOut={this.reCalculate}>
                                <Text
                                    style={[styles.updownIcon, {marginTop: 5, marginLeft: 15, paddingLeft: 9}]}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                <View style={{ flexDirection: 'column', marginLeft: width * 0.0195 }}>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, paddingLeft: width * 0.069, fontFamily: 'HelveticaNeue', paddingBottom: 10 }}>YIELD</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPressIn={this.minusButtonPress.bind(this, 'yield')} onPressOut={this.reCalculate} >
                            <Text style={[styles.updownIcon, { marginTop: 5, marginRight: 15 }]}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={{ height: height * 0.054, width: width * 0.09, borderRadius: 4, backgroundColor: 'rgb(255,255,255)', paddingLeft: width * 0.0097 }}
                            maxLength={9}
                            placeholder="0"
                            value={this.state.expectedYield}
                            onFocus={this.onFocusMake}
                        />
                        <TouchableOpacity onPressIn={this.plusButtonPress.bind(this, 'yield')} onPressOut={this.reCalculate}>
                            <Text style={[styles.updownIcon, { marginTop: 5, marginLeft: 15, paddingLeft: 9 }]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Button buttonStyle={styles.placeOrderButtonStyle} textStyle={{ fontFamily: 'HelveticaNeue-Light', fontSize: 18, color: 'rgb(255,255,255)' }} onPress={this.matrixToPlaceOrder}>
                    PLACE NEW ORDER NOW
                </Button>
            </View>

            );
        } catch (error) {
            bugsnag.notify(error);
        }
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
        height: height * 0.054,
        width: width * 0.214,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.01,
        backgroundColor: 'rgb(39,153,137)',
        borderRadius: 4,
        marginLeft: width * 0.019
    },
    updownIcon: { fontSize: 23, fontFamily: 'HelveticaNeue-Bold', color: '#fff', width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', paddingLeft: 11 }
}
const mapStateToProps = (state) => {
    return {

        defaultAccountData: state.account.defaultAccount,
        id: state.cropsButtons.selectedId,
        cropButton: state.cropsButtons,
        acc: state.account,

        targetPrice: st(state.dashBoardData, ['Data', 'myFarmTiles', 'targetPrice']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'targetPrice'])),
        todayPrice: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price'])),
        breakEvenPrice: st(state.dashBoardData, ['Data', 'myFarmTiles', 'breakEvenPrice']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'myFarmTiles', 'breakEvenPrice'])),
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol),
        expectedYield: st(state.dashBoardData, ['Data', 'myFarmProduction', 'expectedYield']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'expectedYield']))
    };
}
export default connect(mapStateToProps, { profitabilityMatrixData })(FooterBar);
