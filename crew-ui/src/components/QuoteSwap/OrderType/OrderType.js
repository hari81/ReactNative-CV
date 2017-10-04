import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import LimitOrder from './LimitOrder';
import * as commonStyles from '../../../Utils/styles';

class OrderType extends Component {
    constructor() {
        super();
        this.state = {
            isLimitOrder: false,
            tickSizeIncrement: '0'
        };
    }
    componentDidMount() {
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)))
        this.setState({ tickSizeIncrement: crop[0].tickSizeIncrement === null || crop[0].tickSizeIncrement === undefined ? '0' : crop[0].tickSizeIncrement.toString() });
    }
    onMarketSelection() {
        this.setState({ isLimitOrder: false });
        this.props.onOrderTypeChange('market');
    }

    onLimitSelection() {
        this.setState({ isLimitOrder: true });
        this.props.onOrderTypeChange('limit');
    }
    scrollchange1() {
        this.props.scrollchange();
    }
    onBlurMake = () => {
        this.props.scrolldow();
    };

    limitOrder() {

        if (this.state.isLimitOrder) {
            return <LimitOrder buySell={this.props.buySell} tickSizeIncrement={this.state.tickSizeIncrement} />;

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>ORDER TYPE</Text>
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
                {this.limitOrder()}
            </View>
        );
    }
}
const styles = {
    container: { flexDirection: 'column', marginTop: 10 },
    orderLabel: { fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: '#fff' },
};

const mapStateToProps = (state) => {
    return {
        defaultAccountData: state.account.defaultAccount,
        contractMonth: state.contractData,
        id: state.cropsButtons.selectedId
    };
};

export default connect(mapStateToProps, null)(OrderType);
