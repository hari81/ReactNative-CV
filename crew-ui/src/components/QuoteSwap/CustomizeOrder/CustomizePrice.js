import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import ImageButton from '../../common/ImageButton';
import lock from '../../common/img/structure/smLock.png';
import coins from '../../common/img/structure/smCoins.png';
import calender from '../../common/img/structure/smCalendar.png';
import card from '../../common/img/structure/smCard.png';
import { Button } from '../../common/Button';
import * as common from '../../../Utils/common';
import { optimalSuggestedQuote } from '../../../redux/actions/QuoteSwap/SuggestedQuote';
import { Spinner } from '../../common/Spinner';
import { estimateProfit } from '../../../redux/actions/QuoteSwap/EstimatedProfitAction';

const { height, width } = Dimensions.get('window');

class CustomizePrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floorPrice: common.isValueExists(props.fPrice) ? props.fPrice : 0,
            bonusPrice: common.isValueExists(props.bPrice) ? props.bPrice : 0,
            price: this.props.sugcust === 'sug' ? 0 : props.price,
            showButtons: props.customFlag,
            flag: false
        };
        this.timer = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.spin) {
            this.setState({ flag: true });
        }
        if (this.state.price !== nextProps.price) {
          this.setState({ price: nextProps.price });
        }
        if (this.state.flag) {

            this.props.estimateProfit(2, 'Start', this.state);
            this.props.estimateProfit(2, '', this.state);
            this.setState({ flag: false });
        }
    }
    priceType(id, img, text, price) {
        return (
            <View style={[styles.PriceViewStyle, { marginTop: id === 3 || id === 4 ? 32 : 0 }]}>
                <Image source={img} marginTop={8} />
                <Text style={id !== 3 ? styles.PriceTextStyle : [styles.PriceTextStyle, { fontSize: 12 }]}>{text}</Text>
                {this.priceText(id, price)}
            </View>
        );
    }
    calculatePrice = () => {
        this.props.optimalSuggestedQuote(2, this.state);
        this.setState({ showButtons: true });
    };
    priceText(id, price) {

        if (id !== 3) {
            if (!this.state.showButtons && id === 4) {
               return (
                   <Button onPress={this.calculatePrice} buttonStyle={{ height: 26, justifyContent: 'center', alignItems: 'center', width: 110, backgroundColor: 'rgb(84, 100, 110)', marginTop: 1 }} textStyle={{ fontSize: 10, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>CALCULATE PRICE</Button>
               );
            }
            if (this.props.spin && id === 4) {
                return (<Spinner size='small' color='black' />);
            }
            if (id === 4) {
                const pri = common.minusBeforeDollarSign(Math.abs(parseFloat(price).toFixed(2)), 2);
                return (
                    <Text style={[styles.PriceTextStyle, { fontSize: 22, fontFamily: 'HelveticaNeue', color: price < 0 ? 'red' : 'green' }]}>{ price === '0.00' ? pri : parseFloat(price) < 0 ? 'Cost ' + pri : 'Credit ' + pri}</Text>
                );
            }
            return (
                <Text style={[styles.PriceTextStyle, { fontSize: 22, fontFamily: 'HelveticaNeue', color: 'rgb(0,95,134)' }]}>${parseFloat(price).toFixed(2)}</Text>
            );
        }
        return (
            <Text style={[styles.PriceTextStyle, { fontSize: 13, textAlign: 'center', fontFamily: 'HelveticaNeue' }]}>{price}</Text>
        );
    }
    orderButtons() {
        if (this.state.showButtons) {
            return (
                <View style={{ position: 'absolute', marginTop: 226 }}>
                    <Text style={{ paddingLeft: 20, fontFamily: 'HelveticaNeue-Thin', color: 'white', fontSize: 22 }}>
                        Would you like to hedge these levels {this.state.price === 0 ? 'at $0 cost' : this.state.price < 0 ? `at a cost of $${Math.abs(this.state.price).toFixed(2)}` : `for a credit of $${this.state.price.toFixed(2)}`}?</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <ImageButton text='YES - Review Order' onPress={this.onReviewOrder} />
                        <ImageButton text='NO, work these levels at $0 cost' onPress={this.onWorkLevelsCost} />
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }
    onReviewOrder = () => {
        Actions.structureOrderReview({ cust: 'customize', floorP: this.state.floorPrice, bonusP: this.state.bonusPrice });
    };
    onWorkLevelsCost = () => {
        Actions.structureOrderReview({ cust: 'customize', level: 'zero', floorP: this.state.floorPrice, bonusP: this.state.bonusPrice });
    };
    fPricePlusButton = () => {
        this.setState({ showButtons: false });
        if (common.isValueExists(this.state.floorPrice)) {
            this.setState({ floorPrice: (parseFloat(this.state.floorPrice) + 0.01).toFixed(2) });
            this.timer = setTimeout(this.fPricePlusButton, 50);
        }
    };
    fPriceMinusButton = () => {
        this.setState({ showButtons: false });
        if (common.isValueExists(this.state.floorPrice)) {
        if (this.state.floorPrice >= 0.01) {
            this.setState({ floorPrice: (parseFloat(this.state.floorPrice) - 0.01).toFixed(2) });
            this.timer = setTimeout(this.fPriceMinusButton, 50);
        }
        }
    };
    bPricePlusButton = () => {
        this.setState({ showButtons: false });
        if (common.isValueExists(this.state.floorPrice)) {
            this.setState({ bonusPrice: (parseFloat(this.state.bonusPrice) + 0.01).toFixed(2) });
            this.timer = setTimeout(this.bPricePlusButton, 50);
        }
    };
    bPriceMinusButton = () => {
        this.setState({ showButtons: false });
        if (common.isValueExists(this.state.floorPrice)) {
            if (this.state.bonusPrice >= 0.01) {
                this.setState({ bonusPrice: (parseFloat(this.state.bonusPrice) - 0.01).toFixed(2) });
                this.timer = setTimeout(this.bPriceMinusButton, 50);
            }
        }
    };
    stopTimer() {
        this.props.onPriceChange(this.state.bonusPrice);
        clearTimeout(this.timer);
    }
    render() {
        const pPeriod = `Today to \n${common.formatDate(this.props.eDate, 5)}`;
        return (
            <View style={{ position: 'absolute', marginTop: height * 0.1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity onPressIn={this.fPricePlusButton} onPressOut={this.stopTimer.bind(this)}>
                            <View style={{ width: width * 0.128, height: 30, backgroundColor: 'rgb(34,116,148)', marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue-bold' }}>+</Text>
                            </View>
                        </TouchableOpacity>
                        {this.priceType(1, lock, 'Floor Price', this.state.floorPrice)}
                        <TouchableOpacity onPressIn={this.fPriceMinusButton} onPressOut={this.stopTimer.bind(this)}>
                            <View style={{ width: width * 0.128, height: 30, backgroundColor: 'rgb(34,116,148)', marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue-bold' }}>-</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity onPressIn={this.bPricePlusButton} onPressOut={this.stopTimer.bind(this)}>
                            <View style={{ width: width * 0.128, height: 30, backgroundColor: 'rgb(34,116,148)', marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue-bold' }}>+</Text>
                            </View>
                        </TouchableOpacity>
                        {this.priceType(2, coins, 'Bonus Price', this.state.bonusPrice)}
                        <TouchableOpacity onPressIn={this.bPriceMinusButton} onPressOut={this.stopTimer.bind(this)}>
                            <View style={{ width: width * 0.128, height: 30, backgroundColor: 'rgb(34,116,148)', marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue-bold' }}>-</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {this.priceType(3, calender, 'Pricing Period', pPeriod)}
                    {this.priceType(4, card, 'Price', parseFloat(this.state.price).toFixed(2))}
                </View>
                {this.orderButtons()}
            </View>
        );
    }
}
const styles = {
    PriceViewStyle: { width: width * 0.128, height: height * 0.177, alignItems: 'center', backgroundColor: 'white', borderRadius: 0, borderWidth: 1, borderColor: '#01aca8', marginLeft: 20, marginTop: 30 },
    PriceTextStyle: { color: 'rgb(0,95,134)', fontFamily: 'HelveticaNeue-Light', fontSize: 16, paddingTop: 2 },
};
const mapStateToProps = state => {
    return {
        sDate: common.isValueExists(state.optimalQuote.suggestedQuote.accrualStartDate) ? state.optimalQuote.suggestedQuote.accrualStartDate : '-',
        eDate: common.isValueExists(state.optimalQuote.suggestedQuote.metadata.expirationDate) ? state.optimalQuote.suggestedQuote.metadata.expirationDate : '-',
        spin: state.optimalQuote.spinFlag,
        price: common.isValueExists(state.optimalQuote.suggestedQuote.price) ? state.optimalQuote.suggestedQuote.price : 0,
        customFlag: state.optimalQuote.custFlag
    };
};

export default connect(mapStateToProps, { optimalSuggestedQuote, estimateProfit })(CustomizePrice);
