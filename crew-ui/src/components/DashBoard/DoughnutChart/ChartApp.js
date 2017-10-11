import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Pie from './Pie';
import st from '../../../Utils/SafeTraverse';

const { width } = Dimensions.get('window');

class ChartApp extends Component {
    render() {
        const data = [{ number: this.props.externalTradesQuantity }, { number: this.props.openPositionsQuantity }, { number: this.props.unhedgedTotalQuantity }]
        return (
            <View>
                <Pie pieWidth={width * 0.39} pieHeight={width * 0.39} data={data} />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        externalTradesQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity'])).toFixed(0),
        openPositionsQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity'])).toFixed(0),
        unhedgedTotalQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity']) === null ? '   -' : parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity'])).toFixed(0)
    };
}

export default connect(mapStateToProps, null)(ChartApp);
