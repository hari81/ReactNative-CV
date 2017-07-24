import React, { Component } from 'react';
import {
    Text, TouchableHighlight, View
} from 'react-native';
import { connect } from 'react-redux';
import { onCancelButtonPress } from '../actions/index';

class OrderItem extends Component {

    onCancelButtonPress(e) {
        this.props.onCancelButtonPress(e);
    }
    render() {
        return (
            <View style={styles.subContainerStyle}>
                <View style={styles.contentContainerStyle}>
                    <Text style={{ fontSize: 20 }}>July</Text>
                    <Text style={{ fontSize: 20 }}>2017</Text>
                </View>
                <View>
                    <Text style={{ paddingLeft: 10, paddingTop: 10 }}>Corn CRM Swap</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 10, paddingTop: 26 }}>QUANTITY</Text>
                        <Text style={{ paddingLeft: 36, paddingTop: 26 }}>DIRECTION</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{ paddingLeft: 10, paddingTop: 2 }}
                        >2,000 bushels</Text>
                        <Text style={{ paddingLeft: 12, paddingTop: 2 }}>Sell</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                    <Text style={{ paddingTop: 10 }}> ORDER #</Text>
                    <Text> 94645 </Text>
                    <Text style={{ paddingTop: 10 }}> PRICE</Text>
                    <Text> $0.0 </Text>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                    <Text style={{ paddingTop: 10 }}> STATUS </Text>
                    <Text> Pending </Text>
                    <Text style={{ paddingTop: 10 }}> ORDER TYPE</Text>
                    <Text> Market </Text>
                </View>
                <View style={{ flexDirection: 'column', marginLeft: 30 }}>
                    <Text style={{ paddingTop: 10 }}> ORDER CREATION DATE</Text>
                    <Text> 2017-06-09 10:58:42 </Text>
                    <Text style={{ paddingTop: 10 }}> ORDER EXPIRATION DATE </Text>
                    <Text> 2017-06-29 </Text>
                </View>
                <View style={styles.buttonview}>
                    <TouchableHighlight
                        style={styles.viewbutton}
                        onPress={() => this.onCancelButtonPress()}
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
        containerStyle: {
            flex: 1,
            backgroundColor: '#007681',


        },
        positionTextStyle: {
            fontSize: 20,
            paddingTop: 20,
            paddingLeft: 30,
            fontWeight: 'bold',


        },
        subContainerStyle: {
            height: 94,
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            marginRight: 10,
            marginLeft: 10,
            borderRadius: 3,
            justifyContent: 'flex-start',


        },
        contentContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 70,
            width: 100,
            borderWidth: 1,
            borderColor: '#007681',
            marginLeft: 10,
            marginTop: 12


        },
        segmentarea: {
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 64,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#279989',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 5,
        },
        segment: {
            marginLeft: 50,
            width: 500,

        },
        positions: {
            left: 30,
            justifyContent: 'center',
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
const mapStateToProps = ({ auth }) => {
    const { message } = auth
    return {
        message
    };
}

export default connect(mapStateToProps, { onCancelButtonPress })(OrderItem);





































