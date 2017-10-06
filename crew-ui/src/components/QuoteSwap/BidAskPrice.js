import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

class BidAskPrice extends Component {
    render() {
        let bidPrice = '-';
        let askPrice = '-';
        let settlePrice = '-';
        if (this.props.selectedContractMonth !== null && this.props.selectedContractMonth.underlyingSymbol !== '') {
            const cm = this.props.selectedContractMonth;
            bidPrice = !cm.bidPrice || cm.bidPrice === null || cm.bidPrice === undefined ? '-' : parseFloat(cm.bidPrice).toFixed(4);
            askPrice = !cm.askPrice || cm.askPrice === null || cm.askPrice === undefined ? '-' : parseFloat(cm.askPrice).toFixed(4);
            settlePrice = !cm.settlePrice || cm.settlePrice === null || cm.settlePrice === undefined ? '-' : parseFloat(cm.settlePrice).toFixed(4);
        }
        return (
<<<<<<< HEAD
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: width * 0.039, marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>BID PRICE:</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>{bidPrice || 0}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: width * 0.058, marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>ASK PRICE:</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>{askPrice || 0}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: width * 0.058, marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>LAST SETTLE:</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>{settlePrice || 0}</Text>
=======
            <View style={styles.pricesContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>BID PRICE:</Text>
                    <Text style={styles.priceText}>${bidPrice}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>ASK PRICE:</Text>
                    <Text style={styles.priceText}>${askPrice}</Text>
                </View> 
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>LAST SETTLE:</Text>
                    <Text style={styles.priceText}>${settlePrice}</Text>
>>>>>>> 4f341e6bec93d3114e61763c2b1b56d6a3965121
                </View>
            </View>
        );
    }
}
<<<<<<< HEAD
const { width, height } = Dimensions.get('window')
const styles = {
    container: {
        flexDirection: 'row',
        marginTop: height * 0.35,
        width: width * 0.468,
        height: height * 0.0716,
        backgroundColor: 'rgb(93,109,121)',
        position: 'absolute',
        zIndex: -1
    }
}
const mapStateToProps = state => {
    return {
        bidPrice: state.selectedContractMonth.bidPrice,
        askPrice: state.selectedContractMonth.askPrice,
        settlePrice: state.selectedContractMonth.settlePrice,
        contractMonth: state.contractData
    };
}
export default connect(mapStateToProps, { bidPriceShow, askPriceShow })(BidAskPrice);
=======

const styles = {
    pricesContainer: { flexDirection: 'row', position: 'absolute', marginTop: 269, width: 480, height: 55, backgroundColor: '#5d6d79', padding: 40, paddingTop: 8, paddingBottom: 8, zIndex: -1 },
    priceContainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 60 },
    priceLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#e7b514' },
    priceText: { color: '#fff', fontSize: 18, fontFamily: 'HelveticaNeue' }
};

export default connect(null, null)(BidAskPrice);
>>>>>>> 4f341e6bec93d3114e61763c2b1b56d6a3965121
