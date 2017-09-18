import React from 'react';
import { TextInput, View, Keyboard } from 'react-native';
//import dismissKeyboard from 'react-native-dismiss-keyboard';
import PropTypes from 'prop-types';

const FarmInput = ({ value, onChangeText, placeholder, secureTextEntry, onblur, onfocus }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        onBlur={onblur}
        onFocus={onfocus}
        keyboardType='numeric'
        placeholderTextColor='rgba(61,76,87, .5)'
        maxLength={100}
        returnKeyType="done"
        onKeyPress={(e) => { if (e.nativeEvent.key === 'Enter') {
          Keyboard.dismiss();
        }
        }}
      />
    </View>
  );
};
/*FarmInput.propTypes = {
    value: PropTypes.number
};*/

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 20,
    fontSize: 16,
    lineHeight: 25
  },

  containerStyle: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    width: 356,

  }
};

export { FarmInput };
