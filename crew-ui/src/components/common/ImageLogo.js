/*jshint esversion: 6 */
"use strict";
import { Image, View, Text } from "react-native";
import React from "react";

const ImageLogo = () =>
  <View style={styles.imageContainer}>
    <Image
      source={require("./img/cargillLogoWhite3.png")}
      style={styles.logoStyle}
    />
    <Text style={styles.textStyle}>Price Hedging</Text>
  </View>;

const styles = {
  imageContainer: {
    justifyContent: "center",
    marginLeft: 2,
    marginRight: 20,
    flexDirection: "column",
    paddingBottom: 10
  },

  logoStyle: {
    height: 113,
    width: 250,
    //paddingLeft: 10,
    alignItems: "center"
  },
  textStyle: {
    marginTop: 10,
    fontSize: 25,
    color: "white",
    textAlign: "center"
  }
};

export { ImageLogo };
