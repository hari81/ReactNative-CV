'use strict';

import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import { bindActionCreators } from 'redux';
import { LogoHeader } from '../common/index';
import MyFarmTiles from '../../components/DashBoard/MyFarmTiles';
import { orderReceipt } from '../../redux/actions/CancelOrders';

class CancelOrder extends Component {
  onBackToOrders() {
    Actions.orders();
  }

  cancelOrder() {
    this.props.orderReceipt(this.props.orderId);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <StatusBar barStyle='light-content' />

        {/* header stuff */}
        <View style={{ backgroundColor: '#000', width, height: 20 }} />
        <LogoHeader subHeaderText='PRICE HEDGING' phNumber='+1-952-742-7414' />

        <View style={{ backgroundColor: '#eff4f7' }}>
          <View style={{ height: 83, width, backgroundColor: '#404e59' }} />

          <MyFarmTiles />

          <View style={{ marginTop: 20 }}>
            <View style={styles.backHeader}>
                <View style={styles.headerTextBox}>
                    <Text style={styles.headerText}>Review Cancel Details</Text>
                </View>
            </View>
          </View>
        </View>

        {/* cancel main content */}
        <View style={styles.cancelMain}>
            <View style={styles.cancelContainer}>
              <Text style={styles.cancelTitle}>Cancel this order?</Text>
              <View style={styles.orderContainer}>
                {/* order details */}
                <View style={styles.orderFields}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.orderField}>
                      <Text style={styles.orderLabel}>Your trade direction is</Text>
                      <Text style={styles.orderData}>{this.props.buySell}</Text>
                    </View>
                    <View style={styles.orderField}>
                      <Text style={styles.orderLabel}>Your crop is</Text>
                      <Text style={styles.orderData}>{this.props.crop}</Text>
                    </View>
                    <View style={styles.orderField}>
                      <Text style={styles.orderLabel}>Your crop year is</Text>
                      <Text style={styles.orderData}>{this.props.year}</Text>
                    </View>
                    <View style={styles.orderField}>
                      <Text style={styles.orderLabel}>Your contract month is</Text>
                      <Text style={styles.orderData}>{this.props.month}</Text>
                    </View> 
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.orderField}>
                      <Text style={styles.orderLabel}>Your product is</Text>
                      <Text style={styles.orderData}>{this.props.riskProductName}</Text>
                    </View>
                    <View style={styles.orderField}>
                      <Text style={styles.orderLabel}>Your bushel quantity is</Text>
                      <Text style={styles.orderData}>{this.props.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                    </View>
                    <View style={styles.orderField}>
                      <Text style={styles.orderLabel}>Your order type is</Text>
                      <Text style={styles.orderData}>{this.props.orderType}</Text>
                    </View>
                  </View>
                </View>

                {/* buttons */}
                <View style={styles.buttonContainer}>
                  <View style={[styles.orderButtonStyle, styles.backButtonStyle]}>
                    <TouchableHighlight onPress={this.onBackToOrders.bind(this)}>
                      <Text style={[styles.orderButtonTextStyle, { color: '#9fa9ba' }]}>BACK TO ORDERS LIST</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={[styles.orderButtonStyle, { backgroundColor: '#279988' }]}>
                    <TouchableHighlight onPress={this.cancelOrder.bind(this)}>
                      <Text style={[styles.orderButtonTextStyle, { color: '#fff' }]}>CANCEL ORDER NOW</Text>
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

const { width, height } = Dimensions.get('window');

const styles = {
    /* container */
    cancelMain: { height: height - 100, backgroundColor: '#eff4f7', zIndex: -1 },
    cancelContainer: { height: height - 250, backgroundColor: '#404e59', marginLeft: 15, marginRight: 15, padding: 15, paddingBottom: 50 },
    cancelTitle: { backgroundColor: '#404e59', fontFamily: 'HelveticaNeue-Thin', fontSize: 30, color: '#fff', marginRight: 150, marginBottom: 15 },

    /* order fields */
    orderContainer: { height: height - 350, flexDirection: 'column', backgroundColor: '#fff', borderRadius: 5, padding: 20, paddingLeft: 100, paddingTop: 30, paddingRight: 100 },
    orderFields: { flexDirection: 'row', flex: 1 },
    orderField: { marginBottom: 10 },
    orderLabel: { color: '#888', fontSize: 12 },
    orderData: { color: '#404e59', fontSize: 16 },

    /* button styles */
    buttonContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    orderButtonStyle: { alignItems: 'center', alignSelf: 'center', justifyContent: 'center', marginTop: 30, borderRadius: 4, paddingLeft: 20, paddingTop: 10, paddingRight: 20, paddingBottom: 10 },
    orderButtonTextStyle: { fontFamily: 'HelveticaNeue', color: '#4a4a4a', fontSize: 20 },
    backButtonStyle: { backgroundColor: '#fff', marginRight: 40, borderColor: 'rgb(159,169,186)', borderWidth: 1 },

    /* small page header */
    backHeader: { backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#bed8dd', borderTopColor: '#e7b514', borderTopWidth: 4, marginTop: 20, marginLeft: 15, marginRight: 15 },
    headerTextBox: { marginTop: 10, marginBottom: 10, borderRightColor: '#e6eaee', borderRightWidth: 2 },
    headerText: { fontFamily: 'HelveticaNeue', color: '#007681', fontSize: 18, paddingLeft: 10, paddingRight: 10 }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ orderReceipt }, dispatch);
};

export default connect(null, mapDispatchToProps)(CancelOrder);
