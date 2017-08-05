import React, { Component } from 'react';
import {
    Text, TouchableHighlight, View
} from 'react-native';

import { Actions } from 'react-native-router-flux';

class ViewOrders extends Component {

    onCancelPress(items) {
        //this.props.onCancelButtonPress(items);
        Actions.cancelorder(items);
    }
render() {
    const { quantity,
        orderId,
        createTime,
        expirationDate,
        buySell,
        orderState,
        orderType,
        riskProductName, underlyingObject } = this.props.item;
       // console.log(this.props.item);

        return (
            <View style={styles.subContainerStyle}>

                <View style={styles.yearStyle}>
                    <View style={{ backgroundColor: '#01aca8', height: 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
                            {underlyingObject.contractMonth.month.name}
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
                        >
                            {underlyingObject.contractMonth.year.value}
                        </Text>
                    </View>
                </View>

                <View style={{ width: 220 }}>
                    <View style={{ margin: 10 }}>

                        <Text>{underlyingObject.commodity.name}  { riskProductName }</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: '#01aca8' }}>QUANTITY</Text>
                                <View style={{ width: 150 }}>
                                    <Text>{quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " " +
                                    underlyingObject.commodity.unit}s</Text>

                                </View>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: '#01aca8' }}>DIRECTION</Text>
                                <Text>{buySell}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10, width: 70}}>
                    <Text style={{color: '#01aca8'}}>ORDER #</Text>
                    <Text>{orderId}</Text>
                    <Text style={{color: '#01aca8', marginTop: 6}}> PRICE</Text>
                    <Text> N/A </Text>
                </View>

                <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10, width: 130}}>
                    <Text style={{color: '#01aca8'}}> STATUS </Text>
                    <Text> {orderState.label} </Text>
                    <Text style={{color: '#01aca8', marginTop: 6}}> ORDER TYPE </Text>
                    <Text> {orderType} </Text>
                </View>

                <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10, width: 175}}>
                    <Text style={{color: '#01aca8'}}> ORDER CREATION DATE</Text>
                    <Text> {createTime.replace('T',' ').substr(1,18)}</Text>
                    <Text style={{color: '#01aca8', marginTop: 6}}> ORDER EXPIRATION DATE </Text>
                    <Text> {expirationDate} </Text>
                </View>

                <View style={styles.borderStyle}/>

                <View style={styles.buttonview}>
                    <TouchableHighlight
                        style={styles.viewbutton}
                        onPress={() => this.onCancelPress(this.props.item)}
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
            borderColor: '#01aca8',
            marginLeft: 14,
            marginTop: 14,
            marginBottom: 14


        },
        buttonview: {
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            width: '17%',
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
            backgroundColor: '#279989',
            justifyContent: 'center',
            alignItems: 'center',

        },
    borderStyle: {
        borderLeftWidth: 2,
        borderColor: 'grey',
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 40
    },
    yearStyle: {
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: 100,
        justifyContent: 'space-around',
    },

};

/*const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ onCancelButtonPress }, dispatch);
}

export default connect(null, matchDispatchToProps)(ViewOrders);
*/
export default ViewOrders;
