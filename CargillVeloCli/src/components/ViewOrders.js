import React, { Component } from 'react';
import {
    Text, TouchableHighlight, View
} from 'react-native';
import { connect } from 'react-redux';
import { onCancelButtonPress } from '../redux/actions/index';

const underlying = require('../restAPI/underlying.json');

class OrderItem extends Component {


    onCancelPress(quantity, buySell, orderType, riskProductName) {
        this.props.onCancelButtonPress(quantity, buySell, orderType, riskProductName);
    }
render() {
    const { quantity,
        orderId,
        createTime,
        expirationDate,
        buySell,
        orderState,
        orderType,
        riskProductName } = this.props.item;
        return (

            <View style={styles.subContainerStyle}>
                <View style={styles.contentContainerStyle}>
                    <Text style={{ fontSize: 20 }}>{underlying.contractMonth.month.name}</Text>
                    <Text style={{ fontSize: 20 }}>{underlying.contractMonth.year.value}</Text>
                </View>
                <View >
                    <View style={{ margin: 14 }}>
                        <Text >Corn {riskProductName}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'green' }}>QUANTITY</Text>
                                <View style={{ width: 100 }}>
                                    <Text>{quantity}</Text>
                                    <Text>bushels</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'green' }}>DIRECTION</Text>
                                <Text >{buySell}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}>ORDER #</Text>
                    <Text>{orderId}</Text>
                    <Text style={{ color: 'green', marginTop: 6 }}> PRICE</Text>
                    <Text> N/A </Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}> STATUS </Text>
                    <Text> {orderState.label} </Text>
                    <Text style={{ color: 'green', marginTop: 6 }}> ORDER TYPE </Text>
                    <Text> {orderType} </Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}> ORDER CREATION DATE</Text>
                    <Text> {createTime}</Text>
                    <Text style={{ color: 'green', marginTop: 6 }}> ORDER EXPIRATION DATE </Text>
                    <Text> {expirationDate} </Text>
                </View>
                <View style={styles.borderStyle} />
                <View style={styles.buttonview}>
                    <TouchableHighlight
                        style={styles.viewbutton}
                        onPress={() => this.onCancelPress(quantity, buySell, orderType, riskProductName )}
                        underlayColor='#dddddd'
                    >
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableHighlight>
                </View>
            </View>

        );

}}

const styles = {

    subContainerStyle: {
            flexDirection: 'row',
            margin: 10,
            backgroundColor: '#ffffff',
            borderRadius: 4,
            height: 110
    },
        contentContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            borderWidth: 1,
            borderColor: 'green',
            marginLeft: 14,
            marginTop: 14,
            marginBottom: 14


        },
        buttonview: {
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            width: '20%',
        },
        buttonText: {
            color: '#ffffff',
            fontSize: 16,
            textAlign: 'center',
            justifyContent: 'center'
        },
        viewbutton: {
            height: 35,
            width: 150,
            borderRadius: 5,
            marginTop: 30,
            paddingLeft: 8,
            paddingRight: 8,
            backgroundColor: '#5db7e8',
            justifyContent: 'center',
            alignItems: 'center',

        },
    borderStyle: {
        borderLeftWidth: 2,
        borderColor: 'grey',
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 40
    }
    }
;


export default connect(null, { onCancelButtonPress })(OrderItem);
