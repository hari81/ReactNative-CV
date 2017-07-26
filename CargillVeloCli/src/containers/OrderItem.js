import React, { Component } from 'react';
import {
    Text, TouchableHighlight, View
} from 'react-native';
import { connect } from 'react-redux';
import { onCancelButtonPress } from '../actions/index';

const underlying = require('../restAPI/underlying.json');

class OrderItem extends Component {

    onCancelButtonPress(quantity) {
        this.props.onCancelButtonPress(quantity);
    }
    render() {
        const { quantity,
            orderId,
            createTime,
            expirationDate,
            buySell,
            orderType,
            price,
            riskProductName } = this.props.item;
        return (

            <View style={styles.subContainerStyle}>
                <View style={styles.contentContainerStyle}>
                    <Text style={{ fontSize: 20 }}>{underlying.contractMonth.month.name}</Text>
                    <Text style={{ fontSize: 20 }}>2017</Text>
                </View>
                <View>
                    <Text style={{ paddingLeft: 10, paddingTop: 10 }}>{riskProductName}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, paddingTop: 26 }}>QUANTITY</Text>
                        <Text style={{ paddingLeft: 34, paddingTop: 26 }}>DIRECTION</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{ paddingLeft: 10, paddingTop: 2 }}
                        >{quantity}{}</Text>
                        <Text style={{ paddingLeft: 56, paddingTop: 2 }}>{buySell}</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                    <Text style={{ paddingTop: 10 }}> ORDER #</Text>
                    <Text> {orderId} </Text>
                    <Text style={{ paddingTop: 10 }}> PRICE</Text>
                    <Text> {price} </Text>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                    <Text style={{ paddingTop: 10 }}> STATUS </Text>
                    <Text> Pending </Text>
                    <Text style={{ paddingTop: 10 }}> ORDER TYPE</Text>
                    <Text> {orderType} </Text>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                    <Text style={{ paddingTop: 10 }}> ORDER CREATION DATE</Text>
                    <Text> {createTime}</Text>
                    <Text style={{ paddingTop: 10 }}> ORDER EXPIRATION DATE </Text>
                    <Text> {expirationDate} </Text>
                </View>
                <View style={styles.buttonview}>
                    <TouchableHighlight
                        style={styles.viewbutton}
                        onPress={() => this.onCancelButtonPress(quantity)}
                        underlayColor='#dddddd'
                    >
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}
const styles = {

    subContainerStyle: {
             flex: 2,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: '#ffffff',
            borderRadius: 4,
            height: 95


        },
        contentContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 70,
            width: 100,
            borderWidth: 1,
            borderColor: 'green',
            marginLeft: 10,
            marginTop: 12


        },
        buttonview: {
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            width: '20%'
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
            alignItems: 'center'
        }
    }
;


export default connect(null, { onCancelButtonPress })(OrderItem);
