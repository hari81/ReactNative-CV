import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LimitOrder from './LimitOrder';
import * as commonStyles from '../../../Utils/styles';
import * as common from '../../../Utils/common';
import bugsnag from '../../common/BugSnag';

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
        this.props.onLimitPriceChange(common.getLimitPrice(this.props.selectedContractMonth, this.props.buySell));
        this.props.onExpiryDateChange(common.getExpDate(this.props.selectedContractMonth));
        this.props.onOrderTypeChange('limit');
    }

    onLimitPriceChange(limitPrice) {
        this.props.onLimitPriceChange(limitPrice);
    }

    onExpiryDateChange(date) {
        this.props.onExpiryDateChange(date);
    }

    onScrollUpdate() {
        this.props.onScrollUpdate();
    }

    onScrollDown() {
        this.props.onScrollDown();
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            let tLimitOrder = null;
            if (this.state.isLimitOrder) {
                tLimitOrder = (
                    <LimitOrder
                        buySell={this.props.buySell}
                        tickSizeIncrement={this.props.tickSizeIncrement}
                        selectedContractMonth={this.props.selectedContractMonth}
                        onLimitPriceChange={this.onLimitPriceChange.bind(this)}
                        onExpiryDateChange={this.onExpiryDateChange.bind(this)}
                        onScrollUpdate={this.onScrollUpdate.bind(this)}
                        onScrollDown={this.onScrollDown.bind(this)}
                    />
                );
            }

            return (
                <View style={styles.container}>
                    <Text style={{fontSize: 16, fontFamily: 'HelveticaNeue', color: '#fff'}}>ORDER TYPE</Text>
                    <View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                <TouchableOpacity onPress={this.onMarketSelection.bind(this)}>
                                    <View style={commonStyles.common.radioButtonContainer}>
                                        {!this.state.isLimitOrder ?
                                            <View style={commonStyles.common.radioButtonSelected}/> : null}
                                    </View>
                                </TouchableOpacity>
                                <Text style={commonStyles.common.radioButtonText}>Market Order</Text>
                                <TouchableOpacity onPress={this.onLimitSelection.bind(this)}>
                                    <View style={[commonStyles.common.radioButtonContainer, {marginLeft: 20}]}>
                                        {this.state.isLimitOrder ?
                                            <View style={commonStyles.common.radioButtonSelected}/> : null}
                                    </View>
                                </TouchableOpacity>
                                <Text style={commonStyles.common.radioButtonText}>Limit Order</Text>
                            </View>
                        </View>
                    </View>
                    {tLimitOrder}
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const styles = {
    container: { flexDirection: 'column', marginTop: 10 },
    orderLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: '#fff' },
};

const mapStateToProps = state => {
    return { acc: state.account };
};

export default connect(mapStateToProps, null)(OrderType);
