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
            mPrice: props.price
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
                        buySell={this.state.buySell}
                        onQuantityChange={this.onQuantityChange.bind(this)}
                        quantity={this.state.quantity}
                        quantityIncrement={this.props.quantityIncrement}
                        quantityLimit={this.props.bushelLimit}
                        cMonth={this.state.cMonth}
                        cYear={this.state.cYear}
                        mPrice={this.state.mPrice}
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
    //const tTick = crop[0].tickSizeIncrement === null || crop[0].tickSizeIncrement === undefined ? '0' : crop[0].tickSizeIncrement.toString();
    const tBQL = (state.selectedContractMonth.bushelQuantity === null || !common.isValueExists(state.selectedContractMonth.bushelQuantity.shortLimitAvailable)) ? 0 : Math.round(state.selectedContractMonth.bushelQuantity.shortLimitAvailable);
    const tQty = crop[0].quantityIncrement === null ? '0' : crop[0].quantityIncrement.toString();

    return {
        //MyFarmProd: state.dashBoardButtons,
        //limitOrderData: state.limitOrder,
        //contractMonth: state.contractData,
        //tickSizeIncrement: tTick,
        quantityIncrement: tQty,
        bushelLimit: tBQL,
        //acc: state.account
    };
};
export default connect(mapStateToProps, null)(SelectQuantityHedge);
