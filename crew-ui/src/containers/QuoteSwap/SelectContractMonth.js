import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { CommonHeader } from '../../components/common/index';
import MyCropButton from '../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../components/common/MyFarmTiles';
import SelectContractMonthList from '../../components/QuoteSwap/SelectContractMonthList';
import { quoteSwapUnderlying } from '../../redux/actions/QuoteSwap/ContractMonth/ContractMonth';
import st from '../../Utils/SafeTraverse';

const { height, width } = Dimensions.get('window');
class ContractMonths extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cropcode: props.cropcode || st(props, ['Crops', 0, 'code']),
            cropyear: props.cropyear || st(props, ['Crops', 0, 'cropYear']),
            selectedMonth: 0,
            contractMonth: '',
            contractYear: '',
            underlying: '',
            lastTradeDate: ''
        };
    }
    componentDidMount() {
        this.props.quoteSwapUnderlying(this.state.cropyear, this.state.cropcode);
    }

    onQuoteSwapUnderlying(year, code) {
        this.props.quoteSwapUnderlying(year, code);
    }
    onSelectedMonth(id, month, year, underlying, lastTradeDate) {
        this.setState({ selectedMonth: id, contractMonth: month, contractYear: year, underlying, lastTradeDate });
    }

    render() {
        return (
            <View>
                <StatusBar barStyle='light-content' />
                <View style={{ backgroundColor: '#000', width, height: 20 }} />
                <CommonHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)' }}>
                    <View style={{ height: height * 0.108, width, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                    <SelectContractMonthList
                        onSelectedMonth={this.onSelectedMonth.bind(this)}
                        selectedMonth={this.state.selectedMonth}
                        parentState={this.state}
                    />
                    <MyCropButton onQuoteSwapUnderlying={this.onQuoteSwapUnderlying.bind(this)} frm='OM'/>
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        Crops: state.cropsButtons.cropButtons,
        contractMonth: state.contractData
    };
};

export default connect(mapStateToProps, { quoteSwapUnderlying })(ContractMonths);
