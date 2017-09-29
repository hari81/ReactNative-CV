import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import ChartApp from './DoughnutChart/ChartApp';
import matrix from '../common/img/Small-Matrix.png';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';
import { Spinner } from '../common/Spinner';
import Dimensions from 'Dimensions';

class MyFarmProduction extends Component {
    spinner(percent) {
        if (this.props.dashBoardSpinner) {
            return <Spinner size="small" />;
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 190, flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 15, paddingTop: 28, color: 'rgb(29,37,49)' }}>UNHEDGED PRODUCTION</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.unhedgedTotalQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(61,76,87)' }}>{this.props.unhedgedTotalAmount}</Text>
                    <Text style={{ fontSize: 15, paddingTop: 12, color: 'rgb(29,37,49)' }}>OPEN ORDERS</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.openOrdersQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                </View>

                <View style={{ width: 280 }}>
                    <View style={{ borderRadius: 100, marginTop: 28, marginLeft: 5, width: 16, height: 16, backgroundColor: 'rgb(158,42,47)' }} />
                    <ChartApp />
                    <View style={{ flexDirection: 'column', position: 'absolute', marginLeft: 110, marginTop: 120 }}>
                        <Text style={{ fontSize: 14, paddingLeft: 2, fontFamily: 'HelveticaNeue-Medium', color: 'rgb(61,76,87)' }} >
                            {percent}%
                        </Text>
                        <Text style={{ fontSize: 15, paddingLeft: 4, fontFamily: 'HelveticaNeue', color: 'rgb(171,178,183)' }}>UNSOLD</Text>
                    </View>
                </View>

                <View>
                    <View style={{ borderRadius: 100, marginTop: 28, marginRight: 5, width: 16, height: 16, backgroundColor: 'rgb(135,136,140)' }} />
                    <View style={{ borderRadius: 100, marginTop: 115, marginRight: 5, width: 16, height: 16, backgroundColor: 'rgb(218,170,0)' }} />
                </View>
                <View style={{ width: 190, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 15, paddingTop: 28, color: 'rgb(29,37,49)' }}>TRADES/SALES</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(29,37,49)' }}>(OUTSIDE THE APP)</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.externalTradesQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                    <Text style={{ fontSize: 26, color: 'rgb(61,76,87)' }}>{this.props.externalTradesAmount}</Text>
                    <Text style={{ fontSize: 15, paddingTop: 20, color: 'rgb(29,37,49)' }}>OPEN TRADES</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(29,37,49)' }}>(IN APP)</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.openPositionsQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                    <Text style={{ fontSize: 26, color: 'rgb(61,76,87)' }}>{this.props.openPositionsTradeAmount}</Text>
                </View>
            </View>
        );
    }

    render() {
        //returning no data when my farm production data is absent
        if (st(this.props, ['myFarmProductionData', 'myFarmProduction', 'estimatedTotalProduction']) === null) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.secondRowFirstColumnStyle}>
                        <View style={styles.productionTitleStyle}>
                            <View style={{ width: 216, height: 20, marginTop: 15, marginLeft: 34 }}>
                                <Text style={{ fontSize: 16, color: 'rgb(131,141,148)' }}>YOUR FARM PRODUCTION</Text>
                            </View>
                        </View>
                        <View style={{ margin: 50, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <Text style={{ fontSize: 30, color: 'rgb(131,141,148)' }}>No Data</Text>
                        </View>
                    </View>
                    <View style={styles.secondRowSecondColumnStyle}>
                        <View style={[styles.productionTitleStyle, { width: 286 }]}>
                            <View style={{ marginTop: 15, marginLeft: 34 }}>
                                <Text style={{ fontSize: 16, color: 'rgb(131,141,148)' }}>PROFITABILITY MATRIX</Text>
                            </View>
                        </View>
                        <Text style={{ fontSize: 14, fontFamily: 'HelveticaNeue-Thin', padding: 20, color: 'rgb(29,37,49)' }}>Customize Scenarios to see how your trading decisions affect your profitability</Text>
                        <View style={{ marginLeft: 30 }}><Image source={matrix} width={223} height={153} /></View>
                        <View style={styles.viewProfitabilityButton}><Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(39,49,67)' }}>VIEW PROFITABILITY</Text></View>
                    </View>
                </View>
            );
        //returning data when my farm production data is present
        } else {
            const percent = this.props.myFarmProductionData === null ? '' : (parseFloat((this.props.myFarmProductionData.myFarmProduction.unhedgedProduction.totalQuantity / this.props.myFarmProductionData.myFarmProduction.estimatedTotalProduction) * 100).toFixed(2))
            return (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.secondRowFirstColumnStyle}>

                            <View style={styles.productionTitleStyle}>
                                <View style={{ width: 216, height: 20, marginTop: 15, marginLeft: 34 }}>
                                    <Text style={{ fontSize: 16, color: 'rgb(131,141,148)' }}>YOUR FARM PRODUCTION</Text>
                                </View>
                                <View style={{ marginTop: 19 }}>
                                    <Text style={{ fontSize: 14, marginLeft: 90, color: 'rgb(127,127,127)' }}>Estimated TotalProduction</Text>
                                </View>
                                <View style={{ marginTop: 11, alignSelf: 'stretch' }}>
                                    <Text style={{ fontSize: 23, fontFamily: 'HelveticaNeue-Bold', marginLeft: 4, color: 'rgb(1,172,168)' }}>
                                        {this.props.estimatedTotalProduction}
                                    </Text>
                                </View>
                                <View style={{ marginTop: 21, marginLeft: 6 }}>
                                    <Text style={{ fontSize: 12, color: 'rgb(127,127,127)' }}>{this.props.unitOfMeasure}s</Text>
                                </View>
                            </View>
                            {this.spinner(percent)}
                        </View>
                        <View style={styles.secondRowSecondColumnStyle}>
                            <View style={[styles.productionTitleStyle, { width: 286 }]}>
                                <View style={{ marginTop: 15, marginLeft: 34 }}>
                                    <Text style={{ fontSize: 16, color: 'rgb(131,141,148)' }}>PROFITABILITY MATRIX</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, fontFamily: 'HelveticaNeue-Thin', padding: 20, color: 'rgb(29,37,49)' }}>Customize Scenarios to see how your trading decisions affect your profitability</Text>
                            <View style={{ marginLeft: 30 }}><Image source={matrix} width={223} height={153} /></View>
                            <View style={styles.viewProfitabilityButton}><Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(39,49,67)' }}>VIEW PROFITABILITY</Text></View>
                        </View>
                    </View>
                </View>
            );
        }
    }
}
const { height, width } = Dimensions.get('window');

const styles = {
    secondRowFirstColumnStyle: {
        height: 352,
        width: 689,
        backgroundColor: 'rgb(255,255,255)',
        marginHorizontal: 16,
        marginTop: 45,
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1,
    },
    productionTitleStyle: {
        flexDirection: 'row',
        height: 47,
        width: 689,
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(221,221,221)'
    },
    secondRowSecondColumnStyle: {
        height: 352,
        backgroundColor: 'rgb(255,255,255)',
        width: 288,
        marginRight: 16,
        marginTop: 45,
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1
    },
    viewProfitabilityButton: {
        width: 141,
        height: 28,
        borderWidth: 1,
        borderColor: 'rgb(1,172,168)',
        marginTop: 30,
        marginLeft: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const mapStateToProps = (state) => {
    return {
        infoState: state.info,

        dashBoardSpinner: state.dashBoardData.dashBoardSpinner,

        myFarmProductionData: st(state.dashBoardData, ['Data']),
        unitOfMeasure: st(state.account, ['defaultAccount', 'commodities', 0, 'unitOfMeasure']),

        estimatedTotalProduction: st(state.dashBoardData, ['Data', 'myFarmProduction', 'estimatedTotalProduction']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'estimatedTotalProduction']))),

        unhedgedTotalQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity'])).toFixed(0)),
        unhedgedTotalAmount: st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalTradeAmount']) === null ? '   -' : '$ ' + common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalTradeAmount'])).toFixed(2)),

        openOrdersQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'openOrders', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openOrders', 'totalQuantity'])).toFixed(0)),

        externalTradesQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity'])).toFixed(0)),
        externalTradesAmount: st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalTradeAmount']) === null ? '   -' : '$ ' + common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalTradeAmount'])).toFixed(2)),

        openPositionsQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity'])).toFixed(0)),
        openPositionsTradeAmount: st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalTradeAmount']) === null ? '   -' : '$ ' + common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalTradeAmount'])).toFixed(2))

    };
};

export default connect(mapStateToProps, null)(MyFarmProduction);
