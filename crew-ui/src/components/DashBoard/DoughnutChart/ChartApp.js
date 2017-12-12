import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Pie from './Pie';
import st from '../../../Utils/SafeTraverse';
import * as common from '../../../Utils/common';

const { width } = Dimensions.get('window');

class ChartApp extends Component {
    render() {
        const data = [{ number: this.props.externalTradesQuantity }, { number: this.props.openPositionsQuantity }, { number: this.props.contingentQuantity }, { number: this.props.unhedgedTotalQuantity }]
        return (
            <View>
                <Pie pieWidth={width * 0.39} pieHeight={width * 0.39} data={data} />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        externalTradesQuantity: common.isValueExists(st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity'])) ? parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity'])).toFixed(0) : 0,
        openPositionsQuantity: common.isValueExists(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity'])) ? parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity'])).toFixed(0) : 0,
        unhedgedTotalQuantity: common.isValueExists(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity'])) ? parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity'])).toFixed(0) : 0,
        contingentQuantity: common.isValueExists(st(state.dashBoardData, ['Data', 'actionBar', 'openPositions', 'totalContingentOfferQuantity'])) ? parseFloat(st(state.dashBoardData, ['Data', 'actionBar', 'openPositions', 'totalContingentOfferQuantity']).toFixed(0)) : 0,
    };
}

export default connect(mapStateToProps, null)(ChartApp);
