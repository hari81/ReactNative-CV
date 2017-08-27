/*jshint esversion: 6 */
'use strict';
import React from 'react';
import { Text, TouchableOpacity, Button } from 'react-native';

const OrderButton = ({ onPress, children, disabled }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={disabled}
      raised='true'
      theme='dark'
      overrides='true'
      backgroundColor='#3fffff'
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    //  color: 'black',
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
  }
};

export { OrderButton };
