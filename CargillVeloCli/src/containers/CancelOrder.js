import React, { Component } from 'react';
import { Text, View, Switch, Image,TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoHeader, OrderButton } from '../components/common/index';
import { backToOrders } from '../actions/index';

class CancelOrder extends Component {
    state = {
        switchValue: false
    }

    onBackToOrders(e) {
        this.props.backToOrders(e);
    }
    toggleSwitch = (value) => this.setState({ switchValue: value })

    render() {
        return (
              <View style={styles.containerStyle}>
                <LogoHeader
                subHeaderText="PRICE HEDGING"
                phNumber="+1-952-742-7414"
                />
                  <View >
                      <Text style={styles.headerText}>Review Cancel Details</Text>
                      <Text style={styles.subHeaderTextStyle}>Cancel this order? </Text>
                      <View style={styles.productContainer}>
                          <View style={{ flexDirection: 'row' }}>

                              <View>
                                  <Text >
                                      Your trade direction is
                                  </Text>
                                  <Text style={styles.contentStyle}>Sell</Text>
                                  <Text >
                                      Your crop is a
                                  </Text>
                                  <Text style={styles.contentStyle}>
                                      Corn
                                  </Text>
                                  <Text >
                                      Your crop year is
                                  </Text>

                                  <Text style={styles.contentStyle}>2017</Text>
                                  <Text >
                                      Your contract month is
                                  </Text>
                                  <Text style={styles.contentStyle}>July</Text>
                              </View>

                              <View style={{ marginLeft: 80 }} >
                                  <Text >
                                      Your product is
                                  </Text>
                                  <Text style={styles.contentStyle}>CRM Swap</Text>
                                  <Text >
                                      Your bushel quantity is
                                  </Text>
                                  <Text style={styles.contentStyle}>{this.props.quantity}</Text>
                                  <Text >
                                      Your order type is
                                  </Text>
                                  <Text style={styles.contentStyle}>Market</Text>
                              </View>


                          </View>

                          <View style={{ flexDirection: 'row', marginTop: 200 }}>
                              <Switch
                                  onValueChange={this.toggleSwitch}
                                  value={this.state.switchValue}
                              />
                              <Text style={{ paddingTop: 8, marginLeft: 12, fontSize: 18 }}>
                                  Agree to Terms and Conditions
                              </Text>
                              <TouchableHighlight onPress={() => <Text />}><Image
                              style={{ width: 30, height: 30, marginLeft: 10 }}
                              source={ require('../components/common/img/Info.png' )}
                              /></TouchableHighlight>
                          </View>

                          <View
                              style={{ flexDirection: 'row',
                              marginTop: 10,
                              marginBottom: 10,
                              marginLeft: 160,
                              marginRight: 160 }}
                          >
                              <OrderButton
                                  onPress={this.onBackToOrders.bind(this)}
                              >BACK TO ORDERS LIST</OrderButton>
                              <OrderButton>CANCEL ORDER NOW</OrderButton>
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
        borderColor: '#007681'
    },

    headerText: {
        height: 100,
        justifyContent: 'flex-start',
        paddingTop: 8,
        paddingLeft: 14,
        fontSize: 20,
        fontWeight: 'bold'
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
        backgroundColor: '#007681'
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
}
const mapStateToProps = (state) => {
    return {
        quantity: state.cancelItem
    }
}




const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ backToOrders }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(CancelOrder);

