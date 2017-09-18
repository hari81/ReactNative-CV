
import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({

  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    lineHeight: 20,
    flex: 2
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  }
};

export { Input };