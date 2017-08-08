/*jshint esversion: 6 */
'use strict';
import React, { Component } from 'react';
import { Text, View, Switch, Image, AlertIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoHeader, OrderButton } from './common/index';
import { backToOrders } from '../redux/actions/index';

import confirm from './common/img/confirmationSuccess.png';

class CancelOrderReceipt extends Component {


    onBackToDashBoard(e) {

        Actions.dashboard();
    }

    reviewPositions() {

    }
    render() {
        return (
            <View style={styles.containerStyle}>
                <LogoHeader
                subHeaderText="PRICE HEDGING"
                phNumber="+1-952-742-7414"
                />
                  <View style={{ borderTopColor: '#e7b514', borderTopWidth: 3}}>
                      <Text style={styles.headerText}>Order Receipt</Text>
                      <Text style={styles.subHeaderTextStyle}>Your Order has been cancelled.</Text>
                      <View style={styles.productContainer}>
                         <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={confirm} style={{width:120, height: 120}} />

                            <Text style={{ marginTop: 50, fontSize: 20}}>
                                Your order was cancelled. Your order number is: {this.props.orderid}</Text>

                          </View>
                          <View
                              style={{ flexDirection: 'row',
                              marginTop: 190,
                              marginBottom: 20,
                              marginLeft: 160,
                              marginRight: 160 }}
                            >
                              <OrderButton
                                  onPress={this.onBackToDashBoard.bind(this)}
                              >BACK TO DASHBOARD</OrderButton>
                              <OrderButton
                                  onPress={this.reviewPositions.bind(this)}

                              >REVIEW POSITIONS & ORDERS</OrderButton>
                          </View>

                      </View>
                  </View>
              </View>
        );
    }
}
const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 5,
        borderColor: '#3d4c57'
    },

    headerText: {
        height: 100,
        justifyContent: 'flex-start',
        paddingTop: 8,
        paddingLeft: 14,
        fontSize: 20,
        fontWeight: 'bold',
        borderTopWidth: 3,
        color: '#01aca8'
    },
    subHeaderTextStyle: {
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        fontSize: 30,
        color: '#ffffff',
        paddingTop: 8,
        borderRightWidth: 10,
        paddingLeft: 14,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        backgroundColor: '#3d4c57'
    },
    productContainer: {
        alignItems: 'center',
        paddingTop: 20
    },

};

/*const mapStateToProps = (state) => {
    return {
        data: state.cancelItem
    }
};




const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ backToOrders }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(CancelOrderReceipt);*/

export default CancelOrderReceipt;