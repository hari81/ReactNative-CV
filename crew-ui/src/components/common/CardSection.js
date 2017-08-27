/*jshint esversion: 6 */
'use strict';
import React from 'react';
import { View } from 'react-native';

const CardSection = props =>
  <View style={styles.containerStyle}>
    {props.children}
  </View>;

const styles = {
  containerStyle: {

    padding: 5,

    justifyContent: 'flex-start',
    flexDirection: 'row',

    position: 'relative'
  }
};

export { CardSection };
