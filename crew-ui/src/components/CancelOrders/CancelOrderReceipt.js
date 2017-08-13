/*jshint esversion: 6 */
"use strict";

import React, { Component } from "react";
import { Text, View, Image, AlertIOS, StatusBar } from "react-native";
import { Actions } from "react-native-router-flux";
import Dimensions from "Dimensions";
import { LogoHeader, OrderButton } from "../common/index";

import confirm from "../common/img/confirmationSuccess.png";

class CancelOrderReceipt extends Component {
  onBackToDashBoard() {
    Actions.dashboard();
  }

  reviewPositions() {
      Actions.orders();
  }
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View style={styles.containerStyle}>
        <StatusBar barStyle="light-content" />

        <View
          style={{
            backgroundColor: "black",
            width: width,
            height: 20
          }}
        />

        <LogoHeader subHeaderText="PRICE HEDGING" phNumber="+1-952-742-7414" />

        <View style={{ height: 80, backgroundColor: "gray" }}>
          <View
            style={{
              height: 60,
              borderTopColor: "#e7b514",
              borderTopWidth: 3,
              backgroundColor: "white",
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              justifyContent: "flex-end"
            }}
          >
            <Text style={styles.headerText}>Order Receipt</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <View style={{ backgroundColor: "#3d4c57", margin: 20 }}>
            <Text style={styles.subHeaderTextStyle}>
              Your Order has been cancelled{" "}
            </Text>
            <View
              style={{
                backgroundColor: "white",
                marginTop: 30,
                marginRight: 20,
                marginLeft: 20,
                marginBottom: 30,
                height: 470
              }}
            >
              <View style={styles.productContainer}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image source={confirm} style={{ width: 120, height: 120 }} />

                  <Text style={{ marginTop: 50, fontSize: 20 }}>
                    Your order was cancelled. Your order number is:{" "}
                    {this.props.orderid}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 150,
                    marginBottom: 20,
                    marginLeft: 160,
                    marginRight: 160
                  }}
                >
                  <OrderButton onPress={this.onBackToDashBoard.bind(this)}>
                    BACK TO DASHBOARD
                  </OrderButton>
                  <OrderButton onPress={this.reviewPositions.bind(this)}>
                    REVIEW POSITIONS & ORDERS
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
    flexDirection: "column",
    borderColor: "#3d4c57"
  },

  headerText: {
    justifyContent: "flex-start",
    paddingTop: 8,
    paddingLeft: 14,
    fontSize: 20,
    fontWeight: "bold",

    color: "#01aca8"
  },
  subHeaderTextStyle: {
    justifyContent: "flex-start",

    fontSize: 30,
    color: "white",
    paddingTop: 8,

    paddingLeft: 14
  },
  productContainer: {
    alignItems: "center",
    paddingTop: 20
  }
};

export default CancelOrderReceipt;
