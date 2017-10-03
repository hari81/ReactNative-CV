import React, { Component } from 'react';
import { Text, View, Image, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import { LogoHeader, OrderButton } from '../common/index';

import confirm from '../common/img/confirmationSuccess.png';

class CancelOrderReceipt extends Component {
  onBackToDashBoard() {
    Actions.dashboard();
  }

  reviewPositions() {
      Actions.orders();
  }
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

        <View style={{ height: 80, backgroundColor: 'rgb(64,78,89)' }} />
          <View
            style={{
              height: 80,
              borderTopColor: '#e7b514',
              borderTopWidth: 3,
              backgroundColor: 'white',
              marginTop: 83,
              marginHorizontal: 20,
              justifyContent: 'center',
              zIndex: 1,
              position: 'absolute',
              width: width - 40
            }}
          >
            <Text style={styles.headerText}>Order Receipt</Text>
          </View>

        <View style={{ backgroundColor: 'rgb(239,244,247)', height }}>
          <View style={{ backgroundColor: '#3d4c57', margin: 20 }}>
            <Text style={styles.subHeaderTextStyle}>
              Order cancellation status
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                marginTop: 30,
                marginRight: 20,
                marginLeft: 20,
                marginBottom: 30,

              }}
            >
              <View style={styles.productContainer}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image source={confirm} style={{ width: 120, height: 120 }} />
                    <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginTop: 50, fontSize: 20, fontFamily: 'HelveticaNeue-thin', color: 'rgb(96,109,119)' }}>
                      {this.props.message}. Your order number is: </Text>
                    <Text style={{ marginTop: 50, fontSize: 20, fontFamily: 'HelveticaNeue', color: 'rgb(59,74,85)' }}>
                    {this.props.orderid}
                  </Text>

                </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    //marginTop: 150,
                    //marginBottom: 50,
                      marginVertical: 100,
                    marginHorizontal: 160

                  }}
                >
                  <OrderButton onPress={this.onBackToDashBoard.bind(this)}>
                    BACK TO DASHBOARD
                  </OrderButton>
                  <OrderButton onPress={this.reviewPositions.bind(this)}>
                    REVIEW ORDERS
                  </OrderButton>
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
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    borderColor: '#3d4c57'
  },

  headerText: {
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingLeft: 14,
    fontSize: 20,
    fontFamily: 'HelveticaNeue-Medium',
    color: 'rgb(0,116,129)'
  },
  subHeaderTextStyle: {
    justifyContent: 'flex-start',
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 32,
    color: 'white',
    paddingTop: 8,

    paddingLeft: 14
  },
  productContainer: {
    alignItems: 'center',
    paddingTop: 20
  }
};

export default CancelOrderReceipt;
