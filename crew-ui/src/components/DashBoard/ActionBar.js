import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { externalGetTransDashboard } from '../../redux/actions/ExternalTrades/ExternalActions';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';

class ActionBar extends Component {

    dashBoardToOrders() {
        const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId)[0].code;
        Actions.orders({ Crop });
    }

    dashBoardToOpenPositions() {
        const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId)[0].code;
        Actions.orders({ selectedTab: 'Open Positions', Crop });
    }

    dashBoardToExternalTrades() {
        const cropData = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        this.props.externalGetTransDashboard(cropData[0].code, cropData[0].cropYear);
    }

    dashboardToPlaceOrder() {
        const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        Actions.quoteswap({ cropcode: Crop[0].code, cropyear: Crop[0].cropYear });
    }

    render() {
        return (
            <View style={styles.thirdRowStyle}>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', width: width * 0.178 }}>
                    <Text style={{ fontSize: 17, fontFamily: 'HelveticaNeue', color: 'rgb(131,141,148)' }}> TODAY'S PRICE </Text>
                    <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(135,136,140)' }} >as of {moment().format('MMM Do YYYY, h:mm a')} </Text>
                </View>

                <View style={styles.thirdRowBorderStyle} />

                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 9, width: width * 0.121 }}>
                    <Text style={{ fontFamily: 'HelveticaNeue-Bold', fontSize: 14, color: 'rgb(131,141,148)' }}>
                        {this.props.cropButton.selectedCropName.toUpperCase()}
                    </Text>

                    <Text style={{ color: 'rgb(1,172,168)', fontSize: 28, fontFamily: 'HelveticaNeue-Medium' }}>
                        ${this.props.todayPrice.toFixed(4)}
                    </Text>
                    <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>
                        {this.props.underlyingData.underlyingMonthDesc} {this.props.underlyingData.underlyingYear}
                    </Text>
                </View>

                <View style={styles.thirdRowBorderStyle} />

                <TouchableOpacity onPress={this.dashBoardToOrders.bind(this)}>
                    <View style={{ alignItems: 'center', marginLeft: width * 0.0166, width: width * 0.107, marginTop: 16, flexDirection: 'row'}}>
                        <View style={{ width: width * 0.0488 }}>
                            <Text style={{ color: 'rgb(1,172,168)', fontSize: 36 }}>
                                {this.props.openOrdersCount}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: width * 0.0079 }}>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Open</Text>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Orders</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.thirdRowBorderStyle} />
                <TouchableOpacity onPress={this.dashBoardToOpenPositions.bind(this)}>
                    <View style={{ alignItems: 'center', marginHorizontal: width * 0.011, width: width * 0.107, marginTop: 14, flexDirection: 'row' }}>
                        <View style={{ width: width * 0.0488 }}>
                            <Text style={{ color: 'rgb(1,172,168)', fontSize: 36 }}>
                                {this.props.openPositionsCount}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: width * 0.0079 }}>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Open</Text>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Trades</Text>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>(In App)</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.thirdRowBorderStyle} />
                <TouchableOpacity onPress={this.dashBoardToExternalTrades.bind(this)}>
                <View style={{ alignItems: 'center', marginHorizontal: width * 0.011, width: width * 0.107, marginTop: 14, flexDirection: 'row' }}>

                    <View style={{ width: width * 0.044 }}>
                        <Text style={{ color: 'rgb(1,172,168)', fontSize: 36 }}>{this.props.externalTradesCount}</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Trades/Sales</Text>
                        <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>(Outside App)</Text>
                    </View>

                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.dashboardToPlaceOrder.bind(this)}><View style={styles.placeOrderButtonStyle}>
                    <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 18, color: 'rgb(255,255,255)' }}>PLACE NEW ORDER NOW</Text>
                </View></TouchableOpacity>
            </View>
        );
    }
}
const { height, width } = Dimensions.get('window');

const styles = {
    thirdRowStyle: {
        flexDirection: 'row',
        height: height * 0.102,
        width: width * 0.97,
        marginHorizontal: width * 0.0156,
        marginVertical: height * 0.013,
        backgroundColor: 'rgb(255,255,255)',
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1
    },
    thirdRowBorderStyle: {
        width: 1,
        height: height * 0.091,
        backgroundColor: 'rgb(221,221,221)',
        marginTop: 4,
    },
    placeOrderButtonStyle: {
        height: height * 0.052,
        width: width * 0.2149,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.026,
        backgroundColor: 'rgb(39,153,137)',
        borderRadius: 4,
        marginLeft: width * 0.029
    }

};
const mapStateToProps = state => {
    return {
        cropButton: state.cropsButtons,
        openOrdersCount: st(state.dashBoardData, ['Data', 'actionBar', 'openOrders', 'totalCount']),
        openPositionsCount: st(state.dashBoardData, ['Data', 'actionBar', 'openPositions', 'totalCount']),
        externalTradesCount: st(state.dashBoardData, ['Data', 'actionBar', 'externalTrades', 'totalCount']),
        todayPrice: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price']) === null ? 0 : parseFloat(st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price'])),
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol),
    };
};

export default connect(mapStateToProps, { externalGetTransDashboard })(ActionBar);
