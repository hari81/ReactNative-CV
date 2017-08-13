/*jshint esversion: 6 */
"use strict";

import React, { Component } from "react";
import { Text, View, Image, TouchableHighlight, Linking } from "react-native";

class ClosedPositions extends Component {
  render() {
    let product = this.props.item.lines.filter(obj => obj.type === "NEW")[0]
      .product;
    let tradeDate = this.props.item.lines.filter(obj => obj.type === "NEW")[0]
      .tradeDate;
    let netPrice = this.props.item.lines.filter(obj => obj.type === "NEW")[0]
      .netPremium;
    let closedPrice = this.props.item.lines.filter(
      obj => obj.type === "REPRICE"
    )[0].netPremium;
    let unwindDate = this.props.item.lines.filter(
      obj => obj.type === "REPRICE"
    )[0].tradeDate;
    let quantity = this.props.item.lines.filter(
      obj => obj.type === "REPRICE"
    )[0].quantity;
    let buysell = this.props.item.lines.filter(obj => obj.type === "REPRICE")[0]
      .buysell;

    const { id, riskProduct, confirm, underlyingObjectData } = this.props.item;

    return (
      <View style={styles.subContainerStyle}>
        <View style={styles.yearStyle}>
          <View
            style={{
              backgroundColor: "#01aca8",
              height: 40,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                textAlign: "center",
                marginBottom: 10
              }}
            >
              {underlyingObjectData.contractMonth.month.name}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#3d4c57",
              height: 50,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "white",
                fontWeight: "bold"
              }}
            >
              {underlyingObjectData.contractMonth.year.value}
            </Text>
          </View>
        </View>

        <View style={{ margin: 14, width: 250 }}>
          <Text>
            {underlyingObjectData.commodity.name} {riskProduct}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "#01aca8" }}>QUANTITY</Text>
              <View style={{ width: 150, flexDirection: "row" }}>
                <Text>
                  {quantity
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </Text>
                <Text>
                  {" " + underlyingObjectData.commodity.unit}s
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 20 }}>
              <Text style={{ color: "#01aca8" }}>DIRECTION</Text>
              <Text>
                {buysell === "S" ? "Sell" : "Buy"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ flexDirection: "column", marginLeft: 20, marginTop: 10 }}
        >
          <Text style={{ color: "#01aca8" }}> PRODUCT</Text>
          <Text>
            {product}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 6 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "#01aca8" }}> NET PRICE</Text>
              <Text>
                ${netPrice.toFixed(2)}
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginLeft: 20 }}>
              <Text style={{ color: "#01aca8" }}> CLOSED PRICE</Text>
              <View style={{ width: 100 }}>
                <Text>
                  ${closedPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{ flexDirection: "column", marginLeft: 20, marginTop: 10 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "#01aca8" }}> TRADE RECEIPT </Text>
            <TouchableHighlight onPress={() => Linking.openURL(confirm)}>
              <Image
                style={{ width: 20, height: 20, marginLeft: 2, marginTop: 4 }}
                source={require("../common/img/PDF.png")}
              />
            </TouchableHighlight>
          </View>
          <Text style={{ color: "#01aca8", marginTop: 16 }}> TRADE ID#</Text>
          <Text>
            {id}
          </Text>
        </View>

        <View
          style={{ flexDirection: "column", marginLeft: 20, marginTop: 10 }}
        >
          <Text style={{ color: "#01aca8" }}> TRADE DATE</Text>
          <Text>
            {tradeDate}
          </Text>
          <Text style={{ color: "#01aca8", marginTop: 6 }}> UNWIND DATE</Text>
          <Text>
            {unwindDate}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = {
  subContainerStyle: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    height: 110
  },

  yearStyle: {
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    width: 100,
    justifyContent: "space-around"
  }
};

export default ClosedPositions;
