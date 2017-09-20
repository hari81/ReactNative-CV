import React from 'react';
import { TextInput, View, Text } from 'react-native';

const ExternalInput = ({
                    label,
                   value,
                   onChangeText,
                   placeholder,
                   secureTextEntry, edit , focus, onblur
               }) => {
    const { inputStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={styles.labelStyle}> {label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                autoCorrect={false}
                editable={edit}
                onFocus={focus}
                onBlur={onblur}
            />
        </View>
    );
};


const styles = {
    inputStyle: {
        width: 132,
        height: 45,
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 15,
        lineHeight: 20,
        backgroundColor: 'white',
        borderRadius:5

    },
    labelStyle: {
        fontSize: 15,
        paddingBottom: 10,
        color: 'white',
        alignItems: 'center'

    },
    containerStyle: {
        height: 70,
        alignItems: 'center',
        width: 150,
        marginLeft: 10
    }
};

export { ExternalInput };
