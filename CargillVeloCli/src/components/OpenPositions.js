/*jshint esversion: 6 */
'use strict';
import React, { Component } from 'react';
import {
    Text, TouchableHighlight, View, Image, Linking
} from 'react-native';

class OpenPositions extends Component {
    render() {
        const { id, status,
            riskProduct, confirm,
            quantity, buysell,
            product, netPremium,
            tradeDate, underlying } = this.props.item;
        console.log(this.props.item.buysell);
        let direction = (buysell === 'B' ? 'Buy' : 'Sell')
        return (
            <View style={styles.subContainerStyle}>
                <View style={styles.yearStyle}>
                    <View style={{ backgroundColor: '#01aca8', height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
                            {underlying.contractMonth.month.name}
                        </Text>
                    </View>
                    <View style={{ backgroundColor: '#3d4c57', height: 50, justifyContent: 'center' }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 25,
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >{underlying.contractMonth.year.value}
                        </Text>
                    </View>

                </View>
                <View>
                    <View style={{ margin: 14 }}>
                        <Text>{underlying.commodity.name} {riskProduct}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'green' }}>QUANTITY</Text>
                                <View style={{ width: 100 }}>
                                    <Text>{quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text>{underlying.commodity.unit}s</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'green' }}>DIRECTION</Text>
                                <Text>{direction}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}>PRODUCT</Text>
                    <Text>{product}</Text>
                    <Text style={{ color: 'green', marginTop: 6 }}> NET PRICE</Text>
                    <Text> {netPremium}</Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'green' }}> TRADE RECEIPT </Text>
                        <TouchableHighlight onPress={() => Linking.openURL(confirm)}><Image
                            style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }}
                            source={require('./common/img/PDF.png')}
                        /></TouchableHighlight>
                    </View>
                    <Text style={{ color: 'green', marginTop: 16 }}> TRADE ID#</Text>
                    <Text> {id} </Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}> TRADE DATE </Text>
                    <Text>{tradeDate}</Text>
                    <Text style={{ color: 'green', marginTop: 6 }}> STATUS </Text>
                    <Text> {status} </Text>
                </View>
                <View style={styles.borderStyle} />
                <View style={styles.buttonview}>
                    <TouchableHighlight
                        style={styles.viewbutton}
                        onPress={() => this.onUnwindButtonPress()}
                        underlayColor='#dddddd'
                    >
                        <Text style={styles.buttonText}>UNWIND</Text>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}
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
            width: 120,
            borderWidth: 1,
            borderColor: 'green',
            marginLeft: 14,
            marginTop: 14,
            marginBottom: 14


        },
        buttonview: {
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
        },
        borderStyle: {
            borderLeftWidth: 2,
            borderColor: 'grey',
            marginTop: 16,
            marginBottom: 16,
            marginLeft: 4,
            marginRight: 8
        },
        yearStyle: {
            marginRight: 10,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 10,
            width: 100,
            justifyContent: 'space-around',
        }
    }
;


export default OpenPositions;