import React, { Component } from 'react';
import { Text, View, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { CommonHeader } from '../common/index';
import MyFarmTiles from '../common/MyFarmTiles';
import { orderReceipt } from '../../redux/actions/CancelOrders';
import * as common from '../../Utils/common';
import { Button } from '../common/Button';
import bugsnag from '../common/BugSnag';

class CancelOrder extends Component {
  onBackToOrders() {
    Actions.orders({ Crop: this.props.selectedCrop });
  }

  cancelOrder() {
    this.props.orderReceipt(this.props.item.orderId, this.props.selectedCrop);
  }

  render() {
      try {
          console.log(this.props.item);
          const cancelData = this.props.item;
          return (
              <View style={styles.containerStyle}>
                  <StatusBar barStyle='light-content'/>

                  {/* header stuff */}
                  <View style={{backgroundColor: '#000', width, height: 20}}/>
                  <CommonHeader/>

                  <View style={{backgroundColor: '#eff4f7'}}>
                      <View style={{height: 83, width, backgroundColor: '#404e59'}}/>

                      <MyFarmTiles/>

                      <View style={{marginTop: 20}}>
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
                                  <View style={{flex: 1}}>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your crop is</Text>
                                          <Text style={styles.orderData}>{cancelData.crop} {cancelData.year}</Text>
                                      </View>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your order# is</Text>
                                          <Text style={styles.orderData}>{cancelData.orderId}</Text>
                                      </View>

                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your trade direction is</Text>
                                          <Text style={styles.orderData}>{cancelData.buySell}</Text>
                                      </View>

                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your contract details are</Text>
                                          <Text style={styles.orderData}>{cancelData.month} {cancelData.year}</Text>
                                      </View>

                                  </View>
                                  <View style={{flex: 1}}>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your contract expiry date is</Text>
                                          <Text
                                              style={styles.orderData}>{common.formatDate(cancelData.expirationDate, 5)}</Text>
                                      </View>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your bushel quantity is</Text>
                                          <Text
                                              style={styles.orderData}>{cancelData.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                      </View>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your order type is</Text>
                                          <Text
                                              style={styles.orderData}>{cancelData.orderType.charAt(0) + cancelData.orderType.slice(1, cancelData.orderType.length).toLocaleLowerCase()}</Text>
                                      </View>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your order will be valid until</Text>
                                          <Text
                                              style={styles.orderData}>{cancelData.goodTilDate === undefined ? 'N/A' : common.formatDate(cancelData.goodTilDate, 5)}</Text>
                                      </View>
                                  </View>
                                  <View style={{flex: 1}}>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your order status is</Text>
                                          <Text
                                              style={styles.orderData}>{cancelData.orderState.label.charAt(0) + cancelData.orderState.label.slice(1, cancelData.orderState.label.length).toLocaleLowerCase()}</Text>
                                      </View>
                                      <View style={styles.orderField}>
                                          <Text style={styles.orderLabel}>Your price is</Text>
                                          <Text
                                              style={styles.orderData}>{cancelData.orderType === 'MARKET' ? 'Market' : '$' + cancelData.targetPrice}</Text>
                                      </View>

                                  </View>

                              </View>

                              {/* buttons */}
                              <View style={styles.buttonContainer}>
                                  <Button buttonStyle={[styles.orderButtonStyle, styles.backButtonStyle]}
                                          textStyle={[styles.orderButtonTextStyle, {color: '#9fa9ba'}]}
                                          onPress={this.onBackToOrders.bind(this)}>
                                      BACK TO ORDERS LIST
                                  </Button>
                                  <Button buttonStyle={[styles.orderButtonStyle, {backgroundColor: '#279988'}]}
                                          textStyle={[styles.orderButtonTextStyle, {color: '#fff'}]}
                                          onPress={this.cancelOrder.bind(this)}>
                                      CANCEL ORDER NOW
                                  </Button>
                              </View>
                          </View>
                      </View>
                  </View>

              </View>
          );
      } catch (error) {
          bugsnag.notify(error);
      }
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
    orderFields: { flexDirection: 'row', flex: 1, marginLeft: 80 },
    orderField: { marginBottom: 10 },
    orderLabel: { color: 'rgb(59,74,85)', fontSize: 14, fontFamily: 'HelveticaNeue-Thin' },
    orderData: { color: 'rgb(59,74,85)', fontSize: 20, fontFamily: 'HelveticaNeue' },

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
