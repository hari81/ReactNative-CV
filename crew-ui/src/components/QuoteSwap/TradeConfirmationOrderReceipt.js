import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LogoHomeHeader } from '../common';
import MyFarmTiles from '../DashBoard/MyFarmTiles';
import confirmtick from '../common/img/confirmationSuccess.png';

class TradeConfirmationOrderReceipt extends Component {

    onBackToOrders() {
        Actions.dashboard();
    }

    reviewPositionsOrder() {
        const cropButData = this.props.crops.cropButtons.filter(item => item.id === this.props.crops.selectedId);
    //    console.log('Crop Code:', cropButData[0].code);
        Actions.orders({ Crop: cropButData[0].code });
    }

    placeNewOrder() {
        const cropButData = this.props.crops.cropButtons.filter(item => item.id === this.props.crops.selectedId);
     //   console.log(cropButData[0].code, cropButData[0].year);
        Actions.quoteswap({ cropcode: cropButData[0].code, cropyear: cropButData[0].year });
    }

    render() {
        const { width } = Dimensions.get('window');
        return (
            <View >
                <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: 20 }} />
                <LogoHomeHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)', height: 705 }}>
                    <View style={{ height: 83, width: 1024, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                    <View>
                    <View style={styles.orderReceipt}>

                        <Text style={styles.textOrderReceipt}> Order Receipt</Text>
                    </View>
                    <View style={{ backgroundColor: 'rgb(61,76,87)', height: 513, marginHorizontal: 16 }}>
                        <Text style={styles.textCongratulations}> Congratulations! Your order has been received!</Text>
                        <Image source={confirmtick} style={styles.imageStyle} />
                        <View style={styles.messageView}>
                            <Text style={styles.orderSuccess}> Your order was successfully received. Your order number is:</Text>
                            <Text style={styles.orderNumber}> {this.props.orderId} {this.props.message/*2394874598723298*/}</Text>
                            <Text style={[styles.textStyle, { paddingTop: 20 }]}>Once your order is complete you can view your trade details in the</Text>
                            <Text style={styles.textStyle}>Positions & Orders screen by clicking the button below. The Position</Text>
                            <Text style={styles.textStyle}>& Orders screen allows you to manage your orders and open</Text>
                            <Text style={styles.textStyle}>positions.</Text>
                            <View
                            style={{
                            flexDirection: 'row',
                            marginTop: 30,
                            marginBottom: 10,
                            marginHorizontal: 50,
                           justifyContent: 'space-between'
                        }}
                            >
                                <TouchableHighlight
                                    style={[styles.buttonStyle, { borderColor: 'rgb(159,169,186)', backgroundColor: 'white' }]}
                                    onPress={this.onBackToOrders.bind(this)}
                                >
                                    <Text
                                        style={[styles.buttonTextStyle, { color: 'rgb(159,169,186)' }]}
                                    >
                                        BACK TO DASHBOARD
                                    </Text>
                                </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.buttonStyle}
                                onPress={this.reviewPositionsOrder.bind(this)}
                            >
                                <Text
                                    style={styles.buttonTextStyle}
                                >
                                    REVIEW POSITIONS & ORDERS
                                </Text>
                            </TouchableHighlight>
                                <TouchableHighlight
                                    style={styles.buttonStyle}
                                    onPress={this.placeNewOrder.bind(this)}
                                >
                                    <Text
                                        style={styles.buttonTextStyle}
                                    >
                                        PLACE NEW ORDER NOW
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    textStyle: { color: 'rgb(61,76,87)', fontFamily: 'HelveticaNeue-Medium', alignSelf: 'center' },
    buttonTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'HelveticaNeue'
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'rgb(1,172,168)',
        borderColor: 'rgb(1,172,168)',
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderReceipt: {
        borderTopColor: 'rgb(231,181,20)',
        borderTopWidth: 4,
        height: 60,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: 35,
        justifyContent: 'center'
    },
    textOrderReceipt: {
        color: 'rgb(0,116,129)',
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 20,
        paddingLeft: 20
    },
    textCongratulations: {
        color: 'white',
        paddingTop: 25,
        paddingLeft: 25,
        fontSize: 32,
        fontFamily: 'HelveticaNeue-Thin'
    },
    imageStyle: {
         height: 109,
        width: 109,
        marginTop: 80,
        position: 'absolute',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 54
     },
    messageView: {
        height: 376,
        marginTop: 50,
        marginHorizontal: 25,
        backgroundColor: 'white',
        zIndex: -1,
        borderRadius: 4
    },
    orderSuccess: {
        color: 'rgb(96,109,119)',
        fontSize: 17,
        fontFamily: 'HelveticaNeue-Medium',
        alignSelf: 'center',
        paddingTop: 100
    },
    orderNumber: {
        color: 'rgb(61,76,87)',
        fontSize: 23,
        fontFamily: 'HelveticaNeue-Bold',
        alignSelf: 'center',
        paddingTop: 20
    }
};
const mapStateToProps = (state) => {
    return { crops: state.cropsButtons };
};

export default connect(mapStateToProps, null)(TradeConfirmationOrderReceipt);