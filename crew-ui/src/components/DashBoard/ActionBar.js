import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { externalGetTransDashboard } from '../../redux/actions/ExternalTrades/ExternalActions';
class ActionBar extends Component {

    dashBoardToOrders() {
        const Crop = this.props.Crops.activeCommodity.code;
        Actions.orders({ Crop });

    }
    dashBoardToOpenPositions() {
        const Crop = this.props.Crops.activeCommodity.code;
        Actions.orders({ selectedTab: 'Open Positions', Crop });

    }
    dashBoardToExternalTrades() {
        const cropData = this.props.cropBut.cropButtons.filter(item => item.id === this.props.cropBut.selectedId);
        console.log('cropData', cropData);

        this.props.externalGetTransDashboard(cropData[0].code, cropData[0].cropYear);
    }
    dashboardToPlaceOrder() {
        const cropcode = this.props.Crops.activeCommodity.code;
        const cropyear = this.props.Crops.activeCropYear;
        Actions.quoteswap({ cropcode, cropyear });
       // Actions.tcorderreceipt();
    }
    render() {
        const time = moment.utc(this.props.Crops.actionBar.todaysPrice.priceTimestamp).format('MMMM Do YYYY, h:mm a');
        return(
            <View style={styles.thirdRowStyle}>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'stretch', width: 182 }}>
                    <Text style={{ fontSize: 17, fontFamily: 'HelveticaNeue', color: 'rgb(131,141,148)' }}> TODAY'S PRICE </Text>
                    <Text style={{ fontSize: 12, fontFamily: 'HelveticaNeue', color: 'rgb(135,136,140)' }} >as of {time} </Text>
                </View>

                <View style={styles.thirdRowBorderStyle} />

                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 9, width: 124 }}>
                    <Text style={{ fontFamily: 'HelveticaNeue-Bold', fontSize: 14, color: 'rgb(131,141,148)' }}>
                        {this.props.Crops.activeCommodity.name.toUpperCase()}
                    </Text>

                    <Text style={{ color: 'rgb(1,172,168)', fontSize: 28, fontFamily: 'HelveticaNeue-Medium' }}>
                        {this.props.Crops.activeCommodity.currency === 'USD' ? '$' : this.props.Crops.activeCommodity.currency}
                        {this.props.Crops.actionBar.todaysPrice.price.toFixed(4)}
                    </Text>
                    <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>
                        {this.props.Crops.actionBar.todaysPrice.contractMonth.month.name} {this.props.Crops.actionBar.todaysPrice.contractMonth.year.value}
                    </Text>
                </View>

                <View style={styles.thirdRowBorderStyle} />

                <TouchableOpacity onPress={this.dashBoardToOrders.bind(this)}>
                    <View style={{ alignItems: 'center', marginLeft: 17, width: 110, marginTop: 16, flexDirection: 'row'}}>
                        <View style={{ width: 50 }}>
                            <Text style={{ color: 'rgb(1,172,168)', fontSize: 36 }}>
                                {this.props.Crops.actionBar.openOrders.totalCount}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 8 }}>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Open</Text>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Orders</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.thirdRowBorderStyle} />
                <TouchableOpacity onPress={this.dashBoardToOpenPositions.bind(this)}>
                    <View style={{ alignItems: 'center', marginHorizontal: 12, width: 110, marginTop: 14, flexDirection: 'row' }}>
                        <View style={{ width: 50 }}>
                            <Text style={{ color: 'rgb(1,172,168)', fontSize: 36 }}>
                                {this.props.Crops.actionBar.openPositions.totalCount}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 8 }}>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Open</Text>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>Trades</Text>
                            <Text style={{ fontFamily: 'HelveticaNeue-Light', fontSize: 14, color: 'rgb(61,76,87)' }}>(In App)</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.thirdRowBorderStyle} />
                <TouchableOpacity onPress={this.dashBoardToExternalTrades.bind(this)}>
                <View style={{ alignItems: 'center', marginHorizontal: 12, width: 110, marginTop: 14, flexDirection: 'row'}}>

                    <View style={{ width: 45 }}>
                        <Text style={{ color: 'rgb(1,172,168)', fontSize: 36 }}>{this.props.Crops.actionBar.externalTrades.totalCount}</Text>
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
const styles = {
    thirdRowStyle: {
        flexDirection: 'row',
        height: 79,
        width: 992,
        marginHorizontal: 16,
        marginVertical: 10,
        backgroundColor: 'rgb(255,255,255)',
        borderColor: 'rgb(190,216,221)',
        borderWidth: 1
    },
    thirdRowBorderStyle: {
        width: 1,
        height: 70,
        backgroundColor: 'rgb(221,221,221)',
        marginTop: 4,

    },
    placeOrderButtonStyle: {
        height: 40,
        width: 220,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'rgb(39,153,137)',
        borderRadius: 4,
        marginLeft: 30
    }

};
const mapStateToProps = state => {

    return {
        Crops: state.dashBoardButtons,
        cropBut: state.cropsButtons
    };
};

export default connect(mapStateToProps, { externalGetTransDashboard })(ActionBar);
