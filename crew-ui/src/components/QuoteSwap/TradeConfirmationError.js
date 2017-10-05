import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { LogoHomeHeader } from '../common';
import MyFarmTiles from '../DashBoard/MyFarmTiles';
import ec from '../common/img/OrderError.png';

class TradeConfirmationError extends Component {
    onBackToOrders() {
        Actions.dashboard();
    }

    render() {
        const { width, height } = Dimensions.get('window');
        return (
            <View >
                <View style={{ backgroundColor: 'rgb(0,0,0)', width, height: 20 }} />
                <LogoHomeHeader />
                <View style={{ backgroundColor: 'rgb(239,244,247)', height: height - 63 }}>
                    <View style={{ height: 83, backgroundColor: 'rgb(64,78,89)' }} />
                    <MyFarmTiles />
                        <View style={styles.orderReceipt} >
                            <Text style={styles.textOrderReceipt}> Order Receipt</Text>
                        </View>
                        <View style={{ backgroundColor: 'rgb(61,76,87)', height: height - 255, marginHorizontal: 16 }}>
                            <Text style={styles.textOopsStyle}> Ooops! There was a problem with your order</Text>
                            <Image source={ec} style={styles.imageStyle} />
                            <View style={[styles.textMessage, { height: height - 392 }]}>
                                <Text style={[styles.textStyle, { paddingTop: 100 }]}>Error Your order was rejected.</Text>

                                <Text style={styles.textStyle}>{this.props.message}</Text>

                                <Text style={[styles.textStyle, { marginTop: 20 }]}>Please contact the trading desk at 1-952-742-7414</Text>
                                <View style={styles.buttonView} >
                                    <TouchableHighlight
                                        style={[styles.buttonStyle]}
                                        onPress={this.onBackToOrders.bind(this)}
                                    >
                                        <Text style={[styles.buttonTextStyle]} >
                                            BACK
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                </View>
            </View>
        );
    }
}

const styles = {
    textStyle: {
        color: 'rgb(221,30,46)',
        fontFamily: 'HelveticaNeue-Medium',
        alignSelf: 'center'
    },
    buttonTextStyle: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'rgb(29,37,49)',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'HelveticaNeue'
    },
    buttonStyle: {
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'rgb(29,37,49)',
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 256
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
    imageStyle: {
        height: 109,
        width: 109,
        marginTop: 80,
        position: 'absolute',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 54
    },
    textOrderReceipt: {
        color: 'rgb(0,116,129)',
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 20,
        paddingLeft: 20
    },
    textOopsStyle: {
        color: 'white',
        paddingTop: 25,
        paddingLeft: 25,
        fontSize: 32,
        fontFamily: 'HelveticaNeue-Thin'
    },
    textMessage: {
        height: 376,
        marginTop: 50,
        marginHorizontal: 25,
        backgroundColor: 'white',
        zIndex: -1,
        borderRadius: 4
    },
    buttonView: {
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 50,
        justifyContent: 'center'
    }

};

export default TradeConfirmationError;
