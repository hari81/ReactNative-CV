import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { externalGetTransDashboard } from '../../redux/actions/ExternalTrades/ExternalActions';
import { segmentTabSelect } from '../../redux/actions/OrdersAction/ViewOrderAction';
import st from '../../Utils/SafeTraverse';
import * as common from '../../Utils/common';
import { Button } from '../common/Button';
import bugsnag from '../common/BugSnag';

class ActionBar extends Component {

    dashBoardToOrders = () => {
        const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId)[0].code;
        this.props.segmentTabSelect('Open Orders');
        Actions.orders({ Crop });
    }

    dashBoardToOpenPositions = () => {
        const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId)[0].code;
        this.props.segmentTabSelect('Open Positions');
        Actions.orders({ selectedTab: 'Open Positions', Crop });
    }

    dashBoardToExternalTrades = () => {
        const cropData = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        this.props.externalGetTransDashboard(cropData[0].code, cropData[0].cropYear);
    }

    dashboardToPlaceOrder = () => {
        const Crop = this.props.cropButton.cropButtons.filter(item => item.id === this.props.cropButton.selectedId);
        //Actions.quoteswap({ cropcode: Crop[0].code, cropyear: Crop[0].cropYear });
        Actions.whatToday();
        //Actions.suggestedQuote();
    }

    render() {
        try {
            const { userId, firstName, email } = this.props.acc.accountDetails;
            bugsnag.setUser(`User Id: ${userId}`, firstName, email);
            return (
                <View style={styles.containerStyle}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', width: width * 0.178 }}>
                        <Text style={{ fontSize: 17, fontFamily: 'HelveticaNeue', color: 'rgb(131,141,148)' }}> TODAY'S
                            PRICE </Text>
                        <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(135,136,140)' }}>as
                            of {moment().format('MMM Do YYYY, h:mm a')} </Text>
                    </View>

                    <View style={styles.BorderStyle} />

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

                    <View style={styles.BorderStyle} />

                    <TouchableOpacity onPress={this.dashBoardToOrders}>
                        <View style={{ alignItems: 'center', marginLeft: width * 0.0166, width: width * 0.107, marginTop: 16, flexDirection: 'row' }}>
                            <View style={{ width: width * 0.0488 }}>
                                <Text style={{ color: 'rgb(1,172,168)', fontSize: 36, textDecorationLine: 'underline' }}>
                                    {this.props.openOrdersCount}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: width * 0.0079 }}>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Open</Text>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Orders</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.BorderStyle} />
                    <TouchableOpacity onPress={this.dashBoardToOpenPositions}>
                        <View style={{ alignItems: 'center', marginHorizontal: width * 0.011, width: width * 0.107, marginTop: 14, flexDirection: 'row' }}>
                            <View style={{ width: width * 0.0488 }}>
                                <Text style={{ color: 'rgb(1,172,168)', fontSize: 36, textDecorationLine: 'underline' }}>
                                    {this.props.openPositionsCount}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginLeft: width * 0.0079 }}>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Open</Text>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Trades</Text>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>(In
                                    App)</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.BorderStyle} />
                    <TouchableOpacity onPress={this.dashBoardToExternalTrades}>
                        <View style={{ alignItems: 'center', marginHorizontal: width * 0.011, width: width * 0.107, marginTop: 18, flexDirection: 'row' }}>

                            <View style={{ width: width * 0.044 }}>
                                <Text style={{ color: 'rgb(1,172,168)', fontSize: 36, textDecorationLine: 'underline' }}>{this.props.externalTradesCount}</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Trades</Text>
                                <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>(Outside App)</Text>
                            </View>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={this.dashboardToPlaceOrder.bind(this)}
                        disabled={!this.props.isDashboardDataExists}
                        style={[styles.placeOrderButtonStyle, this.props.isDashboardDataExists ? styles.placeOrderButtonStyleEnabled : styles.placeOrderButtonStyleDisabled]} 
                    >
                        <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 18, color: '#fff' }}>NEW ORDER</Text>
                    </TouchableOpacity>
                </View>
            );
        } catch (error) {
            bugsnag.notify(error);
        }
    }
}
const { height, width } = Dimensions.get('window');

const styles = {
    containerStyle: { flexDirection: 'row', height: height * 0.111, width: width * 0.97, marginHorizontal: width * 0.0156, marginVertical: height * 0.013, backgroundColor: 'rgb(255,255,255)', borderColor: 'rgb(190,216,221)', borderWidth: 1 },
    BorderStyle: { width: 1, height: height * 0.091, backgroundColor: 'rgb(221,221,221)', marginTop: 4 },
    placeOrderButtonStyle: { height: height * 0.052, width: width * 0.2149, justifyContent: 'center', alignItems: 'center', marginTop: height * 0.026, borderRadius: 4, marginLeft: width * 0.029 },
    placeOrderButtonStyleEnabled: { backgroundColor: '#279989' },
    placeOrderButtonStyleDisabled: { backgroundColor: '#27998965' }
};

const mapStateToProps = state => {
    //if we don't have dashboard data, don't allow user to exit screen
    let isDataExists = true;
    if (common.isValueExists(state.dashBoardData.Data)) { isDataExists = true; } else { isDataExists = false; }

    return {
        acc: state.account,
        cropButton: state.cropsButtons,
        openOrdersCount: common.isValueExists(st(state.dashBoardData, ['Data', 'actionBar', 'openOrders', 'totalCount'])) ? st(state.dashBoardData, ['Data', 'actionBar', 'openOrders', 'totalCount']) : 0,
        openPositionsCount: common.isValueExists(st(state.dashBoardData, ['Data', 'actionBar', 'openPositions', 'totalCount'])) ? st(state.dashBoardData, ['Data', 'actionBar', 'openPositions', 'totalCount']) : 0,
        externalTradesCount: common.isValueExists(st(state.dashBoardData, ['Data', 'actionBar', 'externalTrades', 'totalCount'])) ? st(state.dashBoardData, ['Data', 'actionBar', 'externalTrades', 'totalCount']) : 0,
        todayPrice: common.isValueExists(st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price'])) ? parseFloat(st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'price'])) : 0,
        underlyingData: st(state.dashBoardData, ['Data', 'actionBar', 'todayPrice', 'symbol']) === null ? 0 : common.createUnderlyingObject(state.dashBoardData.Data.actionBar.todayPrice.symbol),
        isDashboardDataExists: isDataExists
    };
};

export default connect(mapStateToProps, { externalGetTransDashboard, segmentTabSelect })(ActionBar);
