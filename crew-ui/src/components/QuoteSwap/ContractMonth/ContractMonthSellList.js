import React, { Component } from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import { bushelQuantityLimit } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import bugsnag from '../../common/BugSnag';

class ContractMonthSellList extends Component {
    contractMonthSelect(item) {
        this.props.onSelectContractMonth(item);
        this.props.bushelQuantityLimit(item.underlying);
    }

    render() {
        try {
            let tPrice = '-';
            const tId = this.props.selectedContractMonth === null ? -1 : this.props.selectedContractMonth.id;
            if (this.props.isBuy) {
                tPrice = this.props.item.askPrice === null ? this.props.item.settlePrice : this.props.item.askPrice;
            } else {
                tPrice = this.props.item.bidPrice === null ? this.props.item.settlePrice : this.props.item.bidPrice;
            }
            tPrice = tPrice === null ? '-' : parseFloat(tPrice).toFixed(4);

            return (
                <TouchableOpacity disabled={this.props.item.id === tId}
                                  onPress={this.contractMonthSelect.bind(this, this.props.item)}>
                    <View style={this.props.item.id === tId ? styles.afterButtonPress : styles.beforeButtonPress}>
                        <Text style={this.props.item.id === tId ? styles.contractMonth : styles.contractMonthDisabled}>
                            {this.props.item.month.substr(0, 3)} {this.props.item.year}
                        </Text>
                        <Text
                            style={this.props.item.id === tId ? styles.contractPrice : styles.contractPriceDisabled}>${tPrice}</Text>
                    </View>
                </TouchableOpacity>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
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

export default connect(null, { bushelQuantityLimit })(ContractMonthSellList);
