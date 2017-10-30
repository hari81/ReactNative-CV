import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, color }) =>
  <View style={styles.spinnerStyle}>
    <ActivityIndicator color={color} size={size || 'large'} />
  </View>;

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
