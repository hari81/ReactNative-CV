/*jshint esversion: 6 */
"use strict";
import React from "react";
import { TextInput, View } from "react-native";

const FarmInput = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    lineHeight: 25
  },

  containerStyle: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    width: 300,
    marginLeft: 50
  }
};

export { FarmInput };
