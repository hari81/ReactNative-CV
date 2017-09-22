import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import normalRadioBTN from '../../common/img/Radio-BTN-normal.png';
import selectedRadioBTN from '../../common/img/Radio-BTN-selected.png';
import LimitOrder from './LimitOrder';

class OrderType extends Component {
    constructor() {
        super();
        this.state = {
            radioBTNEnableMarket: true,
            radioBTNEnableLimit: false,
            tickSizeIncrement: '0'
        };
    }
    componentDidMount(){
        const code = this.props.id;
        const crop = this.props.defaultAccountData.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)))
        this.setState({ tickSizeIncrement: crop[0].tickSizeIncrement.toString() });
    }
    onMarketSelection= () => {
        this.setState({ radioBTNEnableMarket: true, radioBTNEnableLimit: false });
        this.props.onOrderTypeChange('market');
    }
    onLimitSelection=() => {
        this.setState({ radioBTNEnableMarket: false, radioBTNEnableLimit: true });
        this.props.onOrderTypeChange('limit');
    }
    limitOrder() {
        if (this.state.radioBTNEnableLimit) {
            return <LimitOrder tickSizeIncrement={this.state.tickSizeIncrement} />;
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' }}>ORDER TYPE</Text>
                <View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <TouchableOpacity onPress={this.onMarketSelection}><Image style={{ width: 32, height: 32 }} source={this.state.radioBTNEnableMarket ? selectedRadioBTN : normalRadioBTN} /></TouchableOpacity>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: 'rgb(255,255,255)', paddingRight: 45 }}>Market Order</Text>
                        <TouchableOpacity onPress={this.onLimitSelection}><Image style={{ width: 32, height: 32 }} source={this.state.radioBTNEnableLimit ? selectedRadioBTN : normalRadioBTN} /></TouchableOpacity>
                        <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', paddingTop: 8, paddingLeft: 6, color: 'rgb(255,255,255)' }}>Limit Order</Text>
                    </View>
                </View>
                {this.limitOrder()}
            </View>
        );
    }
}
const styles = {
    container: {
        flexDirection: 'column',
        marginTop: 10
    }
}
const mapStateToProps = (state) => {
    return {
        defaultAccountData: state.account.defaultAccount,
        contractMonth: state.contractData,
        id: state.cropsButtons.selectedId
    };
}
export default connect(mapStateToProps, null)(OrderType);

