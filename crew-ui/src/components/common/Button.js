import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, buttonStyle = styles.buttonStyle, textStyle = styles.textStyle }) => {
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
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#01aca8',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#01aca8'
    }
};
export { Button };
