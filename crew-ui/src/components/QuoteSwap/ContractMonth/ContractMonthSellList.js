import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { contractMonthSelect, bidPriceShow, askPriceShow } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonthSelect';
import st from '../../../Utils/SafeTraverse';
class ContractMonthSellList extends Component {
    componentDidMount() {
        this.props.contractMonthSelect(st(this.props, ['contractMonth', 'contract', 0, 'id']));
        this.props.bidPriceShow(st(this.props, ['contractMonth', 'contract', 0, 'bidPrice']));
        this.props.askPriceShow(st(this.props, ['contractMonth', 'contract', 0, 'askPrice']));
    }
    contractMonthSelect(id, bidprice, askprice) {
        //this.props.onClick(id);
        this.props.contractMonthSelect(id);
        this.props.bidPriceShow(bidprice);
        this.props.askPriceShow(askprice);
    }
    render(){
        const bidPrice = parseFloat(st(this.props, ['item', 'bidPrice'])).toFixed(4);
        return (
            <TouchableOpacity disabled={this.props.item.id === this.props.id}onPress={() => this.contractMonthSelect(this.props.item.id, this.props.item.bidPrice, this.props.item.askPrice)}>
                <View style={this.props.item.id === this.props.id ? styles.afterButtonPress : styles.beforeButtonPress}>
                    <Text style={this.props.item.id === this.props.id ?
                        { fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(255,255,255)' } :
                        { fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(61,76,87)' }}
                    >
                        {this.props.item.month.substr(0, 3)} {this.props.item.year}
                    </Text>
                    <Text style={this.props.item.id === this.props.id ?
                        { fontSize: 18, fontFamily: 'HelveticaNeue-Bold', color: 'rgb(255,255,255)' } :
                        { fontSize: 18, fontFamily: 'HelveticaNeue-Bold', color: 'rgb(61,76,87)' }}
                    >
                        {bidPrice}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
const styles = {
    beforeButtonPress: {
        width: 80,
        height: 48,
        backgroundColor: 'rgb(147,204,196)',
        marginLeft: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    afterButtonPress: {
        width: 80,
        height: 48,
        backgroundColor: 'rgb(39,153,137)',
        marginLeft: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'

    }

};
const mapStateToProps = state => {
    return {
        id: state.selectedContractMonth.contractMonth,
        contractMonth: state.contractData


    };
};
export default connect(mapStateToProps, { contractMonthSelect, bidPriceShow, askPriceShow })(ContractMonthSellList);
