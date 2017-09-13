/*jshint esversion: 6 */
'use strict';

import React from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';

class ExternalNumberInput extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const {
            label,
            val,
            onChangeText,
            placeholder,
            edit, onfocus, onblur,stylenp, onChange
        } = this.props;

        return (

            <View style={styles.containerStyle}>
                <Text style={styles.labelStyle}> {label}</Text>
                <TextInput
                    placeholder={placeholder}
                    style={[styles.inputStyle, stylenp]}
                    value={val+''}
                    onChangeText={onChangeText}
                    editable={edit}
                    onFocus = {onfocus}
                    onBlur = {onblur}
                    onChange = {onChange}
                    keyboardType = 'numeric'
                />
            </View>
        );
    }
}
ExternalNumberInput.defaultProps = {
    val: ''
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
        //alignSelf: 'stretch'
        alignItems: 'center'

    },
    containerStyle: {
        height: 70,
        alignItems: 'center',
        width: 145,
        marginLeft: 5,

    }
};

export { ExternalNumberInput };
