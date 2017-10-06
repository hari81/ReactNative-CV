import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LimitOrder from './LimitOrder';
import * as commonStyles from '../../../Utils/styles';

class OrderType extends Component {
    constructor() {
        super();
        this.state = {
            isLimitOrder: false
        };
    }

    onMarketSelection() {
        this.setState({ isLimitOrder: false });
        this.props.onOrderTypeChange('market');
    }

    onLimitSelection() {
        this.setState({ isLimitOrder: true });
        this.props.onLimitPriceChange(this.getLimitPrice(this.props.selectedContractMonth));
        this.props.onOrderTypeChange('limit');
    }

    onLimitPriceChange(limitPrice) {
        this.props.onLimitPriceChange(limitPrice);
    }

    onExpiryDateChange(date) {
        this.props.onExpiryDateChange(date);
    }

    getLimitPrice(selectedContractMonth) {
        let tPrice = null;
        const scm = selectedContractMonth;
        if (scm !== null) {
            if (this.props.buySell.toLowerCase() === 'b' || this.props.buySell.toLowerCase() === 'buy') {
                tPrice = scm.askPrice === null ? scm.settlePrice : scm.askPrice;
            } else {
                tPrice = scm.bidPrice === null ? scm.settlePrice : scm.bidPrice;            
            }
            tPrice = tPrice === null ? '-' : parseFloat(tPrice).toFixed(4);
            return tPrice;
        }
        return 0;
    }

    render() {
        let tLimitOrder = null;
        if (this.state.isLimitOrder) {
            tLimitOrder = (
                <LimitOrder 
                    buySell={this.props.buySell}
                    tickSizeIncrement={this.props.tickSizeIncrement} 
                    selectedContractMonth={this.props.selectedContractMonth}
                    onLimitPriceChange={this.onLimitPriceChange.bind(this)}
                    onExpiryDateChange={this.onExpiryDateChange.bind(this)}
                />
            );
        }

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: '#fff' }}>ORDER TYPE</Text>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <TouchableOpacity onPress={this.onMarketSelection.bind(this)}>
                                <View style={commonStyles.common.radioButtonContainer}>
                                    {!this.state.isLimitOrder ? <View style={commonStyles.common.radioButtonSelected} /> : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={commonStyles.common.radioButtonText}>Market Order</Text>
                            <TouchableOpacity onPress={this.onLimitSelection.bind(this)}>
                                <View style={[commonStyles.common.radioButtonContainer, { marginLeft: 20 }]}>
                                    {this.state.isLimitOrder ? <View style={commonStyles.common.radioButtonSelected} /> : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={commonStyles.common.radioButtonText}>Limit Order</Text>
                        </View>
                    </View>
                </View>
                {tLimitOrder}
            </View>
        );
    }
}
const styles = {
    container: { flexDirection: 'column', marginTop: 10 },
    orderLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: '#fff' },
};

export default connect(null, null)(OrderType);
