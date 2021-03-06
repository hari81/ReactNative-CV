import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Refresh from '../../common/img/Refresh.png';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import bugsnag from '../../common/BugSnag';

class ContractMonth extends Component {

    onUpdate() {
        const { cropYear, cropCode } = this.props.contractMonth.contract[0];
        this.props.onRefreshPrices();
        this.props.quoteSwapUnderlying(cropYear, cropCode);
    }

    onSelectContractMonth(item) {
        this.props.onSelectContractMonth(item);
    }

    getPrice(item) {
        let tPrice = '-';
        if (this.props.isBuy) {
            tPrice = item.askPrice === null ? item.settlePrice : item.askPrice;
        } else { 
            tPrice = item.bidPrice === null ? item.settlePrice : item.bidPrice;
        }
        tPrice = tPrice === null ? '-' : parseFloat(tPrice).toFixed(4); 
        return tPrice;
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            const tId = this.props.selectedContractMonth === null ? -1 : this.props.selectedContractMonth.id;
            return (
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'HelveticaNeue' }}>CONTRACT MONTH</Text>
                        <TouchableOpacity onPress={this.onUpdate.bind(this)}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 18, height: 18, marginLeft: 20, marginRight: 4 }} source={Refresh} />
                                <Text style={{ color: '#fff', fontSize: 11, marginTop: 4 }}>as of {moment().format('MMM Do YYYY, h:mm a')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: 340, height: 110 }}>
                        <FlatList
                            numColumns={4}
                            data={this.props.contractMonth.contract}
                            keyExtractor={item => item.id}
                            extraData={this.props.selectedContractMonth}
                            renderItem={({ item }) => (
                                <TouchableOpacity disabled={item.id === tId} onPress={this.onSelectContractMonth.bind(this, item)}>
                                    <View style={item.id === tId ? styles.afterButtonPress : styles.beforeButtonPress}>
                                        <Text style={item.id === tId ? styles.contractMonth : styles.contractMonthDisabled}>
                                            {item.month.substr(0, 3)} {item.year}
                                        </Text>
                                        <Text style={item.id === tId ? styles.contractPrice : styles.contractPriceDisabled}>
                                            ${this.getPrice(item)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const styles = {
    container: { flexDirection: 'column', marginTop: 10, zIndex: -1 },

    beforeButtonPress: { width: 80, height: 48, backgroundColor: 'rgb(147,204,196)', marginTop: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' },
    afterButtonPress: { width: 80, height: 48, backgroundColor: 'rgb(39,153,137)', marginTop: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' },
    contractPrice: { fontSize: 16, fontFamily: 'HelveticaNeue-Bold', color: '#fff' },
    contractPriceDisabled: { fontSize: 16, fontFamily: 'HelveticaNeue-Bold', color: '#3d4c57' },
    contractMonth: { fontSize: 12, fontFamily: 'HelveticaNeue', color: '#fff' },
    contractMonthDisabled: { fontSize: 12, fontFamily: 'HelveticaNeue', color: '#3d4c57' },
    
};

const mapStateToProps = state => {
    return {
        contractMonth: state.contractData,
        acc: state.account
    };
};

export default connect(mapStateToProps, { quoteSwapUnderlying })(ContractMonth);
