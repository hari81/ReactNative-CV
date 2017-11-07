import React, { Component } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { CommonHeader } from '../../components/common/index';
import MyCropButton from '../../components/common/CropButtons/MyCropButton';
import MyFarmTiles from '../../components/common/MyFarmTiles';
import SelectQuantity from '../../components/QuoteSwap/SelectQuantity';
import * as common from '../../Utils/common';

const { height, width } = Dimensions.get('window');
class SelectQuantityHedge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: '0',
            buySell: 'S',
            cMonth: props.cMonth,
            cYear: props.cYear,
            mPrice: props.price,
            underlying: props.underlying,
            lastTradeDate: props.lastTradeDate
        };
    }
    onQuantityChange(quant) {
        this.setState({ quantity: quant });
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
                    <SelectQuantity
                        onQuantityChange={this.onQuantityChange.bind(this)}
                        quantityIncrement={this.props.quantityIncrement}
                        quantityLimit={this.props.bushelLimit}
                        parentState={this.state}
                    />
                    <MyCropButton />
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    const code = state.cropsButtons.selectedId;
    const crop = state.account.defaultAccount.commodities.filter((item) => item.commodity === code.slice(0, (code.length - 4)));
    const tBQL = (state.selectedContractMonth.bushelQuantity === null || !common.isValueExists(state.selectedContractMonth.bushelQuantity.shortLimitAvailable)) ? 0 : Math.round(state.selectedContractMonth.bushelQuantity.shortLimitAvailable);
    const tQty = crop[0].quantityIncrement === null ? '0' : crop[0].quantityIncrement.toString();

    return {
        quantityIncrement: tQty,
        bushelLimit: tBQL
    };
};
export default connect(mapStateToProps, null)(SelectQuantityHedge);
