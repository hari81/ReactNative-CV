import React, { Component } from 'react';
import { Text, View, Switch, Image, AlertIOS, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { LogoHeader, OrderButton } from './common/index';
import { backToOrders, orderReceipt } from '../redux/actions/index';

class CancelOrder extends Component {
    state = {
        switchValue: false,

    }

    onBackToOrders(e) {
        //Actions.orders();
        this.props.backToOrders(e);
    }
    cancelOrder () {

            console.log(this.props.orderId);
            this.props.orderReceipt(this.props.orderId)
            //Actions.cancelorderreceipt();

    }
    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
    }

    render() {

        console.log(this.props);
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
                                  <Text style={styles.contentStyle}>{this.props.buySell}</Text>
                                  <Text >
                                      Your crop is
                                  </Text>
                                  <Text style={styles.contentStyle}>
                                      {this.props.crop}
                                  </Text>
                                  <Text >
                                      Your crop year is
                                  </Text>

                                  <Text style={styles.contentStyle}>{this.props.year}</Text>
                                  <Text >
                                      Your contract month is
                                  </Text>
                                  <Text style={styles.contentStyle}>{this.props.month}</Text>
                              </View>

                              <View style={{ marginLeft: 80 }} >
                                  <Text >
                                      Your product is
                                  </Text>
                                  <Text style={styles.contentStyle}>{this.props.riskProductName}</Text>
                                  <Text>
                                      Your bushel quantity is
                                  </Text>
                                  <Text style={styles.contentStyle}>{this.props.quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</Text>
                                  <Text >
                                      Your order type is
                                  </Text>
                                  <Text style={styles.contentStyle}>{this.props.orderType}</Text>
                              </View>


                          </View>

                          <View style={{ flexDirection: 'row', marginTop: 200 }}>
                              <Switch
                                  onValueChange={this.toggleSwitch}
                                  value={this.state.switchValue}
                                  onTintColor="#01aca8"
                              />
                              <Text style={{ paddingTop: 8, marginLeft: 12, fontSize: 18 }}>
                                  Agree to Terms and Conditions
                              </Text>
                              <Image
                              style={{ width: 30, height: 30, marginLeft: 10 }}
                              source={ require('./common/img/Info.png' )}
                              />
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
                              <TouchableHighlight
                                  style={[styles.buttonStyle, this.state.switchValue?  {backgroundColor: '#279989'} : {}]}
                                  onPress={this.cancelOrder.bind(this)}
                                  disabled = {!this.state.switchValue}

                              ><Text style={[styles.textStyle, this.state.switchValue?  {color: 'white'} : {} ]}> CANCEL ORDER NOW </Text></TouchableHighlight>
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
        color: 'black',
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
        marginLeft: 5,
        marginRight: 5
    },
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

const mapStateToProps = (state) => {
    return {
        data: state.cancelItem,
        auth: state.auth
    }
};




const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ backToOrders, orderReceipt }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder);

