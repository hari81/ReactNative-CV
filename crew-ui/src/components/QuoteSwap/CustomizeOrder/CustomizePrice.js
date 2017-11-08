import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { ImageButton } from '../../common/ImageButton';
import lock from '../../common/img/structure/smLock.png';
import coins from '../../common/img/structure/smCoins.png';
import calender from '../../common/img/structure/smCalendar.png';
import card from '../../common/img/structure/smCard.png';
import { Button } from '../../common/Button';

const { height, width } = Dimensions.get('window');

class CustomizePrice extends Component {
    constructor() {
        super();
        this.state = {
            floorPrice: 0,
            bonusPrice: 0,
            price: 0,
            showButtons: true
        };
        this.timer = null;
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
    priceText(id, price) {
        if (id !== 3) {
            if (!this.state.showButtons && id === 4) {
               return (
                   <Button buttonStyle={{ height: 20, justifyContent: 'center', alignItems: 'center', width: 110, backgroundColor: 'rgb(84, 100, 110)', marginTop: 2 }} textStyle={{ fontSize: 10, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>CALCULATE PRICE</Button>
               );
            }
            return (
            <Text style={[styles.PriceTextStyle, { fontSize: 22, fontFamily: 'HelveticaNeue' }]}>{price}</Text>
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
                    <Text style={{ paddingLeft: 20, fontFamily: 'HelveticaNeue-Thin', color: 'white', fontSize: 24 }}>Would
                        you like to hedge at these levels at price of $ 0.00?</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <ImageButton text='YES - Place Order Now!' />
                        <ImageButton text='NO - Customize Order' />
                    </View>
                </View>
            );
        }
    }
    fPricePlusButton = () => {
        this.setState({ showButtons: false });
        this.setState({ floorPrice: this.state.floorPrice + 0.01 });
        this.timer = setTimeout(this.fPricePlusButton, 50);
    }
    fPriceMinusButton = () => {
        this.setState({ showButtons: false });
        if (this.state.floorPrice >= 0.01) {
            this.setState({ floorPrice: this.state.floorPrice - 0.01 });
            this.timer = setTimeout(this.fPriceMinusButton, 50);
        }
    }
    bPricePlusButton = () => {
        this.setState({ showButtons: false });
        this.setState({ bonusPrice: this.state.bonusPrice + 0.01 });
        this.timer = setTimeout(this.bPricePlusButton, 50);
    }
    bPriceMinusButton = () => {
        this.setState({ showButtons: false });
        if (this.state.bonusPrice >= 0.01) {
            this.setState({ bonusPrice: this.state.bonusPrice - 0.01 });
            this.timer = setTimeout(this.bPriceMinusButton, 50);
        }
    }
    stopTimer() {
        clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={{ position: 'absolute', marginTop: height * 0.1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity onPressIn={this.fPricePlusButton} onPressOut={this.stopTimer.bind(this)}>
                            <View style={{ width: width * 0.128, height: 30, backgroundColor: 'rgb(34,116,148)', marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue-bold' }}>+</Text>
                            </View>
                        </TouchableOpacity>
                        {this.priceType(1, lock, 'Floor Price', '$'+ parseFloat(this.state.floorPrice).toFixed(2))}
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
                        {this.priceType(2, coins, 'Bonus Price', '$' + parseFloat(this.state.bonusPrice).toFixed(2))}
                        <TouchableOpacity onPressIn={this.bPriceMinusButton} onPressOut={this.stopTimer.bind(this)}>
                            <View style={{ width: width * 0.128, height: 30, backgroundColor: 'rgb(34,116,148)', marginLeft: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, color: 'rgb(255,255,255)', fontFamily: 'HelveticaNeue-bold' }}>-</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {this.priceType(3, calender, 'Pricing Period', `Sep 20, 2017 to       Nov 21, 2017`)}
                    {this.priceType(4, card, 'Price', '$'+ 3.33)}
                </View>
                {this.orderButtons()}
            </View>
        );
    }
}
const styles = {
    PriceViewStyle: { width: width * 0.128, height: height * 0.177, alignItems: 'center', backgroundColor: 'white', borderRadius: 0, borderWidth: 1, borderColor: '#01aca8', marginLeft: 20, marginTop: 30 },
    PriceTextStyle: { color: 'rgb(0,95,134)', fontFamily: 'HelveticaNeue-Light', fontSize: 16, paddingTop: 2 },
}
const mapStateToProps = state => {
    return {
        //cropButton: state.cropsButtons,
    };
};

export default connect(mapStateToProps, null)(CustomizePrice);