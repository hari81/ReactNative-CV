import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bidPriceShow, askPriceShow } from '../../redux/actions/QuoteSwap/ContractMonth/ContractMonthSelect';
import { Spinner } from '../common/Spinner';
import st from '../../Utils/SafeTraverse';

class BidAskPrice extends Component {
    render() {
        const bidPrice = !this.props.bidPrice || this.props.bidPrice === null || this.props.bidPrice === undefined ? '-' : parseFloat(st(this.props, ['bidPrice'])).toFixed(4);
        const askPrice = !this.props.askPrice || this.props.askPrice === null || this.props.askPrice === undefined ? '-' : parseFloat(st(this.props, ['askPrice'])).toFixed(4);
        const settlePrice = !this.props.settlePrice || this.props.settlePrice === null || this.props.settlePrice === undefined ? '-' : parseFloat(st(this.props, ['settlePrice'])).toFixed(4);
        if (this.props.contractMonth.spinFlag) {
            return <Spinner size="small" />;
        }
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 40, marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>BID PRICE:</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>{bidPrice || 0}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 60, marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>ASK PRICE:</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>{askPrice || 0}</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 60, marginTop: 4 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'HelveticaNeue', color: 'rgb(231,181,20)' }}>LAST SETTLE:</Text>
                    <Text style={{ color: 'rgb(255,255,255)', fontSize: 16, fontFamily: 'HelveticaNeue' }}>{settlePrice || 0}</Text>
                </View>
            </View>
        );
    }
}
const styles = {
    container: {
        flexDirection: 'row',
        marginTop: 269,
        width: 483,
        height: 55,
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
