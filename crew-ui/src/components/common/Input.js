
import React from 'react';
import { TextInput, View, Keyboard } from 'react-native';

const Input = ({
    containerStyle = styles.containerStyle,
    inputStyle = styles.inputStyle,
    value,
    onChangeText,
    placeholder,
    secureTextEntry, onfocus, onblur
}) => {

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        returnKeyType='done'
        onKeyPress={(e) => {
            if (e.nativeEvent.key === 'Enter') {
                Keyboard.dismiss();
            }
        }}
        onFocus={onfocus}
        onBlur={onblur}
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
  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  }
};

export { Input };
