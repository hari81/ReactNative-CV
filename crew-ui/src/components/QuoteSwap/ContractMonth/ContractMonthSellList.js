import React, { Component } from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import { contractMonthSelect, bidPriceShow, askPriceShow, lastTradeDateShow, underlyingYearShow, settlePriceShow } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonthSelect';
import { bushelQuantityLimit } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import st from '../../../Utils/SafeTraverse';

class ContractMonthSellList extends Component {
    componentDidMount() {
        const id = this.props.id === null || this.props.id === '' ? 0 : this.props.id;
        this.props.contractMonthSelect(st(this.props, ['contractMonth', 'contract', id, 'id']));
        this.props.bidPriceShow(st(this.props, ['contractMonth', 'contract', id, 'bidPrice']));
        this.props.askPriceShow(st(this.props, ['contractMonth', 'contract', id, 'askPrice']));
        this.props.settlePriceShow(st(this.props, ['contractMonth', 'contract', id, 'settlePrice']));
        this.props.lastTradeDateShow(st(this.props, ['contractMonth', 'contract', id, 'lastTradeDate']));
        this.props.underlyingYearShow(st(this.props, ['contractMonth', 'contract', id, 'underlying']));
    }

    contractMonthSelect(id, bidPrice, askPrice, settlePrice, lastTradeDate, underlying) {
        this.props.contractMonthSelect(id);
        this.props.bidPriceShow(bidPrice);
        this.props.askPriceShow(askPrice);
        this.props.settlePriceShow(settlePrice);
        this.props.lastTradeDateShow(lastTradeDate);
        this.props.underlyingYearShow(underlying);
        this.props.bushelQuantityLimit(underlying);
    }

    render() {
        let tPrice = '-';
        if (this.props.isBuy) {
            tPrice = this.props.item.askPrice === null ? this.props.item.settlePrice : this.props.item.askPrice;
        } else { 
            tPrice = this.props.item.bidPrice === null ? this.props.item.settlePrice : this.props.item.bidPrice;
        }
        tPrice = tPrice === null ? '-' : parseFloat(tPrice).toFixed(4); 

        return (
            <TouchableOpacity disabled={this.props.item.id === this.props.id} onPress={() => this.contractMonthSelect(this.props.item.id, this.props.item.bidPrice, this.props.item.askPrice, this.props.item.settlePrice, this.props.item.lastTradeDate, this.props.item.underlying)}>
                <View style={this.props.item.id === this.props.id ? styles.afterButtonPress : styles.beforeButtonPress}>
                    <Text style={this.props.item.id === this.props.id ? styles.contractMonth : styles.contractMonthDisabled}>
                        { this.props.item.month.substr(0, 3)} {this.props.item.year}
                    </Text>
                    <Text style={this.props.item.id === this.props.id ? styles.contractPrice : styles.contractPriceDisabled}>${tPrice}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = {
    beforeButtonPress: { width: 80, height: 48, backgroundColor: 'rgb(147,204,196)', marginTop: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' },
    afterButtonPress: { width: 80, height: 48, backgroundColor: 'rgb(39,153,137)', marginTop: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' },
    contractPrice: { fontSize: 16, fontFamily: 'HelveticaNeue-Bold', color: '#fff' },
    contractPriceDisabled: { fontSize: 16, fontFamily: 'HelveticaNeue-Bold', color: '#3d4c57' },
    contractMonth: { fontSize: 12, fontFamily: 'HelveticaNeue', color: '#fff' },
    contractMonthDisabled: { fontSize: 12, fontFamily: 'HelveticaNeue', color: '#3d4c57' },
};

const mapStateToProps = state => {
    return {
        id: state.selectedContractMonth.contractMonth,
        contractMonth: state.contractData
    };
};

export default connect(mapStateToProps, { contractMonthSelect, bidPriceShow, askPriceShow, lastTradeDateShow, underlyingYearShow, settlePriceShow, bushelQuantityLimit })(ContractMonthSellList);
