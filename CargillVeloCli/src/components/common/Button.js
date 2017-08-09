/*jshint esversion: 6 */
"use strict";

import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    // fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#01aca8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#01aca8"
    // marginLeft: 5,
    // marginRight: 5
  }
};

export { Button };
