import React, { Component } from 'react';
import { Text, View, Image, StatusBar, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CommonHeader, Button } from '../common/index';

import confirm from '../common/img/confirmationSuccess.png';

class CancelOrderReceipt extends Component {
  onBackToDashBoard() {
    Actions.dashboard();
  }

  reviewPositions() {
      Actions.orders({ Crop: this.props.selectedCrop });
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

        <CommonHeader />

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
              zIndex: 0,
              position: 'absolute',
              width: width - 40,
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

                  <View style={{ flexDirection: 'row', marginVertical: 100, marginHorizontal: 160 }}>
                      <Button buttonStyle={[styles.orderButtonStyle, styles.backButtonStyle]} textStyle={[styles.orderButtonTextStyle, { color: '#9fa9ba' }]} onPress={this.onBackToDashBoard.bind(this)}>
                          BACK TO DASHBOARD
                      </Button>
                      <Button buttonStyle={[styles.orderButtonStyle, { backgroundColor: '#279988' }]} textStyle={[styles.orderButtonTextStyle, { color: '#fff', paddingHorizontal: 30 }]} onPress={this.reviewPositions.bind(this)}>
                          REVIEW ORDERS
                      </Button>
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
    color: 'rgb(0,116,129)',

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
  },
    orderButtonStyle: { alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 30, borderRadius: 4, paddingLeft: 20, paddingTop: 10, paddingRight: 20, paddingBottom: 10 },
    orderButtonTextStyle: { fontFamily: 'HelveticaNeue', color: '#4a4a4a', fontSize: 20 },
    backButtonStyle: { backgroundColor: '#fff', marginRight: 40, borderColor: 'rgb(159,169,186)', borderWidth: 1 },
};

export default CancelOrderReceipt;
