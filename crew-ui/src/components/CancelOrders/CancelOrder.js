/*jshint esversion: 6 */
'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  Switch,
  Image,
  AlertIOS,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import { bindActionCreators } from 'redux';
import { LogoHeader, OrderButton } from '../common/index';
import { orderReceipt } from '../../redux/actions/CancelOrders';

class CancelOrder extends Component {
  constructor() {
    super();
   /* this.state = {
      switchValue: false
    };*/
  }

  onBackToOrders() {
    Actions.orders();

  }
  cancelOrder() {

    this.props.orderReceipt(this.props.orderId);

  }
 /* toggleSwitch = value => {
    this.setState({ switchValue: value });
  };*/

  render() {
    const { width, height } = Dimensions.get('window');

    return (
      <View style={styles.containerStyle}>
        <StatusBar barStyle='light-content' />

        <View
          style={{
            backgroundColor: 'black',
            width,
            height: 20
          }}
        />

        <LogoHeader subHeaderText='PRICE HEDGING' phNumber='+1-952-742-7414' />

        <View style={{ height: 80, backgroundColor: 'gray' }}>
          <View
            style={{
              height: 60,
              borderTopColor: '#e7b514',
              borderTopWidth: 3,
              backgroundColor: 'white',
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              justifyContent: 'flex-end'
            }}
          >
            <Text style={styles.headerText}>Review Cancel Details</Text>
          </View>
        </View>

        <View style={{ backgroundColor: 'white' }}>
          <View style={{ backgroundColor: '#3d4c57', margin: 20 }}>
            <Text style={styles.subHeaderTextStyle}>Cancel this order? </Text>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 40,
                marginRight: 20,
                marginLeft: 20,
                marginBottom: 30,
                height: 450
              }}
            >
              <View style={styles.productContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text>Your trade direction is</Text>
                    <Text style={styles.contentStyle}>
                      {this.props.buySell}
                    </Text>
                    <Text>Your crop is</Text>
                    <Text style={styles.contentStyle}>
                      {this.props.crop}
                    </Text>
                    <Text>Your crop year is</Text>

                    <Text style={styles.contentStyle}>
                      {this.props.year}
                    </Text>
                    <Text>Your contract month is</Text>
                    <Text style={styles.contentStyle}>
                      {this.props.month}
                    </Text>
                  </View>

                  <View style={{ marginLeft: 80 }}>
                    <Text>Your product is</Text>
                    <Text style={styles.contentStyle}>
                      {this.props.riskProductName}
                    </Text>
                    <Text>Your bushel quantity is</Text>
                    <Text style={styles.contentStyle}>
                      {this.props.quantity
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </Text>
                    <Text>Your order type is</Text>
                    <Text style={styles.contentStyle}>
                      {this.props.orderType}
                    </Text>
                  </View>
                </View>
                  {/*<View style={{ flexDirection: 'row', marginTop: 120 }}>
                  <Switch
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue}
                    onTintColor='#01aca8'
                  />
                  <Text style={{ paddingTop: 8, marginLeft: 12, fontSize: 18 }}>
                    Agree to Terms and Conditions
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, marginLeft: 10 }}
                    source={require('./common/img/Info.png')}
                  />
                </View>*/}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 120,
                    marginBottom: 10,
                    marginLeft: 160,
                    marginRight: 160
                  }}
                >
                  <OrderButton onPress={this.onBackToOrders.bind(this)}>
                    BACK TO ORDERS LIST
                  </OrderButton>
                    { /* style={[
                      styles.buttonStyle,
                      this.state.switchValue
                        ? { backgroundColor: '#279989' }
                        : { backgroundColor: 'gray' }
                    ]}

                    disabled={!this.state.switchValue} */}
                  <TouchableHighlight

                      style={styles.buttonStyle}
                    onPress={this.cancelOrder.bind(this)}
                  >
                      {/* style={[
                        styles.textStyle,
                        this.state.switchValue
                          ? { color: 'white' }
                          : { color: 'black' }
                      ]} */}
                    <Text

                        style = {[styles.textStyle,{color:'white'} ]}
                    >
                      CANCEL ORDER NOW
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
  textStyle: {
    alignSelf: 'center',

    fontSize: 20,
    fontWeight: '600',
    color: '#279989',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#01aca8',
    backgroundColor: '#01aca8',
    marginLeft: 5,
    marginRight: 5
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'column',

    borderColor: '#3d4c57'
  },

  headerText: {

    paddingLeft: 14,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#279989'
  },
  subHeaderTextStyle: {

    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 30,
    color: 'white',
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
  contentStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 100
  }
};



const mapDispatchToProps = dispatch => {
  return bindActionCreators({  orderReceipt }, dispatch);
};

export default connect(null, mapDispatchToProps)(CancelOrder);
