import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const OrderButton = ({ onPress, children, disabled }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, children === 'BACK TO DASHBOARD' ? { backgroundColor: 'white', borderColor: 'rgb(159,169,186)' } : {}]}
      disabled={disabled}
      raised='true'
      theme='dark'
      overrides='true'
      backgroundColor='#3fffff'
    >
      <Text style={[textStyle, children === 'BACK TO DASHBOARD' ? { color: 'rgb(159,169,186)' } : {}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: 'HelveticaNeue',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#01aca8',
    backgroundColor: 'rgb(39,153,137)',
    marginLeft: 5,
    marginRight: 5
  }
};

export { OrderButton };
