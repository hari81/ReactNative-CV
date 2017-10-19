import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import bugsnag from '../../components/common/BugSnag';

class BidAskPrice extends Component {
    render() {
        try {
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
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}

const styles = {
    pricesContainer: { flexDirection: 'row', position: 'absolute', marginTop: 269, width: 480, height: 55, backgroundColor: '#5d6d79', padding: 40, paddingTop: 8, paddingBottom: 8, zIndex: -1 },
    priceContainer: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: 60 },
    priceLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', color: '#e7b514' },
    priceText: { color: '#fff', fontSize: 18, fontFamily: 'HelveticaNeue' }
};

export default connect(null, null)(BidAskPrice);
