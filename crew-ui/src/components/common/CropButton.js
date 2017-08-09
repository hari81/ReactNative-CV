/*jshint esversion: 6 */
"use strict";

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CropButton = ({ onPress, year, cropType, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style}>
        <Text style={styles.yearCrop}>
          {year}
        </Text>
        <Text style={styles.cropType}>
          {cropType}
        </Text>
        <Text style={styles.yearCrop}>Crop</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    width: 150,
    height: 80,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10
  },
  yearCrop: {
    fontSize: 15
  },
  cropType: {
    fontSize: 25
  }
};

export { CropButton };
