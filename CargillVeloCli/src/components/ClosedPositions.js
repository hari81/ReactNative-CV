import React from 'react';
import {
    Text, View, Image, TouchableHighlight, Linking
} from 'react-native';

const ClosedPositions = ({ item }) => {
        const { id, product } = item;
        return (

            <View style={styles.subContainerStyle}>
                <View style={styles.contentContainerStyle}>
                    <Text style={{ fontSize: 20 }}>Sep</Text>
                    <Text style={{ fontSize: 20 }}>2017</Text>
                </View>

                <View style={{ margin: 14 }}>
                    <Text >Corn CRM Swap</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'green' }}>QUANTITY</Text>
                        <View style={{ width: 100 }}>
                            <Text>100000</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <Text style={{ color: 'green' }}>DIRECTION</Text>
                        <Text >Sell</Text>
                      </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}> PRODUCT</Text>
                    <Text> {product}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <View style={{ flexDirection: 'column' }}>
                           <Text style={{ color: 'green' }}> NET PRICE</Text>
                           <Text> $1 </Text>
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                           <Text style={{ color: 'green' }}> CLOSED PRICE</Text>
                            <View style={{ width: 100 }}>
                                <Text>100000</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10  }}>
                   <View style={{ flexDirection: 'row' }}>
                       <Text style={{ color: 'green' }}> TRADE RECEIPT </Text>
                       <TouchableHighlight onPress={() => Linking.openURL('https://www.google.com')}><Image
                         style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }}
                         source={require('./common/img/PDF.png')}
                       /></TouchableHighlight>
                   </View>
                      <Text style={{ color: 'green', marginTop: 16 }}> TRADE ID#</Text>
                      <Text> {id} </Text>
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 20, marginTop: 10 }}>
                    <Text style={{ color: 'green' }}> TRADE DATE</Text>
                    <Text> 07-27-2017</Text>
                    <Text style={{ color: 'green', marginTop: 6 }}> STATUS</Text>
                    <Text> {product} </Text>
                </View>

            </View>

        );
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
            width: 100,
            borderWidth: 1,
            borderColor: 'green',
            marginLeft: 14,
            marginTop: 14,
            marginBottom: 14



        },

    }
;


export default ClosedPositions;
