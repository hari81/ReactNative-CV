import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import LimitOrder from './LimitOrder';

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
                                <View style={styles.radioButtonContainer}>
                                    {!this.state.isLimitOrder ? <View style={styles.radioButtonSelected} /> : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.radioButtonText}>Market Order</Text>
                            <TouchableOpacity onPress={this.onLimitSelection.bind(this)}>
                                <View style={[styles.radioButtonContainer, { marginLeft: 20 }]}>
                                    {this.state.isLimitOrder ? <View style={styles.radioButtonSelected} /> : null}
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.radioButtonText}>Limit Order</Text>
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

    radioButtonContainer: { height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
    radioButtonSelected: { height: 20, width: 20, borderRadius: 10, backgroundColor: '#279989' },
    radioButtonText: { color: '#ffffff', fontSize: 16, marginLeft: 5 },
    radioButtonContainerDisabled: { height: 32, width: 32, borderRadius: 16, borderWidth: 2, borderColor: '#9ea6b1', backgroundColor: '#ffffff80', alignItems: 'center', justifyContent: 'center' },    
    radioButtonSelectedDisabled: { height: 20, width: 20, borderRadius: 10, backgroundColor: '#376768' },
    radioButtonTextDisabled: { color: '#ffffff60', fontSize: 16, marginLeft: 5 },    
};

const mapStateToProps = (state) => {
    return {
        defaultAccountData: state.account.defaultAccount,
        contractMonth: state.contractData,
        id: state.cropsButtons.selectedId
    };
};

export default connect(mapStateToProps, null)(OrderType);
