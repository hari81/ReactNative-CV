import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ChartApp from './DoughnutChart/ChartApp';
import matrix from '../common/img/Matrixx.jpg';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';
import { Spinner } from '../common/Spinner';
import { Button } from '../common/Button';
import bugsnag from '../common/BugSnag';

class MyFarmProduction extends Component {

    dashBoardToMatrix = () => {
        Actions.matrix();
    }
    noFarmSetup= () => {
        Alert.alert('Please Setup My Farm Details');
    }
    spinner(percent) {
        if (this.props.dashBoardSpinner) {
            return <Spinner size="small" />;
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: width * 0.185, flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 15, paddingTop: height * 0.036, color: 'rgb(29,37,49)' }}>UNHEDGED PRODUCTION</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.unhedgedTotalQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(61,76,87)' }}>{this.props.unhedgedTotalAmount}</Text>
                    <Text style={{ fontSize: 15, paddingTop: height * 0.0156, color: 'rgb(29,37,49)' }}>OPEN ORDERS</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.openOrdersQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                </View>

                <View style={{ width: width * 0.2734 }}>
                    <View style={{ borderRadius: 100, marginTop: height * 0.036, marginLeft: 5, width: width * 0.0156, height: height * 0.019, backgroundColor: 'rgb(158,42,47)' }} />
                    <ChartApp />
                    <View style={{ flexDirection: 'column', position: 'absolute', marginLeft: width * 0.11, marginTop: height * 0.156 }}>
                        <Text style={{ fontSize: 14, paddingLeft: width * 0.016, fontFamily: 'HelveticaNeue-Medium', color: 'rgb(61,76,87)' }} >
                            {percent}%
                        </Text>
                        <Text style={{ fontSize: 15, paddingLeft: width * 0.0039, fontFamily: 'HelveticaNeue', color: 'rgb(171,178,183)' }}>UNSOLD</Text>
                    </View>
                </View>

                <View>
                    <View style={{ borderRadius: 100, marginTop: height * 0.036, marginRight: 5, width: width * 0.0156, height: height * 0.02, backgroundColor: 'rgb(135,136,140)' }} />
                    <View style={{ borderRadius: 100, marginTop: height * 0.15, marginRight: 5, width: width * 0.0156, height: height * 0.02, backgroundColor: 'rgb(218,170,0)' }} />
                </View>
                <View style={{ width: width * 0.185, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 15, paddingTop: height * 0.036, color: 'rgb(29,37,49)' }}>TRADES</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(29,37,49)' }}>(OUTSIDE THE APP)</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.externalTradesQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                    <Text style={{ fontSize: 26, color: 'rgb(61,76,87)' }}>{this.props.externalTradesAmount}</Text>
                    <Text style={{ fontSize: 15, paddingTop: height * 0.026, color: 'rgb(29,37,49)' }}>OPEN TRADES</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(29,37,49)' }}>(IN APP)</Text>
                    <Text style={{ fontSize: 24, color: 'rgb(121,120,119)' }}>{this.props.openPositionsQuantity}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(121,120,119)' }}>{this.props.unitOfMeasure}s</Text>
                    <Text style={{ fontSize: 26, color: 'rgb(61,76,87)' }}>{this.props.openPositionsTradeAmount}</Text>
                </View>
            </View>
        );
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            //returning no data when my farm production data is absent
            if (st(this.props, ['myFarmProductionData', 'myFarmProduction', 'estimatedTotalProduction']) === null) {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerStyle}>
                            <View style={styles.productionTitleStyle}>
                                <View style={{
                                    width: width * 0.21,
                                    height: height * 0.026,
                                    marginTop: height * 0.019,
                                    marginLeft: width * 0.033
                                }}>
                                    <Text style={{fontSize: 16, color: 'rgb(131,141,148)'}}>YOUR FARM PRODUCTION</Text>
                                </View>
                            </View>
                            <View style={{margin: 50, justifyContent: 'center', alignItems: 'center', flex: 1}}>
                                <Text style={{fontSize: 30, color: 'rgb(131,141,148)'}}>No Data</Text>
                            </View>
                        </View>
                        <View style={styles.secondContainerStyle}>
                            <View style={[styles.productionTitleStyle, {width: width * 0.279}]}>
                                <View style={{marginTop: height * 0.019, marginLeft: width * 0.0332}}>
                                    <Text style={{fontSize: 16, color: 'rgb(131,141,148)'}}>PROFITABILITY MATRIX</Text>
                                </View>
                            </View>
                            <Text style={{
                                fontSize: 14,
                                fontFamily: 'HelveticaNeue-Thin',
                                padding: 20,
                                color: 'rgb(29,37,49)'
                            }}>Customize scenarios to see how your trading decisions affect your profitability</Text>
                            <View style={{marginLeft: width * 0.029}}><Image source={matrix} width={width * 0.217}
                                                                             height={height * 0.1999}/></View>
                            <TouchableOpacity onPress={this.noFarmSetup}>
                                <View style={styles.viewProfitabilityButton}><Text
                                    style={{fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(39,49,67)'}}>VIEW
                                    PROFITABILITY</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
                //returning data when my farm production data is present
            } else {
                const percent = this.props.myFarmProductionData === null ? '' : (parseFloat((this.props.myFarmProductionData.myFarmProduction.unhedgedProduction.totalQuantity / this.props.myFarmProductionData.myFarmProduction.estimatedTotalProduction) * 100).toFixed(0))
                return (
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.containerStyle}>

                                <View style={styles.productionTitleStyle}>
                                    <View style={{
                                        width: width * 0.21,
                                        height: height * 0.026,
                                        marginTop: height * 0.019,
                                        marginLeft: width * 0.033
                                    }}>
                                        <Text style={{fontSize: 16, color: 'rgb(131,141,148)'}}>YOUR FARM
                                            PRODUCTION</Text>
                                    </View>
                                    <View style={{marginTop: height * 0.024}}>
                                        <Text style={{
                                            fontSize: 14,
                                            marginLeft: width * 0.087,
                                            color: 'rgb(127,127,127)'
                                        }}>Estimated Total Production</Text>
                                    </View>
                                    <View style={{marginTop: height * 0.014, alignSelf: 'stretch'}}>
                                        <Text style={{
                                            fontSize: 23,
                                            fontFamily: 'HelveticaNeue-Bold',
                                            marginLeft: 4,
                                            color: 'rgb(1,172,168)'
                                        }}>
                                            {this.props.estimatedTotalProduction}
                                        </Text>
                                    </View>
                                    <View style={{marginTop: height * 0.027, marginLeft: width * 0.0058}}>
                                        <Text
                                            style={{fontSize: 12, color: 'rgb(127,127,127)'}}>{this.props.unitOfMeasure}s</Text>
                                    </View>
                                </View>
                                {this.spinner(percent)}
                            </View>
                            <View style={styles.secondContainerStyle}>
                                <View style={[styles.productionTitleStyle, {width: width * 0.279}]}>
                                    <View style={{marginTop: height * 0.0195, marginLeft: width * 0.033}}>
                                        <Text style={{fontSize: 16, color: 'rgb(131,141,148)'}}>PROFITABILITY
                                            MATRIX</Text>
                                    </View>
                                </View>
                                <Text style={{
                                    fontSize: 14,
                                    fontFamily: 'HelveticaNeue-Thin',
                                    padding: 20,
                                    color: 'rgb(29,37,49)'
                                }}>Customize scenarios to see how your trading decisions affect your
                                    profitability</Text>
                                <View style={{marginLeft: width * 0.029}}><Image source={matrix} width={width * 0.217}
                                                                                 height={height * 0.199}/></View>
                                <Button buttonStyle={styles.viewProfitabilityButton}
                                        textStyle={{fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(39,49,67)'}}
                                        onPress={this.dashBoardToMatrix}>
                                    VIEW PROFITABILITY
                                </Button>
                            </View>
                            <Text style={{ fontSize: 14, fontFamily: 'HelveticaNeue-Thin', padding: 20, color: 'rgb(29,37,49)' }}>Customize scenarios to see how your trading decisions affect your profitability</Text>
                            <View style={{ marginLeft: width * 0.029 }}><Image source={matrix} width={width * 0.1} height={height * 0.1} /></View>
                            <Button buttonStyle={styles.viewProfitabilityButton} textStyle={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(39,49,67)' }} onPress={this.dashBoardToMatrix}>
                                VIEW PROFITABILITY
                            </Button>
                        </View>
                    </View>
                );
            }
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { height, width } = Dimensions.get('window');

const styles = {
    containerStyle: { height: height * 0.458, width: width * 0.672, backgroundColor: 'rgb(255,255,255)', marginHorizontal: width * 0.015, marginTop: height * 0.058, borderColor: 'rgb(190,216,221)', borderWidth: 1 },
    productionTitleStyle: { flexDirection: 'row', height: height * 0.0612, width: width * 0.672, borderBottomWidth: 1, borderBottomColor: 'rgb(221,221,221)' },
    secondContainerStyle: { height: height * 0.458, backgroundColor: 'rgb(255,255,255)', width: width * 0.284, marginRight: width * 0.015, marginTop: height * 0.058, borderColor: 'rgb(190,216,221)', borderWidth: 1 },
    viewProfitabilityButton: { width: width * 0.137, height: height * 0.036, borderWidth: 1, borderColor: 'rgb(1,172,168)', marginTop: height * 0.039, marginLeft: width * 0.068, justifyContent: 'center', alignItems: 'center' }
};

const mapStateToProps = (state) => {
    return {
        acc: state.account,

        infoState: state.info,

        dashBoardSpinner: state.dashBoardData.dashBoardSpinner,

        myFarmProductionData: st(state.dashBoardData, ['Data']),
        unitOfMeasure: st(state.account, ['defaultAccount', 'commodities', 0, 'unitOfMeasure']),

        estimatedTotalProduction: st(state.dashBoardData, ['Data', 'myFarmProduction', 'estimatedTotalProduction']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'estimatedTotalProduction']))),

        unhedgedTotalQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalQuantity'])).toFixed(0)),
        unhedgedTotalAmount: st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalTradeAmount']) === null ? '   -' : '$ ' + common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'unhedgedProduction', 'totalTradeAmount'])).toFixed(0)),

        openOrdersQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'openOrders', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openOrders', 'totalQuantity'])).toFixed(0)),

        externalTradesQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalQuantity'])).toFixed(0)),
        externalTradesAmount: st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalTradeAmount']) === null ? '   -' : '$ ' + common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'externalTrades', 'totalTradeAmount'])).toFixed(0)),

        openPositionsQuantity: st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity']) === null ? '   -' : common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalQuantity'])).toFixed(0)),
        openPositionsTradeAmount: st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalTradeAmount']) === null ? '   -' : '$ ' + common.formatNumberCommas(parseFloat(st(state.dashBoardData, ['Data', 'myFarmProduction', 'openPositions', 'totalTradeAmount'])).toFixed(0))

    };
};

export default connect(mapStateToProps, null)(MyFarmProduction);
