import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import ContractMonthSellList from './ContractMonthSellList';
import { Spinner } from '../../common/Spinner';
import Refresh from '../../common/img/Refresh.png';
import { quoteSwapUnderlying } from '../../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';

class ContractMonth extends Component {
    constructor() {
        super();
        this.state = {
            timeNow: moment().format('MMM Do YYYY, h:mm a'),
            selectedMonth: null
        };
    }
    
    componentWillReceiveProps() {
        this.setState({ timeNow: moment().format('MMM Do YYYY, h:mm a') });
    }

    onUpdate() {
        this.props.onRefreshContracts();
        const { cropYear, cropCode } = this.props.contractMonth.contract[0];
        this.props.quoteSwapUnderlying(cropYear, cropCode);
    }

    contractMonthList() {
        if (this.props.contractMonth.spinFlag) {
            return <Spinner size='small' />;
        }
        return (<FlatList
            numColumns={4}
            data={this.props.contractMonth.contract}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ContractMonthSellList item={item} key={item.id} buySell={this.props.buySell} />}
        />);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'HelveticaNeue' }}>CONTRACT MONTH</Text>
                    <TouchableOpacity onPress={this.onUpdate.bind(this, this.state.timeNow)}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image style={{ width: 18, height: 18, marginLeft: 20, marginRight: 4 }} source={Refresh} />
                            <Text style={{ color: '#fff', fontSize: 11, marginTop: 4 }}>as of {this.state.timeNow}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 340, height: 110 }}>
                    {this.contractMonthList()}
                </View>
            </View>
        );
    }
}
const styles = {
    container: {
        flexDirection: 'column',
        marginTop: 10,
        zIndex: -1
    }
};

const mapStateToProps = state => {
    return {
        contractMonth: state.contractData

    };
};

export default connect(mapStateToProps, { quoteSwapUnderlying })(ContractMonth);
